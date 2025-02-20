import { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, useWindowDimensions } from 'react-native';
import { RadioButton, Text, useTheme } from 'react-native-paper';
import { useOnboardingStore } from '@/core/account/store';
import StepperFooter from '@/core/shared/components/stepper-footer';

const equipmentOptions = [
  { label: 'Peso corporal', value: 'BodyWeight' },
  { label: 'Mancuernas y pesas rusas', value: 'DumbbellsAndKettlebells' },
  { label: 'Bandas', value: 'Bands' },
  { label: 'Todas las anteriores', value: 'All' },
];

const OnboardingStepSixScreen = () => {
  const theme = useTheme();
  const router = useRouter();
  const { height } = useWindowDimensions();
  const { setOnboardingData, data } = useOnboardingStore();

  const [selectedEquipment, setSelectedEquipment] = useState<string>(data.preferredEquipment || '');

  const handleNext = () => {
    setOnboardingData({ preferredEquipment: selectedEquipment });
    router.replace('/onboarding/congrats-onboarding');
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 40,
        paddingTop: height * 0.1,
      }}
    >
      <Text variant="headlineMedium" style={{ color: theme.colors.onSurface }}>
        ¿Cómo te gustaría entrenar?
      </Text>
      <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, marginTop: 16 }}>
        Esto nos permitirá seleccionar un entrenamiento acorde a tus preferencias.
      </Text>
      <RadioButton.Group
        value={selectedEquipment}
        onValueChange={(newValue) => setSelectedEquipment(newValue)}
      >
        <View style={{ marginTop: 40 }}>
          {equipmentOptions.map((option) => (
            <RadioButton.Item
              key={option.value}
              label={option.label}
              value={option.value}
              position="leading"
              mode="android"
              style={{ paddingHorizontal: 0 }}
              labelStyle={{ textAlign: 'left', paddingLeft: 10 }}
              color={theme.colors.primary}
              uncheckedColor={theme.colors.primary}
            />
          ))}
        </View>
      </RadioButton.Group>
      <StepperFooter
        currentStep={6}
        totalSteps={6}
        onPrevious={() => router.back()}
        onNext={handleNext}
        isNextDisabled={!selectedEquipment}
      />
    </View>
  );
};

export default OnboardingStepSixScreen;
