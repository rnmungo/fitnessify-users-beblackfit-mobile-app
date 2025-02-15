import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getRoutine } from '../../actions/routine-actions';
import type { RoutineDetail } from '../../interfaces/routine';

interface QueryRoutineParams {
  routineId: string;
}

const useQueryRoutine = ({
  routineId,
}: QueryRoutineParams): UseQueryResult<RoutineDetail | undefined, Error> => {
  const query = useQuery<RoutineDetail | undefined, Error>({
    queryKey: ['routine', routineId],
    queryFn: () => getRoutine(routineId),
    enabled: !!routineId,
  });

  return query;
};

export default useQueryRoutine;
