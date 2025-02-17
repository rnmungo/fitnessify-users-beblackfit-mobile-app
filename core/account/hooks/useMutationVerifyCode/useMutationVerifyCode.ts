import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { verifyCode, type VerifyCodeParams } from '../../actions/register-actions';

const useMutationVerifyCode = (): UseMutationResult<void, unknown, VerifyCodeParams, unknown> => {
  const mutation = useMutation<void, unknown, VerifyCodeParams, unknown>({
    mutationFn: verifyCode,
  });

  return mutation;
};

export default useMutationVerifyCode;
