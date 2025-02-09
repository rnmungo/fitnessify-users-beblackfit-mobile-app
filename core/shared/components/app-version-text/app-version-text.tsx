import Constants from 'expo-constants';
import { Text } from 'react-native-paper';
import type { TextProps } from 'react-native-paper';

type AppVersionTextProps<T> = Omit<TextProps<T>, 'children'>;

const AppVersionText = ({ ...textProps }: AppVersionTextProps<"bodySmall">) => {
  const appVersion = Constants.expoConfig?.version || Constants.nativeAppVersion || '1.0.0';

  return (
    <Text {...textProps}>
      Versión: {appVersion}
    </Text>
  );
};

export default AppVersionText;
