import { useCallback, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, useWindowDimensions } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { useOnboardingStore } from '@/core/account/store';
import StepperFooter from '@/core/shared/components/stepper-footer';

const FREQUENCY_OPTIONS = [
  { label: 'Nunca hice deporte', value: 'Sedentary' },
  { label: 'De chico hice deporte pero no continué', value: 'LightlyActive' },
  { label: 'Siempre entrené pero hace tiempo no hago nada', value: 'ModeratelyActive' },
  { label: 'Entreno activamente, estoy listo para cualquier reto', value: 'VeryActive' },
];

const OnboardingStepFourScreen = () => {
  const theme = useTheme();
  const router = useRouter();
  const { height } = useWindowDimensions();
  const { setOnboardingData, data } = useOnboardingStore();

  const initialFrequencyIndex = FREQUENCY_OPTIONS.findIndex(option => option.value === data.physicalState) ?? 0;
  const [selectedFrequency, setSelectedFrequency] = useState<number>(initialFrequencyIndex);

  const handleNext = useCallback(() => {
    setOnboardingData({ physicalState: FREQUENCY_OPTIONS[selectedFrequency].value });
    router.push('/onboarding/step-five');
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 40,
        paddingTop: height * 0.1,
      }}
    >
      <Text variant="headlineMedium" style={{ color: theme.colors.onSurface }}>
        ¿Con qué frecuencia haces actividad física?
      </Text>
      <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, marginTop: 16 }}>
        Esta información nos ayudará a diseñar un entrenamiento personalizado y seguro.
      </Text>
      <Text
        variant="titleMedium"
        style={{
          textAlign: 'center',
          color: theme.colors.onSurfaceVariant,
          marginTop: 40,
          marginBottom: 8,
        }}
      >
        {FREQUENCY_OPTIONS[selectedFrequency].label}
      </Text>
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={0}
        maximumValue={FREQUENCY_OPTIONS.length - 1}
        step={1}
        value={selectedFrequency}
        onValueChange={setSelectedFrequency}
        minimumTrackTintColor={theme.colors.primary}
        maximumTrackTintColor={theme.colors.onSurfaceVariant}
        thumbTintColor={theme.colors.primary}
      />
      <StepperFooter
        currentStep={4}
        totalSteps={6}
        onPrevious={() => router.back()}
        onNext={handleNext}
      />
    </View>
  );
};

export default OnboardingStepFourScreen;
