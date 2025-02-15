import type { EquipmentPreference as EquipmentPreferenceType } from '../interfaces/types';

export const EQUIPMENT_TRANSLATION: Record<string, string> = {
  All: 'Todos',
  Bands: 'Bandas',
  BodyWeight: 'Peso corporal',
  DumbbellsAndKettlebells: 'Dumbbells y Kettlebells',
};

export const EquipmentPreference: Record<EquipmentPreferenceType, string> = {
  All: 'All',
  Bands: 'Bands',
  BodyWeight: 'BodyWeight',
  DumbbellsAndKettlebells: 'DumbbellsAndKettlebells',
};
