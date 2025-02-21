import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getSubscription } from '../../actions/subscription-actions';
import type { Subscription } from '../../interfaces/session';

const useQueryMySubscription = (): UseQueryResult<Subscription | null, Error> => {
  const query = useQuery<Subscription | null, Error>({
    queryKey: ['subscription'],
    queryFn: getSubscription,
    enabled: true,
    refetchOnWindowFocus: true,
  });

  return query;
};

export default useQueryMySubscription;
