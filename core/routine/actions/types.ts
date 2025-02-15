export interface UserRoutineData {
  createdAt: string;
  lastRoutineSection: string;
  lastRoutineExercise: string;
  routine: {
    id: string;
    name: string;
    duration: string;
    level: string;
  };
}

export interface RoutineData {
  id: string;
  createdAt: string;
  name: string;
  description: string;
  duration: string;
  level: string;
  equipment: string;
  status: string;
}

export interface MuscleGroupData {
  id: string;
  name: string;
}

export interface ExerciseData {
  id: string;
  name: string;
  description: string;
  muscleGroups: Array<MuscleGroupData>;
  video: {
    id: string;
    createdAt: string;
    title: string;
    url: string;
  };
}

export interface ExerciseDetailData {
  id: string;
  name: string;
  description: string;
}

export interface RoutineExerciseDetailData {
  id: string;
  duration: string;
  pause: string;
  repetitions: number;
  orderNumber: number;
  exercise: ExerciseDetailData;
}

export interface RoutineSectionDetailData {
  id: string;
  name: string;
  duration: string;
  pause: string;
  laps: number;
  orderNumber: number;
  routineExercises: Array<RoutineExerciseDetailData>;
}

export interface RoutineDetailData {
  id: string;
  createdAt: string;
  name: string;
  description: string;
  duration: string;
  level: string;
  equipment: string;
  status: string;
  routineSections: Array<RoutineSectionDetailData>;
}
