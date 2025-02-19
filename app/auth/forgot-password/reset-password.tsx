import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import { TextInput as NativeTextInput, useWindowDimensions, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutationResetPassword } from '@/core/account/hooks';
import { useForgotPasswordStore } from '@/core/account/store';
import { useSnackbar } from '@/core/shared/context/snackbar';
import PasswordTextInput, { type PasswordInputVariant } from '@/core/shared/components/password-text-input';
import { getPasswordStrength } from '@/core/account/utilities';
import { ReactQueryStatus } from '@/constants/ReactQuery';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .required('La contraseña es obligatoria'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Las contraseñas no coinciden')
    .required('Debes confirmar la contraseña'),
});

const ResetPasswordScreen = () => {
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState<{
    label?: string;
    color: 'default' | 'success' | 'warning' | 'error'
  }>({
    label: undefined,
    color: 'default',
  });
  const router = useRouter();
  const { height } = useWindowDimensions();
  const snackbar = useSnackbar();
  const { data, clearData } = useForgotPasswordStore();
  const resetPassword = useMutationResetPassword();

  const passwordInputRef = useRef<NativeTextInput>(null);
  const confirmPasswordInputRef = useRef<NativeTextInput>(null);

  const {
    errors,
    touched,
    values,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: { password: '', confirmPassword: '' },
    validationSchema,
    onSubmit: (values) => {
      resetPassword.mutate({
        code: data?.code || '',
        email: data?.email || '',
        newPassword: values.password,
        token: data?.token || '',
      }, {
        onSuccess: () => {
          clearData();
          resetPassword.reset();
          router.replace('/auth/forgot-password/congrats-reset-password');
        },
        onError: () => {
          resetPassword.reset();
          snackbar.error('Ocurrió un error al actualizar la contraseña, vuelva a intentar.');
        },
      });
    },
  });

  useEffect(() => {
    const strength = getPasswordStrength(values.password);
    setPasswordStrength(strength);

    if (values.confirmPassword.length > 0) {
      setPasswordsMatch(values.password === values.confirmPassword);
    } else {
      setPasswordsMatch(false);
    }
  }, [values.password, values.confirmPassword]);

  const confirmPasswordProps: { helperText?: string; variant?: PasswordInputVariant } = useMemo(() => {
    if (touched.confirmPassword && errors.confirmPassword) {
      return {
        helperText: errors.confirmPassword,
        variant: 'error',
      };
    }

    if (values.confirmPassword.length > 0) {
      if (passwordsMatch) {
        return {
          helperText: 'Las contraseñas coinciden.',
          variant: 'success',
        };
      }

      return {
        helperText: 'Las contraseñas no coinciden.',
        variant: 'error',
      };
    }

    return {
      helperText: undefined,
      variant: 'default',
    }
  }, [passwordsMatch, touched.confirmPassword, errors.confirmPassword, values.confirmPassword]);

  return (
    <View
      style={{
        paddingTop: height * 0.15,
        paddingHorizontal: 40
      }}
    >
      <Text variant="headlineMedium" style={{ textAlign: 'center' }}>Ingrese la nueva contraseña</Text>
      <PasswordTextInput
        ref={passwordInputRef}
        style={{ marginTop: 32 }}
        label="Contraseña"
        mode="outlined"
        value={values.password}
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
        variant={(touched.password && !!errors.password) ? 'error' : passwordStrength.color}
        helperText={(touched.password && errors.password) ? errors.password : passwordStrength.label}
        returnKeyType="next"
        onSubmitEditing={() => {
          confirmPasswordInputRef.current?.focus();
        }}
      />
      <PasswordTextInput
        ref={confirmPasswordInputRef}
        style={{ marginTop: 32 }}
        label="Confirmar contraseña"
        mode="outlined"
        value={values.confirmPassword}
        onChangeText={handleChange('confirmPassword')}
        onBlur={handleBlur('confirmPassword')}
        returnKeyType="done"
        onSubmitEditing={() => {
          handleSubmit();
        }}
        {...confirmPasswordProps}
      />
      <Button
        mode="contained"
        style={{ marginTop: 24, alignSelf: 'center' }}
        loading={resetPassword.status === ReactQueryStatus.Pending}
        onPress={() => handleSubmit()}
      >
        ACTUALIZAR CONTRASEÑA
      </Button>
    </View>
  );
};

export default ResetPasswordScreen;
