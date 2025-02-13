import { RoutineLevel } from "../interfaces/routine";

const RoutineLevelMap: Record<RoutineLevel, string> = {
  Beginner: 'Nv.1',
  Intermediate: 'Nv.2',
  Advanced: 'Nv.3',
};

export const getRoutineLevelNumber = (
  routineLevel: RoutineLevel
): string => RoutineLevelMap[routineLevel];

export const formatRoutineDuration = (duration: string): string => {
  const [hours, minutes, seconds] = duration.split(':').map(Number);

  let result = [];

  if (hours > 0) {
    result.push(`${hours} ${hours === 1 ? 'hora' : 'horas'}`);
  }

  if (minutes > 0) {
    result.push(`${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`);
  }

  if (seconds > 0 && hours === 0) {
    result.push(`${seconds} ${seconds === 1 ? 'segundo' : 'segundos'}`);
  }

  return result.join(', ');
};
