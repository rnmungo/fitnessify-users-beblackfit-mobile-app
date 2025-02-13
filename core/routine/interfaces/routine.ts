export type RoutineLevel = 'Advanced' | 'Beginner' | 'Intermediate';

export type RoutineStatus = 'Deployed' | 'Draft';

export interface UserRoutine {
  createdAt: string;
  lastRoutineSection: string;
  lastRoutineExercise: string;
  routineId: string;
  routineName: string;
  routineDuration: string;
  routineLevel: RoutineLevel;
}
