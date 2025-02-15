import { useCallback, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { View } from 'react-native';
import { Avatar, IconButton, Text, useTheme } from 'react-native-paper';
import { useAuthStore } from '@/core/account/store';
import CustomerServiceDialog from '@/core/shared/components/customer-service-dialog';

const ProfileLayout = () => {
  const [openState, setOpenState] = useState<boolean>(false);
  const theme = useTheme();
  const router = useRouter();
  const { session } = useAuthStore();

  const handleOpenCustomerService = useCallback(() => {
    setOpenState(true);
  }, []);

  const handleCloseCustomerService = useCallback(() => {
    setOpenState(false);
  }, []);

  const avatarText =
    session?.profile?.name
      && session?.profile?.lastName
      ? `${session?.profile?.name[0].toUpperCase()}${session?.profile?.lastName[0].toUpperCase()}`
      : '';

  return (
    <>
      <Stack
        screenOptions={() => ({
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          contentStyle: {
            backgroundColor: theme.colors.background,
          },
        })}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Mi cuenta',
            headerTitle: (props) => (
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Avatar.Text
                  size={40}
                  label={avatarText}
                  style={{ marginRight: 16, backgroundColor: theme.colors.surfaceVariant }}
                />
                <Text variant="titleMedium" {...props} />
              </View>
            ),
            headerRight: () => (
              <IconButton
                icon="face-agent"
                size={24}
                onPress={handleOpenCustomerService}
              />
            ),
          }}
        />
        <Stack.Screen
          name="edit"
          options={{
            title: 'Editar cuenta',
            headerTitle: (props) => (
              <Text variant="titleMedium" {...props} />
            ),
            headerRight: () => (
              <IconButton
                icon="face-agent"
                size={24}
                onPress={handleOpenCustomerService}
              />
            ),
          }}
        />
        <Stack.Screen
          name="change-password"
          options={{
            title: 'Cambiar contraseña',
            headerTitle: (props) => (
              <Text variant="titleMedium" {...props} />
            ),
            headerRight: () => (
              <IconButton
                icon="face-agent"
                size={24}
                onPress={handleOpenCustomerService}
              />
            ),
          }}
        />
      </Stack>
      <CustomerServiceDialog visible={openState} onClose={handleCloseCustomerService} />
    </>
  );
};

export default ProfileLayout;
