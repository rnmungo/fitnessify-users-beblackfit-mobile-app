import { Stack } from 'expo-router';
import { useTheme } from 'react-native-paper';

const ForgotPasswordLayout = () => {
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
        name="index"
        options={{}}
      />
      <Stack.Screen
        name="verify-code"
        options={{}}
      />
      <Stack.Screen
        name="reset-password"
        options={{}}
      />
      <Stack.Screen
        name="congrats-reset-password"
        options={{}}
      />
    </Stack>
  );
};

export default ForgotPasswordLayout;
