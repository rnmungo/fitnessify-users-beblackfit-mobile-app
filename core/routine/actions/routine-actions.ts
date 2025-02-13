import * as Sentry from '@sentry/react-native';
import { gatewayClient, handleError } from '@/core/shared/services/rest-clients';
import { adaptUserRoutineSearch } from './adapters';

import type { Paged } from '@/core/shared/interfaces/search';
import type { UserRoutine } from '../interfaces/routine';
import type { UserRoutineData } from './types';

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
