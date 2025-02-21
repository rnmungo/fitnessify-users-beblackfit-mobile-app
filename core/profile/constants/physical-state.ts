import { PhysicalState } from "../interfaces/types";

export const PHYSICAL_STATE_TRANSLATION: Record<string, string> = {
  Unspecified: 'No especificado',
  Sedentary: 'Sedentario',
  LightlyActive: 'Ligeramente activo',
  ModeratelyActive: 'Moderadamente activo',
  VeryActive: 'Muy activo',
};

export const PHYSICAL_STATE: Record<PhysicalState, string> = {
  Unspecified: 'Unspecified',
  Sedentary: 'Sedentary',
  LightlyActive: 'LightlyActive',
  ModeratelyActive: 'ModeratelyActive',
  VeryActive: 'VeryActive',
};
