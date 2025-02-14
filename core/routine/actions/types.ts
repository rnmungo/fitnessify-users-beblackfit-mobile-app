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
