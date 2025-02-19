import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { initializeResetPassword, type InitializeResetPasswordParams } from '../../actions/forgot-password-actions';
import { ForgotPasswordToken } from '../../interfaces/forgot-password';

const useMutationInitializeResetPassword = (): UseMutationResult<ForgotPasswordToken | void, unknown, InitializeResetPasswordParams, unknown> => {
  const mutation = useMutation<ForgotPasswordToken | void, unknown, InitializeResetPasswordParams, unknown>({
    mutationFn: initializeResetPassword,
  });

  return mutation;
};

export default useMutationInitializeResetPassword;
