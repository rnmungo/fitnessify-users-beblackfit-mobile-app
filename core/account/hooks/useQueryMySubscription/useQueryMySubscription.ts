import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getSubscription } from '../../actions/subscription-actions';
import type { Subscription } from '../../interfaces/session';

interface QueryMySubscriptionParams {
  userId: string;
}

const useQueryMySubscription = ({
  userId
}: QueryMySubscriptionParams): UseQueryResult<Subscription | null, Error> => {
  const query = useQuery<Subscription | null, Error>({
    queryKey: ['subscription', userId],
    queryFn: getSubscription,
    enabled: !!userId,
  });

  return query;
};

export default useQueryMySubscription;
