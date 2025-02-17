import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { sendRecoveryCode, type SendRecoveryCodeParams } from '../../actions/register-actions';

const useMutationSendRecoveryCode = (): UseMutationResult<void, unknown, SendRecoveryCodeParams, unknown> => {
  const mutation = useMutation<void, unknown, SendRecoveryCodeParams, unknown>({
    mutationFn: sendRecoveryCode,
  });

  return mutation;
};

export default useMutationSendRecoveryCode;
