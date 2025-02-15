import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getExercise } from '../../actions/routine-actions';
import type { Exercise } from '../../interfaces/routine';

interface QueryExerciseParams {
  exerciseId: string;
}

const useQueryExercise = ({
  exerciseId,
}: QueryExerciseParams): UseQueryResult<Exercise | undefined, Error> => {
  const query = useQuery<Exercise | undefined, Error>({
    queryKey: ['exercise', exerciseId],
    queryFn: () => getExercise(exerciseId),
    enabled: !!exerciseId,
  });

  return query;
};

export default useQueryExercise;
