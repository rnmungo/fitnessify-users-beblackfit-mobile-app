import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import {
  Image,
  KeyboardAvoidingView,
  TextInput as NativeTextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  ActivityIndicator,
  Button,
  HelperText,
  Portal,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Copyright from '@/core/shared/components/copyright';
import { useSnackbar } from '@/core/shared/context/snackbar';
import { BadRequestServiceError } from '@/core/shared/services/exceptions';
import { useRegisterStore } from '@/core/account/store';
import useMutationSignUp from '@/core/account/hooks/useMutationSignUp';
import { ReactQueryStatus } from '@/constants/ReactQuery';
import PasswordTextInput, { type PasswordInputVariant } from '@/core/shared/components/password-text-input';
import { getPasswordStrength } from '@/core/account/utilities';
import TermsPrivacyModal from '@/core/shared/components/terms-privacy-modal';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('El correo electrónico no es válido')
    .required('Debes ingresar el correo electrónico'),
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .required('La contraseña es obligatoria'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Las contraseñas no coinciden')
    .required('Debes confirmar la contraseña'),
});

const SignUpScreen = () => {
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState<{
    label?: string;
    color: 'default' | 'success' | 'warning' | 'error'
  }>({
    label: undefined,
    color: 'default',
  });
  const [modalVisibleState, setModalVisibleState] = useState(false);
  const [modalTypeState, setModalTypeState] = useState<'terms' | 'privacy'>('terms');
  const { height } = useWindowDimensions();
  const theme = useTheme();
  const router = useRouter();
  const snackbar = useSnackbar();
  const { setEmail } = useRegisterStore();
  const signUp = useMutationSignUp();

  const emailInputRef = useRef<NativeTextInput>(null);
  const passwordInputRef = useRef<NativeTextInput>(null);
  const confirmPasswordInputRef = useRef<NativeTextInput>(null);

  const {
    errors,
    isSubmitting,
    touched,
    values,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: { email: '', password: '', confirmPassword: '' },
    validationSchema,
    onSubmit: async (values) => {
      const { email, password } = values;
      signUp.mutate({ email, password }, {
        onSuccess: () => {
          signUp.reset();
          setEmail(email);
          router.push('/auth/sign-up/verify-code');
        },
        onError: (error: unknown) => {
          signUp.reset();

          if (error instanceof BadRequestServiceError && error.code === 'EntityAlreadyExists') {
            setEmail(email);
            router.push('/auth/sign-up/verify-code');
            return;
          }

          snackbar.error('Ocurrió un error al registrarse. Intenta nuevamente.');
        },
      });
    },
  });

  const handleOpenModal = (modalType: 'terms' | 'privacy') => {
    setModalTypeState(modalType);
    setModalVisibleState(true);
  };

  const navigateToSignIn = useCallback(() => {
    router.push('/auth/sign-in');
  }, [router]);

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
    <KeyboardAvoidingView
      behavior="padding"
      style={{
        flex: 1,
        position: 'relative',
        backgroundColor: theme.colors.background,
      }}
    >
      <ScrollView style={{ paddingHorizontal: 40 }}>
        <View
          style={{
            paddingTop: height * 0.15,
            paddingBottom: 40,
            paddingHorizontal: 60,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Image
            source={require('@/assets/images/logo.png')}
            style={{
              width: '100%',
              height: 'auto',
              aspectRatio: '16 / 9',
              resizeMode: 'contain',
            }}
          />
        </View>
        <TextInput
          ref={emailInputRef}
          label="Correo electrónico"
          mode="outlined"
          returnKeyType="next"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          error={touched.email && !!errors.email}
          value={values.email}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          onSubmitEditing={() => {
            passwordInputRef.current?.focus();
          }}
        />
        {(touched.email && !!errors.email) && (
          <HelperText type="error">{errors.email}</HelperText>
        )}
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
        <Text
          variant="bodySmall"
          style={{
            marginTop: 20,
            textAlign: 'center',
            color: theme.colors.onSurfaceVariant,
          }}
        >
          Al confirmar, aceptas las{' '}
          <Text style={{ color: theme.colors.primary }} onPress={() => handleOpenModal('terms')}>
            Condiciones de uso
          </Text>{' '}
          y el{' '}
          <Text style={{ color: theme.colors.primary }} onPress={() => handleOpenModal('privacy')}>
            Aviso de privacidad
          </Text>{' '}
          de BeBlackFit.
        </Text>
        <View
          style={{
            marginTop: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
          }}
        >
          <Button
            accessibilityLabel="CONFIRMAR REGISTRO"
            mode="contained"
            disabled={isSubmitting}
            onPress={() => handleSubmit()}
          >
            CONFIRMAR REGISTRO
          </Button>
          <Text variant="labelMedium" style={{ color: theme.colors.onSurface }}>
            Ya tengo una cuenta
          </Text>
          <Button
            accessibilityLabel="INICIAR SESIÓN"
            mode="outlined"
            onPress={navigateToSignIn}
          >
            INICIAR SESIÓN
          </Button>
        </View>
      </ScrollView>
      <View style={{ alignItems: 'center', paddingBottom: 20 }}>
        <Copyright company="BeBlackFit" startYear={2021} />
      </View>
      <TermsPrivacyModal
        visible={modalVisibleState}
        onDismiss={() => setModalVisibleState(false)}
        type={modalTypeState}
      />
      <Portal>
        {(isSubmitting
          || signUp.status === ReactQueryStatus.Pending) && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: theme.colors.backdrop,
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
            }}
          >
            <ActivityIndicator animating size="large" color={theme.colors.primary} />
          </View>
        )}
      </Portal>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
