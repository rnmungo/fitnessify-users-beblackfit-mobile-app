import type { SubscriptionStatus as SubscriptionStatusType } from '../interfaces/types';

export const SubscriptionStatus: Record<SubscriptionStatusType, string> = {
  Active: 'Active',
  Canceled: 'Canceled',
  Draft: 'Draft',
  Paused: 'Paused',
};

