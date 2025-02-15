export type RoutineEquipment = 'All' | 'Bands' | 'BodyWeight' | 'DumbbellsAndKettlebells';

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

export interface Routine {
  id: string;
  createdAt: string;
  name: string;
  description: string;
  duration: string;
  level: RoutineLevel;
  equipment: RoutineEquipment;
  status: RoutineStatus;
}

export interface MuscleGroup {
  id: string;
  name: string;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  muscleGroups: Array<MuscleGroup>;
  videoTitle: string;
  videoUrl: string;
}

export interface ExerciseDetail {
  id: string;
  name: string;
  description: string;
}

export interface RoutineExerciseDetail {
  id: string;
  duration: string;
  pause: string;
  repetitions: number;
  orderNumber: number;
  exercise: ExerciseDetail;
}

export interface RoutineSectionDetail {
  id: string;
  name: string;
  duration: string;
  pause: string;
  laps: number;
  orderNumber: number;
  routineExercises: Array<RoutineExerciseDetail>;
}

export interface RoutineDetail {
  id: string;
  createdAt: string;
  name: string;
  description: string;
  duration: string;
  level: RoutineLevel;
  equipment: RoutineEquipment;
  status: RoutineStatus;
  routineSections: Array<RoutineSectionDetail>;
}
