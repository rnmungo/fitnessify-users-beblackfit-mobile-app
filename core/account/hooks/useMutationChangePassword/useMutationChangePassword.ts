import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gatewayClient } from '@/core/shared/services/rest-clients';

interface ChangePasswordParams {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const changePassword = async ({ currentPassword, newPassword, confirmPassword }: ChangePasswordParams): Promise<void> => {
  await gatewayClient.post('/api/account/change-password', {
    currentPassword,
    newPassword,
    confirmPassword,
  });
  return;
};

const useMutationChangePassword = (): UseMutationResult<void, unknown, ChangePasswordParams, unknown> => {
  const mutation = useMutation<void, unknown, ChangePasswordParams, unknown>({
    mutationFn: changePassword,
  });

  return mutation;
};

export default useMutationChangePassword;
