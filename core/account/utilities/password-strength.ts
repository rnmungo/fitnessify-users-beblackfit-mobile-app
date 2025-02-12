const STRONG_REGEX = new RegExp(
  '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})'
);
const MEDIUM_REGEX = new RegExp(
  '((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))'
);

interface PasswordStrength {
  label?: string;
  color: 'default' | 'success' | 'warning' | 'error';
}

export const getPasswordStrength = (password: string): PasswordStrength => {
  if (!password) {
    return { label: undefined, color: 'default' };
  }

  if (STRONG_REGEX.test(password)) {
    return { label: 'Contraseña segura', color: 'success' };
  }

  if (MEDIUM_REGEX.test(password)) {
    return { label: 'Contraseña débil', color: 'warning' };
  }

  return { label: 'Contraseña insegura', color: 'error' };
};
