import { useRef } from 'react';
import { useRouter } from 'expo-router';
import { View, TextInput as NativeTextInput, useWindowDimensions } from 'react-native';
import { Button, HelperText, Text, TextInput, useTheme } from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useForgotPasswordStore } from '@/core/account/store';
import { useMutationInitializeResetPassword } from '@/core/account/hooks';
import { useSnackbar } from '@/core/shared/context/snackbar';
import { ReactQueryStatus } from '@/constants/ReactQuery';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Correo electrónico inválido')
    .required('El correo es obligatorio'),
});

const ForgotPasswordScreen = () => {
  const theme = useTheme();
  const router = useRouter();
  const { height } = useWindowDimensions();
  const snackbar = useSnackbar();
  const { setForgotPasswordData } = useForgotPasswordStore();
  const emailInputRef = useRef<NativeTextInput>(null);
  const initialize = useMutationInitializeResetPassword();

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema,
    onSubmit: async (values) => {
      initialize.mutate({ email: values.email }, {
        onSuccess: (forgotPassword) => {
          setForgotPasswordData({ email: values.email, token: forgotPassword?.token });
          initialize.reset();
          router.push('/auth/forgot-password/verify-code');
        },
        onError: () => {
          initialize.reset();
          snackbar.error('Error al iniciar el proceso de recuperación. Intenta de nuevo.');
        },
      });
    },
  });

  return (
    <View style={{ paddingHorizontal: 40, paddingTop: height * 0.15 }}>
      <Text variant="headlineMedium" style={{ textAlign: 'center', color: theme.colors.onSurface }}>
        Recuperar contraseña
      </Text>
      <Text variant="bodyMedium" style={{ textAlign: 'center', marginTop: 8, color: theme.colors.onSurfaceVariant }}>
        Ingresa tu correo electrónico y te enviaremos un código de verificación.
      </Text>
      <TextInput
        style={{ marginTop: 20 }}
        ref={emailInputRef}
        label="Correo electrónico"
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        error={formik.touched.email && !!formik.errors.email}
        value={formik.values.email}
        onChangeText={formik.handleChange('email')}
        onBlur={formik.handleBlur('email')}
        returnKeyType="done"
        onSubmitEditing={() => {
          formik.handleSubmit();
        }}
      />
      {formik.touched.email && formik.errors.email && (
        <HelperText type="error">{formik.errors.email}</HelperText>
      )}
      <Button
        mode="contained"
        loading={initialize.status === ReactQueryStatus.Pending}
        onPress={() => formik.handleSubmit()}
        style={{ marginTop: 24, alignSelf: 'center' }}
      >
        ENVIAR CÓDIGO
      </Button>
    </View>
  );
};

export default ForgotPasswordScreen;
