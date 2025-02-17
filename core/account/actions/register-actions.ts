import * as Sentry from '@sentry/react-native';
import { gatewayClient, handleError } from '@/core/shared/services/rest-clients';

export interface SignUpParams {
  email: string;
  password: string;
};

export interface SendRecoveryCodeParams {
  email: string;
};

export interface VerifyCodeParams {
  email: string;
  recoveryCode: string;
};

export const signUp = async ({ email, password }: SignUpParams): Promise<void> => {
  try {
    await gatewayClient.post(
      '/api/account/register',
      {
        email,
        password,
      },
    );

    return;
  } catch (error: unknown) {
    Sentry.captureException(error);

    handleError(error);
  }
};

export const sendRecoveryCode = async ({ email }: SendRecoveryCodeParams): Promise<void> => {
  try {
    await gatewayClient.post(
      '/api/account/generate-recovery-code',
      {
        email,
      },
    );

    return;
  } catch (error: unknown) {
    Sentry.captureException(error);

    handleError(error);
  }
};

export const verifyCode = async ({ email, recoveryCode }: VerifyCodeParams): Promise<void> => {
  try {
    await gatewayClient.post(
      '/api/account/verify-recovery-code',
      {
        email,
        recoveryCode,
      },
    );

    return;
  } catch (error: unknown) {
    Sentry.captureException(error);

    handleError(error);
  }
};
