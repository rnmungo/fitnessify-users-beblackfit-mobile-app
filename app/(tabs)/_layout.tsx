import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { View } from 'react-native';
import {
  ActivityIndicator,
  Icon,
} from 'react-native-paper';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { AUTH_STATUS } from '@/core/auth/constants';
import { useAuthStore } from '@/core/auth/store';
import AppBar from '@/core/auth/components/appbar';

import HomeScreen from './home';
import RoutinesScreen from './routines';
import ProfileScreen from './profile';

const Tabs = createMaterialBottomTabNavigator();

const GuardLayout = () => {
  const { session, checkStatus } = useAuthStore();

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

  const avatarText =
    session?.profile?.name
      && session?.profile?.lastName
      ? `${session?.profile?.name[0].toUpperCase()}${session?.profile?.lastName[0].toUpperCase()}`
      : '';

  return (
    <>
      <AppBar
        avatarText={avatarText}
        title={`Hola ${session?.profile?.name}! 👋`}
      />
      <Tabs.Navigator initialRouteName="Home">
        <Tabs.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Inicio',
            tabBarIcon: ({ color }: { color: string }) => {
              return <Icon source="home-outline" size={24} color={color} />;
            },
          }}
        />
        <Tabs.Screen
          name="Routines"
          component={RoutinesScreen}
          options={{
            tabBarLabel: 'Rutinas',
            tabBarIcon: ({ color }: { color: string }) => {
              return <Icon source="weight-lifter" size={24} color={color} />;
            },
          }}
        />
        <Tabs.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Perfil',
            tabBarIcon: ({ color }: { color: string }) => {
              return <Icon source="account-outline" size={24} color={color} />;
            },
          }}
        />
      </Tabs.Navigator>
    </>
  );
};

export default GuardLayout;
