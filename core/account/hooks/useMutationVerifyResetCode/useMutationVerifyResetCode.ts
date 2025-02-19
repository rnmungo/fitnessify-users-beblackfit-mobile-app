import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { verifyResetCode, type VerifyResetCodeParams } from '../../actions/forgot-password-actions';

const useMutationVerifyResetCode = (): UseMutationResult<void, unknown, VerifyResetCodeParams, unknown> => {
  const mutation = useMutation<void, unknown, VerifyResetCodeParams, unknown>({
    mutationFn: verifyResetCode,
  });

  return mutation;
};

export default useMutationVerifyResetCode;
