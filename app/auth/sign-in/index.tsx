import { useCallback, useRef, useState } from 'react';
import { Link, useRouter } from 'expo-router';
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
import { useAuthStore } from '@/core/account/store';
import { useSnackbar } from '@/core/shared/context/snackbar';
import Copyright from '@/core/shared/components/copyright';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('El correo electrónico no es válido')
    .required('El correo electrónico es obligatorio'),
  password: Yup.string().required('La contraseña es obligatoria'),
});

const SignInScreen = () => {
  const [visibilityState, setVisibilityState] = useState<boolean>(false);
  const { signIn } = useAuthStore();
  const theme = useTheme();
  const snackbar = useSnackbar();
  const { height } = useWindowDimensions();
  const router = useRouter();

  const emailInputRef = useRef<NativeTextInput>(null);
  const passwordInputRef = useRef<NativeTextInput>(null);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: async (values: { email: string; password: string }) => {
      try {
        const isAuthenticated = await signIn(values.email, values.password);

        if (isAuthenticated) {
          router.replace('/(tabs)/home');
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          snackbar.error(error.message);
        }
      }
    },
  });

  const togglePasswordVisibility = useCallback(() => {
    setVisibilityState(prevState => !prevState);
  }, []);

  const navigateToRegister = useCallback(() => {
    router.push('/auth/sign-up');
  }, [router]);

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
            paddingTop: height * 0.1,
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
          error={formik.touched.email && !!formik.errors.email}
          value={formik.values.email}
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          onSubmitEditing={() => {
            passwordInputRef.current?.focus();
          }}
        />
        {(formik.touched.email && !!formik.errors.email) && (
          <HelperText
            type="error"
            visible={formik.touched.email && !!formik.errors.email}
          >
            {formik.errors.email}
          </HelperText>
        )}
        <View style={{ marginTop: 32 }}>
          <TextInput
            ref={passwordInputRef}
            label="Contraseña"
            mode="outlined"
            returnKeyType="done"
            error={formik.touched.password && !!formik.errors.password}
            secureTextEntry={!visibilityState}
            right={
              <TextInput.Icon
                icon={visibilityState ? 'eye' : 'eye-off'}
                onPress={togglePasswordVisibility}
              />
            }
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            onSubmitEditing={() => {
              formik.handleSubmit();
            }}
          />
          {(formik.touched.password && !!formik.errors.password) && (
            <HelperText
              type="error"
              visible={formik.touched.password && !!formik.errors.password}
            >
              {formik.errors.password}
            </HelperText>
          )}
          <Link
            href="/auth/forgot-password"
            style={{ paddingTop: 10, paddingLeft: 8, textDecorationLine: 'none' }}
          >
            <Text variant="labelMedium" style={{ color: theme.colors.primary }}>
              Olvidé mi contraseña
            </Text>
          </Link>
        </View>
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
            accessibilityLabel="INICIAR SESIÓN"
            mode="contained"
            disabled={formik.isSubmitting}
            onPress={() => formik.handleSubmit()}
          >
            INICIAR SESIÓN
          </Button>
          <Text variant="labelMedium" style={{ color: theme.colors.onSurface }}>
            ¿Sos nuevo en BeBlackFit?
          </Text>
          <Button
            accessibilityLabel="REGISTRATE"
            mode="outlined"
            onPress={navigateToRegister}
          >
            REGISTRATE
          </Button>
        </View>
      </ScrollView>
      <View style={{ alignItems: 'center', paddingVertical: 20 }}>
        <Copyright company="BeBlackFit" startYear={2023} />
      </View>
      <Portal>
        {formik.isSubmitting && (
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
            <ActivityIndicator
              animating
              size="large"
              color={theme.colors.primary}
            />
          </View>
        )}
      </Portal>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;
