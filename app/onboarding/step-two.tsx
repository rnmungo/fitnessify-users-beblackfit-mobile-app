import { useCallback, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, useWindowDimensions } from 'react-native';
import { Card, Checkbox, Icon, Text, useTheme } from 'react-native-paper';
import { useOnboardingStore } from '@/core/account/store';
import StepperFooter from '@/core/shared/components/stepper-footer';
import { Gender } from '@/core/profile/interfaces/types';

const OnboardingStepTwoScreen = () => {
  const theme = useTheme();
  const router = useRouter();
  const { height } = useWindowDimensions();
  const { setOnboardingData, data } = useOnboardingStore();

  const [selectedGender, setSelectedGender] = useState<string | null>(data.gender || null);
  const [preferNotToSay, setPreferNotToSay] = useState<boolean>(data.gender === 'Unspecified');

  const GENDERS = [
    { label: 'Mujer', value: 'Female', icon: 'gender-female' },
    { label: 'Hombre', value: 'Male', icon: 'gender-male' },
  ];

  const handleSelectGender = useCallback((value: string) => {
    setSelectedGender(value);
    setPreferNotToSay(false);
  }, []);

  const handleTogglePreferNotToSay = useCallback(() => {
    if (!preferNotToSay) {
      setSelectedGender(null);
    }
    setPreferNotToSay(!preferNotToSay);
  }, []);

  const handleNext = useCallback(() => {
    const gender = preferNotToSay ? 'Unspecified' : selectedGender as Gender;
    setOnboardingData({ gender });
    router.push('/onboarding/step-three');
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
        ¿Cuál de las siguientes opciones te describe mejor?
      </Text>
      <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, marginTop: 10 }}>
        BeBlackFit utiliza esta información para diseñar un plan de entrenamiento adecuado y efectivo.
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 20, marginTop: 40 }}>
        {GENDERS.map((gender) => (
          <Card
            key={gender.value}
            style={{
              flex: 1,
              padding: 20,
              backgroundColor: selectedGender === gender.value ? theme.colors.elevation.level5 : theme.colors.elevation.level2,
              borderWidth: selectedGender === gender.value ? 1 : 0,
              borderColor: theme.colors.onSurfaceVariant,
            }}
            onPress={() => handleSelectGender(gender.value)}
          >
            <Card.Content style={{ alignItems: 'center' }}>
              <Icon source={gender.icon} size={62} />
              <Text variant="titleMedium" style={{ color: theme.colors.onSurfaceVariant, marginTop: 10 }}>
                {gender.label}
              </Text>
            </Card.Content>
          </Card>
        ))}
      </View>
      <View style={{ marginTop: 20 }}>
        <Checkbox.Item
          position="leading"
          mode="android"
          label="Prefiero no decirlo"
          style={{ paddingHorizontal: 0 }}
          labelStyle={{ textAlign: 'left', paddingLeft: 10 }}
          status={preferNotToSay ? 'checked' : 'unchecked'}
          onPress={handleTogglePreferNotToSay}
          color={theme.colors.primary}
          uncheckedColor={theme.colors.primary}
        />
      </View>
      <StepperFooter
        currentStep={2}
        totalSteps={6}
        onPrevious={() => router.back()}
        onNext={handleNext}
        isNextDisabled={!selectedGender && !preferNotToSay}
      />
    </View>
  );
};

export default OnboardingStepTwoScreen;
