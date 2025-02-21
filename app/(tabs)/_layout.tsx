import { useEffect } from 'react';
import { Redirect, Tabs } from 'expo-router';
import { View } from 'react-native';
import {
  ActivityIndicator,
  Icon,
  useTheme,
} from 'react-native-paper';
import { AUTH_STATUS, ONBOARDING_STATUS } from '@/core/account/constants';
import { useAuthStore } from '@/core/account/store';

const GuardLayout = () => {
  const { session, checkStatus } = useAuthStore();
  const theme = useTheme();

  useEffect(() => {
    checkStatus();
  }, []);

  if (session?.status === AUTH_STATUS.CHECKING) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 5,
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  if (session?.status === AUTH_STATUS.UNAUTHENTICATED) {
    return <Redirect href="/auth/sign-in" />;
  }

  if (session?.profile?.onBoardingStatus !== ONBOARDING_STATUS.COMPLETED) {
    return <Redirect href="/onboarding/step-one" />;
  }

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.onSecondaryContainer,
        tabBarInactiveTintColor: theme.colors.onSecondaryContainer,
        tabBarStyle: {
          backgroundColor: theme.colors.elevation.level1,
          paddingTop: 16,
          paddingBottom: 16,
          elevation: 0,
          shadowOpacity: 0,
          minHeight: 94,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          marginTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, focused }: { color: string, focused: boolean }) => {
            return (
              <View
                style={
                  focused
                    ? {
                        backgroundColor: theme.colors.secondaryContainer,
                        borderRadius: 20,
                        width: 64,
                        height: 32,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }
                    : {}
                }
              >
                <Icon source="home-outline" size={24} color={color} />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="routines"
        options={{
          tabBarLabel: 'Rutinas',
          tabBarIcon: ({ color, focused }: { color: string, focused: boolean }) => {
            return (
              <View
                style={
                  focused
                    ? {
                        backgroundColor: theme.colors.secondaryContainer,
                        borderRadius: 20,
                        width: 64,
                        height: 32,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }
                    : {}
                }
              >
                <Icon source="weight-lifter" size={24} color={color} />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, focused }: { color: string, focused: boolean }) => {
            return (
              <View
                style={
                  focused
                    ? {
                        backgroundColor: theme.colors.secondaryContainer,
                        borderRadius: 20,
                        width: 64,
                        height: 32,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }
                    : {}
                }
              >
                <Icon source="account-outline" size={24} color={color} />
              </View>
            );
          },
        }}
      />
    </Tabs>
  );
};

export default GuardLayout;
