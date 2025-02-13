import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getSubscription } from '../../actions/subscription-actions';
import type { Subscription } from '../../interfaces/session';

const useQuerySubscription = (): UseQueryResult<Subscription | undefined, Error> => {
  const query = useQuery<Subscription | undefined, Error>({
    queryKey: ['my-subscription'],
    queryFn: getSubscription,
    enabled: true,
  });

  return query;
};

export default useQuerySubscription;
