
export const getStatusByBMI = (bodyMassIndex: number): string => {
  if (bodyMassIndex >= 40) {
    return 'Obesidad clase III';
  } else if (bodyMassIndex >= 35 && bodyMassIndex < 40) {
    return 'Obesidad clase II';
  } else if (bodyMassIndex >= 30 && bodyMassIndex < 35) {
    return 'Obesidad clase I';
  } else if (bodyMassIndex >= 25 && bodyMassIndex < 30) {
    return 'Pre-obesidad o Sobrepeso';
  } else if (bodyMassIndex >= 18.5 && bodyMassIndex < 25) {
    return 'Peso normal';
  } else if (bodyMassIndex > 0 && bodyMassIndex < 18.5) {
    return 'Bajo peso';
  }

  return '-';
};
