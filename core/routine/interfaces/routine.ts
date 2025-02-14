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
