import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RegisterState {
  email?: string;
  setEmail: (email: string) => void;
  clearEmail: () => void;
}

export const useRegisterStore = create<RegisterState>()(
  persist(
    (set) => ({
      email: undefined,
      setEmail: (email: string) => set({ email }),
      clearEmail: () => set({ email: undefined }),
    }),
    {
      name: 'register-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
