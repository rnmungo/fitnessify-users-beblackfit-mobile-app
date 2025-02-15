import type { Paged } from '@/core/shared/interfaces/search';
import type {
  ExerciseData,
  RoutineData,
  RoutineDetailData,
  UserRoutineData,
} from './types';
import type {
  Exercise,
  Routine,
  RoutineDetail,
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

export const adaptRoutine = (responseData: RoutineDetailData): RoutineDetail => ({
  id: responseData?.id || '',
  createdAt: responseData?.createdAt || '',
  name: responseData?.name || '',
  description: responseData?.description || '',
  duration: responseData?.duration || '00:00:00',
  level: responseData?.level as RoutineLevel,
  equipment: responseData?.equipment as RoutineEquipment,
  status: responseData?.status as RoutineStatus,
  routineSections: (responseData?.routineSections || []).map(routineSection => ({
    id: routineSection.id,
    name: routineSection.name,
    duration: routineSection.duration,
    laps: routineSection.laps,
    pause: routineSection.pause,
    orderNumber: routineSection.orderNumber,
    routineExercises: (routineSection?.routineExercises || []).map(routineExercise => ({
      id: routineExercise.id,
      duration: routineExercise.duration,
      pause: routineExercise.pause,
      repetitions: routineExercise.repetitions,
      orderNumber: routineExercise.orderNumber,
      exercise: {
        id: routineExercise.exercise.id,
        name: routineExercise.exercise.name,
        description: routineExercise.exercise.description,
      }
    })),
  })),
});

export const adaptExercise = (data: ExerciseData): Exercise => ({
  id: data.id,
  name: data.name,
  description: data.description,
  muscleGroups: (data.muscleGroups || []).map((muscleGroup) => ({
    id: muscleGroup.id,
    name: muscleGroup.name,
  })),
  videoTitle: data.video.title,
  videoUrl: data.video.url,
});
