import React, { useEffect, useMemo, useState } from 'react';
import { Image, ScrollView, useWindowDimensions, View } from 'react-native';
import {
  Button,
} from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useMutationChangePassword from '@/core/account/hooks/useMutationChangePassword';
import { getPasswordStrength } from '@/core/account/utilities/password-strength';
import { useSnackbar } from '@/core/shared/context/snackbar';
import PasswordTextInput, { type PasswordInputVariant } from '@/core/shared/components/password-text-input';

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required('La contraseña actual es requerida'),
  newPassword: Yup.string().required('La nueva contraseña es requerida'),
  confirmPassword: Yup.string()
    .required('La confirmación es requerida')
    .oneOf([Yup.ref('newPassword')], 'Las contraseñas no coinciden'),
});

const ChangePasswordScreen = () => {
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState<{
    label?: string;
    color: 'default' | 'success' | 'warning' | 'error'
  }>({
    label: undefined,
    color: 'default',
  });
  const snackbar = useSnackbar();
  const mutation = useMutationChangePassword();
  const { height } = useWindowDimensions();

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (vals) => {
      mutation.mutate(
        {
          currentPassword: vals.currentPassword,
          newPassword: vals.newPassword,
          confirmPassword: vals.confirmPassword,
        },
        {
          onSuccess: () => {
            snackbar.success('La contraseña fue actualizada, podrá utilizarla en el siguiente inicio de sesión.');
            resetForm();
          },
          onError: () => {
            snackbar.error('Ocurrió un error al actualizar la contraseña.');
          },
        }
      );
    },
  });

  useEffect(() => {
    const strength = getPasswordStrength(values.newPassword);
    setPasswordStrength(strength);

    if (values.confirmPassword.length > 0) {
      setPasswordsMatch(values.newPassword === values.confirmPassword);
    } else {
      setPasswordsMatch(false);
    }
  }, [values.newPassword, values.confirmPassword]);

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
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 24,
      }}
    >
      <View
        style={{
          paddingTop: height * 0.05,
          paddingBottom: 40,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Image
          source={require('@/assets/images/profile-safe.png')}
          style={{
            width: '100%',
            height: 250,
            resizeMode: 'contain',
          }}
        />
      </View>
      <View style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <PasswordTextInput
          label="Contraseña actual"
          mode="outlined"
          value={values.currentPassword}
          onChangeText={handleChange('currentPassword')}
          onBlur={handleBlur('currentPassword')}
          variant={(touched.currentPassword && !!errors.currentPassword) ? 'error' : 'default'}
          helperText={(touched.currentPassword && errors.currentPassword) ? errors.currentPassword : undefined}
          returnKeyType="next"
        />
        <PasswordTextInput
          label="Nueva contraseña"
          mode="outlined"
          value={values.newPassword}
          onChangeText={handleChange('newPassword')}
          onBlur={handleBlur('newPassword')}
          variant={(touched.newPassword && !!errors.newPassword) ? 'error' : passwordStrength.color}
          helperText={(touched.newPassword && errors.newPassword) ? errors.newPassword : passwordStrength.label}
          returnKeyType="next"
        />
        <PasswordTextInput
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
      </View>
      <Button
        mode="contained"
        onPress={() => handleSubmit()}
        style={{
          marginTop: 24,
        }}
        loading={mutation.status === 'pending'}
      >
        Actualizar contraseña
      </Button>
    </ScrollView>
  );
};

export default ChangePasswordScreen;
