import { Gender } from "../interfaces/types";

export const GENDER_TRANSLATION: Record<string, string> = {
  Female: 'Femenino',
  Male: 'Masculino',
  Unspecified: 'No especificado',
};

export const GENDER: Record<Gender, Gender> = Object.freeze({
  Female: 'Female',
  Male: 'Male',
  Unspecified: 'Unspecified',
});
