import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Gender } from '@/core/profile/interfaces/types';

interface OnboardingData {
  name?: string;
  lastName?: string;
  gender?: Gender;
  weight?: number;
  height?: number;
  physicalState?: string;
  goals?: Array<string>;
  preferredEquipment?: string;
}

interface OnboardingState {
  data: OnboardingData;
  setOnboardingData: (data: Partial<OnboardingData>) => void;
  clearOnboardingData: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      data: {},
      setOnboardingData: (data: Partial<OnboardingData>) => {
        set({ data: { ...get().data, ...data } });
      },
      clearOnboardingData: () => set({ data: {} }),
    }),
    {
      name: 'onboarding-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
