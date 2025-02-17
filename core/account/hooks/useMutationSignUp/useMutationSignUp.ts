import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { signUp, type SignUpParams } from '../../actions/register-actions';

const useMutationSignUp = (): UseMutationResult<void, unknown, SignUpParams, unknown> => {
  const mutation = useMutation<void, unknown, SignUpParams, unknown>({
    mutationFn: signUp,
  });

  return mutation;
};

export default useMutationSignUp;
