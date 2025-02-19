import { useRouter } from 'expo-router';
import Feedback from '@/core/shared/components/feedback';

const CongratsResetPasswordScreen = () => {
  const router = useRouter();

  return (
    <Feedback
      buttons={[
        {
          mode: 'contained',
          text: 'INICIAR SESIÓN',
          onPress: () => router.replace('/auth/sign-in'),
        },
      ]}
      subtitle="Ahora podrás ingresar con tu nueva contraseña"
      title="¡Contraseña actualizada!"
      type="success"
    />
  );
};

export default CongratsResetPasswordScreen;
