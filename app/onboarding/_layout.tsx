import { Stack } from 'expo-router';
import { useTheme } from 'react-native-paper';

const OnboardingLayout = () => {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={() => ({
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      })}
    >
      <Stack.Screen
        name="step-one"
        options={{}}
      />
      <Stack.Screen
        name="step-two"
        options={{}}
      />
      <Stack.Screen
        name="step-three"
        options={{}}
      />
      <Stack.Screen
        name="step-four"
        options={{}}
      />
      <Stack.Screen
        name="step-five"
        options={{}}
      />
      <Stack.Screen
        name="step-six"
        options={{}}
      />
      <Stack.Screen
        name="congrats-onboarding"
        options={{}}
      />
    </Stack>
  );
};

export default OnboardingLayout;
