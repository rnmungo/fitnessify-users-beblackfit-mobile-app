import { useCallback, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, useWindowDimensions } from 'react-native';
import { Checkbox, Text, useTheme } from 'react-native-paper';
import { useOnboardingStore } from '@/core/account/store';
import StepperFooter from '@/core/shared/components/stepper-footer';

const goalsOptions = [
  { label: 'Perder peso', value: 'LoseWeight' },
  { label: 'Ganar músculo', value: 'GainMuscle' },
  { label: 'Mejorar la alimentación', value: 'ImproveDiet' },
  { label: 'Mejorar la resistencia', value: 'ImproveEndurance' },
  { label: 'Reducir el estrés', value: 'ReduceStress' },
  { label: 'Mejorar la fuerza mental', value: 'ImproveMentalStrength' },
];

const OnboardingStepFiveScreen = () => {
  const theme = useTheme();
  const router = useRouter();
  const { height } = useWindowDimensions();
  const { setOnboardingData, data } = useOnboardingStore();

  const [selectedGoals, setSelectedGoals] = useState<string[]>(data.goals || []);

  const toggleGoalSelection = useCallback((goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(prevState => [...prevState].filter(obj => obj !== goal));
    } else {
      setSelectedGoals(prevState => [...prevState, goal]);
    }
  }, [selectedGoals]);

  const handleNext = useCallback(() => {
    setOnboardingData({ goals: selectedGoals });
    router.push('/onboarding/step-six');
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
        ¿Cuáles son tus objetivos?
      </Text>
      <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, marginTop: 10 }}>
        Seleccioná de 1 a 3 objetivos para que el entrenador pueda ayudarte a conseguirlos.
      </Text>
      <View style={{ marginTop: 20 }}>
        {goalsOptions.map((goal) => (
          <Checkbox.Item
            key={goal.value}
            label={goal.label}
            position="leading"
            mode="android"
            style={{ paddingHorizontal: 0 }}
            labelStyle={{ textAlign: 'left', paddingLeft: 10 }}
            status={selectedGoals.includes(goal.value) ? 'checked' : 'unchecked'}
            onPress={() => toggleGoalSelection(goal.value)}
            color={theme.colors.primary}
            uncheckedColor={theme.colors.primary}
          />
        ))}
      </View>
      <StepperFooter
        currentStep={5}
        totalSteps={6}
        onPrevious={() => router.back()}
        onNext={handleNext}
        isNextDisabled={selectedGoals.length < 1 || selectedGoals.length > 3}
      />
    </View>
  );
};

export default OnboardingStepFiveScreen;
