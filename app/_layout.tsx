import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { DarkTheme as NavigationDarkTheme, ThemeProvider } from '@react-navigation/native';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  configureFonts,
  MD3DarkTheme as DefaultMD3DarkTheme,
  PaperProvider,
} from 'react-native-paper';
import 'react-native-reanimated';
import * as Sentry from '@sentry/react-native';
import QueryProvider from '@/core/shared/context/query';
import SnackbarProvider from '@/core/shared/context/snackbar';
import { Colors } from '@/constants/Colors';

Sentry.init({
  dsn: 'https://682e1d7c043ab5820178962edbdd256e@o4508784507027456.ingest.us.sentry.io/4508784508534784',

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

SplashScreen.preventAutoHideAsync();

const fontConfig = {
  fontFamily: Platform.select({
    web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
    ios: 'System',
    default: 'sans-serif',
  }),
} as const;

const fonts = configureFonts({ config: fontConfig });

const PaperDarkTheme = {
  ...DefaultMD3DarkTheme,
  colors: Colors.dark,
  fonts,
};

const RootLayout = () => {
  const [loaded] = useFonts({
    RobotoBlack: require('../assets/fonts/Roboto-Black.ttf'),
    RobotoBold: require('../assets/fonts/Roboto-Bold.ttf'),
    RobotoExtraBold: require('../assets/fonts/Roboto-ExtraBold.ttf'),
    RobotoExtraLight: require('../assets/fonts/Roboto-ExtraLight.ttf'),
    RobotoLight: require('../assets/fonts/Roboto-Light.ttf'),
    RobotoMedium: require('../assets/fonts/Roboto-Medium.ttf'),
    RobotoRegular: require('../assets/fonts/Roboto-Regular.ttf'),
    RobotoSemiBold: require('../assets/fonts/Roboto-SemiBold.ttf'),
    RobotoThin: require('../assets/fonts/Roboto-Thin.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <QueryProvider>
        <PaperProvider theme={PaperDarkTheme}>
          <SnackbarProvider>
            <ThemeProvider value={NavigationDarkTheme}>
              <Slot />
              <StatusBar style="auto" />
            </ThemeProvider>
          </SnackbarProvider>
        </PaperProvider>
      </QueryProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
