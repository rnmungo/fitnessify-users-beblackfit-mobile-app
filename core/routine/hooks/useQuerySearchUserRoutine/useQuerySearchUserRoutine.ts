import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { searchUserRoutines } from '../../actions/routine-actions';
import type { UserRoutine } from '../../interfaces/routine';
import type { Paged } from '@/core/shared/interfaces/search';

interface QuerySearchUserRoutineParams {
  userId: string;
}

const useQuerySearchUserRoutine = ({
  userId,
}: QuerySearchUserRoutineParams): UseQueryResult<Paged<UserRoutine> | undefined, Error> => {
  const query = useQuery<Paged<UserRoutine> | undefined, Error>({
    queryKey: ['search-user-routines', userId],
    queryFn: () => searchUserRoutines({ userId }),
    enabled: !!userId,
  });

  return query;
};

export default useQuerySearchUserRoutine;
