import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ForgotPasswordData {
  email?: string;
  token?: string;
  code?: string;
}

interface ForgotPasswordState {
  data?: ForgotPasswordData;
  setForgotPasswordData: (data: Partial<ForgotPasswordData>) => void;
  clearData: () => void;
}

export const useForgotPasswordStore = create<ForgotPasswordState>()(
  persist(
    (set, get) => ({
      data: undefined,
      setForgotPasswordData: (data: Partial<ForgotPasswordData>) => {
        const dataState = get().data;

        set({ data: { ...dataState, ...data } });
      },
      clearData: () => set({ data: undefined }),
    }),
    {
      name: 'forgot-password-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
