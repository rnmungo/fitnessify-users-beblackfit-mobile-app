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
