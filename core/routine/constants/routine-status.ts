import type { RoutineStatus as RoutineStatusType } from '../interfaces/routine';

export const RoutineStatus: Record<RoutineStatusType, string> = {
  Deployed: 'Deployed',
  Draft: 'Draft',
};
