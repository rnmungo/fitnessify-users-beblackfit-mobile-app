import { useCallback, useRef, useState } from 'react';
import { View, Image, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import {
  ActivityIndicator,
  Button,
  Portal,
  Text,
  useTheme,
} from 'react-native-paper';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {
  useMutationSendRecoveryCode,
  useMutationVerifyCode,
} from '@/core/account/hooks';
import { useRegisterStore } from '@/core/account/store';
import { useSnackbar } from '@/core/shared/context/snackbar';
import { ReactQueryStatus } from '@/constants/ReactQuery';

const CELL_COUNT = 6;

const VerifyCodeScreen = () => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const theme = useTheme();
  const router = useRouter();
  const { height } = useWindowDimensions();
  const snackbar = useSnackbar();
  const send = useMutationSendRecoveryCode();
  const verify = useMutationVerifyCode();
  const { email } = useRegisterStore();

  const isCodeComplete = value.length === CELL_COUNT;

  const handleVerify = useCallback(() => {
    if (isCodeComplete && email) {
      verify.mutate({ email, recoveryCode: value }, {
        onSuccess: () => {
          verify.reset();
          router.replace('/(tabs)/home');
        },
        onError: () => {
          verify.reset();
          snackbar.error('Ocurrió un error al validar el código, vuelva a intentar.');
        },
      });
      router.replace('/(tabs)/home');
    }
  }, [value, router]);

  const handleResendCode = () => {
    if (email) {
      send.mutate({ email }, {
        onSuccess: () => {
          send.reset();
          snackbar.success('El código fue reenviado correctamente.')
        },
        onError: () => {
          send.reset();
          snackbar.error('Ocurrió un error al reenviar el código, vuelva a intentar.')
        },
      });
    }
  };

  return (
    <View
      style={{
        paddingTop: height * 0.15,
        paddingHorizontal: 30,
      }}
    >
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Image
          source={require('@/assets/images/security-on.png')}
          style={{
            width: '100%',
            height: 'auto',
            aspectRatio: '16 / 9',
            resizeMode: 'contain',
            marginBottom: 10,
          }}
        />
        <Text variant="headlineMedium" style={{ color: theme.colors.onSurfaceVariant, textAlign: 'center' }}>
          Verificá tu cuenta
        </Text>
        <Text variant="bodyMedium" style={{ textAlign: 'center', color: theme.colors.onSurfaceVariant, marginTop: 8 }}>
          Proteger tu identidad es nuestra prioridad, por este motivo hemos enviado un código de verificación a tu
          casilla de correo <Text style={{ fontWeight: 'bold', color: theme.colors.primary }}>********@gmail.com</Text>, ingresalo para confirmar
          tus datos.
        </Text>
      </View>

      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={{
          marginTop: 20,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 90,
          gap: 10,
        }}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <View
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[
              {
                width: 30,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomColor: theme.colors.surfaceVariant,
                borderBottomWidth: 1,
              },
              isFocused && {
                borderBottomColor: theme.colors.primary,
                borderBottomWidth: 2,
              },
            ]}
          >
            <Text
              variant="titleLarge"
              style={{
                color: theme.colors.onSurfaceVariant,
                textAlign: 'center',
              }}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
      <Button
        mode="contained"
        disabled={!isCodeComplete}
        onPress={handleVerify}
        loading={verify.status === ReactQueryStatus.Pending}
        style={{
          marginVertical: 28,
          alignSelf: 'center',
        }}
      >
        CONTINUAR
      </Button>
      <View style={{ alignItems: 'center', marginTop: 16 }}>
        <Text style={{ color: theme.colors.onSurfaceVariant, textAlign: 'center' }}>
          Recibir el código puede tomar unos minutos
        </Text>
        <Text
          style={{ color: theme.colors.onSurfaceVariant, textAlign: 'center', marginTop: 4 }}
          onPress={handleResendCode}
        >
          ¿No lo recibiste? <Text style={{ color: theme.colors.primary }}>Reenviar un nuevo código</Text>
        </Text>
      </View>
      <Portal>
        {send.status === ReactQueryStatus.Pending && (
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
              color={theme.colors.onSurfaceVariant}
            />
          </View>
        )}
      </Portal>
    </View>
  );
};

export default VerifyCodeScreen;
