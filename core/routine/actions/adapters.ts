import type { Paged } from '@/core/shared/interfaces/search';
import type { RoutineData, UserRoutineData } from './types';
import type {
  Routine,
  RoutineEquipment,
  RoutineLevel,
  RoutineStatus,
  UserRoutine,
} from '../interfaces/routine';

export const adaptUserRoutineSearch = (responseData: Paged<UserRoutineData>): Paged<UserRoutine> => ({
  results: responseData.results.map(result => ({
    createdAt: result.createdAt,
    lastRoutineExercise: result.lastRoutineExercise,
    lastRoutineSection: result.lastRoutineSection,
    routineDuration: result.routine.duration,
    routineId: result.routine.id,
    routineLevel: result.routine.level as RoutineLevel,
    routineName: result.routine.name,
  })),
  currentPage: responseData.currentPage,
  sizeLimit: responseData.sizeLimit,
  total: responseData.total,
  pages: responseData.pages,
});

export const adaptRoutineSearch = (responseData: Paged<RoutineData>): Paged<Routine> => ({
  results: responseData.results.map(result => ({
    id: result.id,
    createdAt: result.createdAt,
    name: result.name,
    description: result.description,
    duration: result.duration,
    level: result.level as RoutineLevel,
    equipment: result.equipment as RoutineEquipment,
    status: result.status as RoutineStatus,
  })),
  currentPage: responseData.currentPage,
  sizeLimit: responseData.sizeLimit,
  total: responseData.total,
  pages: responseData.pages,
});
