import * as Sentry from '@sentry/react-native';
import { gatewayClient, handleError } from '@/core/shared/services/rest-clients';
import { AUTH_STATUS } from '../constants';
import { adaptAuthorization, adaptProfile } from './adapters';

import type { BaseSession } from '../interfaces/session';

export interface SignInParams {
  email: string;
  password: string;
};

export const signIn = async ({ email, password }: SignInParams): Promise<BaseSession | void> => {
  try {
    const response = await gatewayClient.post(
      '/api/account/login',
      {
        email,
        password,
      },
    );
    return adaptAuthorization(response.data);
  } catch (error: unknown) {
    Sentry.captureException(error);

    handleError(error);
  }
};

export const getMyProfile = async () => {
  try {
    const response = await gatewayClient.get(
      '/api/user/me/profile',
    );
    return adaptProfile(response.data);
  } catch (error: unknown) {
    Sentry.captureException(error);

    handleError(error);
  }
};
