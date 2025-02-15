import * as Sentry from '@sentry/react-native';
import { gatewayClient, handleError } from '@/core/shared/services/rest-clients';
import { urlParamsToQueryString } from '@/core/shared/utilities/urlUtils';
import {
  adaptExercise,
  adaptRoutine,
  adaptRoutineSearch,
  adaptUserRoutineSearch,
} from './adapters';
import type { Paged } from '@/core/shared/interfaces/search';
import type {
  Exercise,
  Routine,
  RoutineDetail,
  UserRoutine,
} from '../interfaces/routine';
import type {
  ExerciseData,
  RoutineData,
  RoutineDetailData,
  UserRoutineData,
} from './types';

interface SearchUserRoutinesParams {
  userId: string;
}

export const searchUserRoutines = async ({
  userId,
}: SearchUserRoutinesParams): Promise<Paged<UserRoutine> | undefined> => {
  try {
    const response = await gatewayClient.get<Paged<UserRoutineData>>(`/api/user-routine/search?userId=${userId}`);
    const searchData: Paged<UserRoutine> = adaptUserRoutineSearch(response.data);
    return searchData;
  } catch (error: unknown) {
    Sentry.captureException(error);

    handleError(error);
  }
};

export const searchRoutines = async (
  filters: Record<string, string>
): Promise<Paged<Routine> | undefined> => {
  try {
    const queryString = urlParamsToQueryString(filters);
    const response = await gatewayClient.get<Paged<RoutineData>>(`/api/routine/search?${queryString}`);
    const searchData: Paged<Routine> = adaptRoutineSearch(response.data);
    return searchData;
  } catch (error: unknown) {
    Sentry.captureException(error);

    handleError(error);
  }
};

export const getRoutine = async (
  routineId: string
): Promise<RoutineDetail | undefined> => {
  try {
    const response = await gatewayClient.get<RoutineDetailData>(`/api/routine/${routineId}`);
    const routine: RoutineDetail = adaptRoutine(response.data);

    return routine;
  } catch (error: unknown) {
    Sentry.captureException(error);

    handleError(error);
  }
};

export const getExercise = async (
  exerciseId: string
): Promise<Exercise | undefined> => {
  try {
    const response = await gatewayClient.get<ExerciseData>(`/api/exercise/${exerciseId}`);
    const routine: Exercise = adaptExercise(response.data);

    return routine;
  } catch (error: unknown) {
    Sentry.captureException(error);

    handleError(error);
  }
};
