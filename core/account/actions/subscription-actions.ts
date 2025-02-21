import * as Sentry from '@sentry/react-native';
import { gatewayClient, handleError } from '@/core/shared/services/rest-clients';
import { adaptSubscription } from './adapters';

import type { Subscription } from '../interfaces/session';
import type { SubscriptionData } from './types';

export const getSubscription = async (): Promise<Subscription | null> => {
  try {
    const response = await gatewayClient.get<Array<SubscriptionData>>('/api/subscription/me/in-progress');
    const subscriptions = response.data.map(adaptSubscription);
    return subscriptions.length > 0 ? subscriptions[0] : null;
  } catch (error: unknown) {
    Sentry.captureException(error);

    handleError(error);

    return null;
  }
};
