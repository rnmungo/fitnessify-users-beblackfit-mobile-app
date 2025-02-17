import { Stack } from 'expo-router';
import { useTheme } from 'react-native-paper';

const SignUpLayout = () => {
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
    </Stack>
  );
};

export default SignUpLayout;
