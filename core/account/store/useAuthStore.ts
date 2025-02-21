import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import isEmpty from 'lodash.isempty';
import { ProfileUpdated, Session, Subscription } from '../interfaces/session';
import { getMyProfile, signIn } from '../actions/auth-actions';
import { AUTH_STATUS } from '../constants';
import { SecureStorage } from '@/core/shared/utilities/secure-storage';
import { StorageKeys } from '@/constants/StorageKeys';

export interface AuthState {
  session?: Session;

  checkStatus: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  setSubscription: (subscription?: Subscription) => void;
  reloadProfile: (profile: ProfileUpdated) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      session: {
        applicationId: '',
        status: AUTH_STATUS.CHECKING,
        authorization: undefined,
        user: undefined,
        profile: undefined,
        subscription: undefined,
      },

      checkStatus: async () => {
        const sessionState = get().session;
        const now = new Date();
        const expiresTimestamp = sessionState?.authorization?.expires;
        const dateExpired = expiresTimestamp ? new Date(expiresTimestamp * 1000) : now;
        const isExpired = dateExpired.getTime() - now.getTime() <= 10000;

        const isAuthenticated = !isEmpty(sessionState) && !isExpired;

        if (!isAuthenticated) {
          await SecureStorage.deleteItem(StorageKeys.TOKEN_KEY);
        }

        set({
          session: {
            ...sessionState,
            applicationId: sessionState?.applicationId || '',
            status: isAuthenticated
              ? AUTH_STATUS.AUTHENTICATED
              : AUTH_STATUS.UNAUTHENTICATED,
          }
        });
      },

      signIn: async (email: string, password: string): Promise<boolean> => {
        try {
          const authData = await signIn({ email, password });
          let profile = undefined;

          if (authData && authData.authorization?.token) {
            await SecureStorage.setItem(StorageKeys.TOKEN_KEY, authData.authorization.token);

            profile = await getMyProfile();

            set({ session: { ...authData, profile } });

            return true;
          }

          return false;
        } catch (error: unknown) {
          set({
            session: {
              applicationId: '',
              status: AUTH_STATUS.UNAUTHENTICATED,
              authorization: undefined,
              user: undefined,
              profile: undefined,
              subscription: undefined,
            }
          });

          throw error;
        }
      },

      signOut: async () => {
        await SecureStorage.deleteItem(StorageKeys.TOKEN_KEY);
        set({ session: undefined });
      },

      reloadProfile: (profile: ProfileUpdated) => {
        const sessionState = get().session;

        set({
          session: {
            applicationId: sessionState?.applicationId || '',
            status: sessionState?.status || AUTH_STATUS.CHECKING,
            authorization: sessionState?.authorization,
            user: sessionState?.user,
            subscription: sessionState?.subscription,
            profile: {
              ...profile,
              tenant: sessionState?.profile?.tenant || { name: '', email: '' },
            },
          },
        });
      },

      setSubscription: (subscription?: Subscription) => {
        const sessionState = get().session;

        set({
          session: {
            applicationId: sessionState?.applicationId || '',
            status: sessionState?.status || AUTH_STATUS.CHECKING,
            authorization: sessionState?.authorization,
            user: sessionState?.user,
            profile: sessionState?.profile,
            subscription,
          },
        });
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
