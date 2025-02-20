import { useRouter } from 'expo-router';
import Feedback from '@/core/shared/components/feedback';

const CongratsOnboardingScreen = () => {
  const router = useRouter();

  return (
    <Feedback
      buttons={[
        {
          mode: 'contained',
          text: 'COMENZAR',
          onPress: () => router.replace('/(tabs)/home'),
        },
      ]}
      subtitle="Completaste todos los pasos, ahora comencemos a trabajar en tus objetivos"
      title="¡Bien hecho!"
      type="success"
    />
  );
};

export default CongratsOnboardingScreen;
