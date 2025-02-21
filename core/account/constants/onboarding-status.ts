import { OnBoardingStatus } from "../interfaces/session";

type OnBoardingKey = 'COMPLETED' | 'DRAFT' | 'OMITTED';

export const ONBOARDING_STATUS: Record<OnBoardingKey, OnBoardingStatus> = Object.freeze({
  COMPLETED: 'Completed',
  DRAFT: 'Draft',
  OMITTED: 'Omitted',
});
