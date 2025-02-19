import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { resetPassword, type ResetPasswordParams } from '../../actions/forgot-password-actions';

const useMutationResetPassword = (): UseMutationResult<void, unknown, ResetPasswordParams, unknown> => {
  const mutation = useMutation<void, unknown, ResetPasswordParams, unknown>({
    mutationFn: resetPassword,
  });

  return mutation;
};

export default useMutationResetPassword;
