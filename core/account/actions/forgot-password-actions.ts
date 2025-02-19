import * as Sentry from '@sentry/react-native';
import { gatewayClient, handleError } from '@/core/shared/services/rest-clients';
import { adaptForgotPasswordToken } from './adapters';
import type { ForgotPasswordToken } from '../interfaces/forgot-password';
import type { InitializeResetPasswordData } from './types';

export interface InitializeResetPasswordParams {
  email: string;
};

export interface VerifyResetCodeParams {
  code: string;
  email: string;
};

export interface ResetPasswordParams {
  code: string;
  email: string;
  newPassword: string;
  token: string;
}

export const initializeResetPassword = async (
  { email }: InitializeResetPasswordParams
): Promise<ForgotPasswordToken | void> => {
  try {
    const response = await gatewayClient
      .post<InitializeResetPasswordData>(
        '/api/account/create-password-recovery',
        {
          email,
        },
      );

    return adaptForgotPasswordToken(response.data);
  } catch (error: unknown) {
    Sentry.captureException(error);

    handleError(error);
  }
};

export const verifyResetCode = async (
  { code, email }: VerifyResetCodeParams
): Promise<void> => {
  try {
    await gatewayClient
      .post(
        '/api/account/verify-reset-code',
        {
          code,
          email,
        },
      );

    return;
  } catch (error: unknown) {
    Sentry.captureException(error);

    handleError(error);
  }
};

export const resetPassword = async (
  { code, email, newPassword, token }: ResetPasswordParams
): Promise<void> => {
  try {
    await gatewayClient
      .post(
        '/api/account/reset-password',
        {
          code,
          email,
          newPassword,
          token,
        },
      );

    return;
  } catch (error: unknown) {
    Sentry.captureException(error);

    handleError(error);
  }
};
