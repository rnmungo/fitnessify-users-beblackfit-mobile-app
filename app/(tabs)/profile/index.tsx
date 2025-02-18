import { useCallback, useState } from 'react';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Button,
  Divider,
  List,
  Text,
  useTheme,
} from 'react-native-paper';
import { useAuthStore } from '@/core/account/store';
import {
  EQUIPMENT_TRANSLATION,
  GENDER_TRANSLATION,
  PHYSICAL_STATE_TRANSLATION,
} from '@/core/profile/constants';
import { getStatusByBMI } from '@/core/profile/utilities/healthUtils';
import CustomerServiceDialog from '@/core/shared/components/customer-service-dialog';
import AppVersionText from '@/core/shared/components/app-version-text';

const ProfileScreen = () => {
  const [openState, setOpenState] = useState<boolean>(false);
  const { session, signOut } = useAuthStore();
  const theme = useTheme();
  const router = useRouter();

  const handleSignOut = useCallback(() => {
    signOut();
    router.replace('/auth/sign-in');
  }, []);

  const handleOpenCustomerService = useCallback(() => {
    setOpenState(true);
  }, []);

  const handleCloseCustomerService = useCallback(() => {
    setOpenState(false);
  }, []);

  const goals =
    (session?.profile?.goals || []).length > 0
      ? session?.profile?.goals.join(', ')
      : 'Sin selección';

  const equipment =
    session?.profile?.preferredEquipment
      ? EQUIPMENT_TRANSLATION[session?.profile?.preferredEquipment]
      : 'Sin selección';

  const physicalState =
    session?.profile?.physicalState
      ? PHYSICAL_STATE_TRANSLATION[session?.profile?.physicalState]
      : 'Sin selección';

  const gender =
    session?.profile?.gender
      ? GENDER_TRANSLATION[session?.profile?.gender]
      : 'Sin selección';

  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 10,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: theme.colors.background,
      }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <List.Section title="Detalles de la cuenta" style={{ backgroundColor: theme.colors.surfaceVariant }}>
          <List.Item
            title="Email"
            description={session?.user?.email}
            style={{ backgroundColor: theme.colors.background }}
          />
          <Divider />
          <List.Item
            title="Cambiar contraseña"
            right={props => <List.Icon {...props} icon="chevron-right" />}
            style={{ backgroundColor: theme.colors.background }}
            onPress={() => router.push('/profile/change-password')}
          />
        </List.Section>
        <List.Section title="Datos del perfil" style={{ backgroundColor: theme.colors.surfaceVariant }}>
          <List.Item
            title={`Nombre completo: ${session?.profile?.name} ${session?.profile?.lastName}`}
            description={`Sexo: ${gender}`}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            style={{ backgroundColor: theme.colors.background }}
            onPress={() => router.push('/profile/edit')}
          />
          <Divider />
          <List.Item
            title={`Peso: ${session?.profile?.weight} Kg`}
            description={`Altura: ${session?.profile?.height} Cm`}
            style={{ backgroundColor: theme.colors.background }}
            right={() => (
              <View style={{ alignItems: 'flex-end' }}>
                <Text>{`IMC: ${session?.profile?.bodyMassIndex}`}</Text>
                <Text>{getStatusByBMI(session?.profile?.bodyMassIndex || 0)}</Text>
              </View>
            )}
          />
          <Divider />
          <List.Item
            title="Objetivos"
            description={goals}
            style={{ backgroundColor: theme.colors.background }}
          />
          <Divider />
          <List.Item
            title="Preferencia de equipamiento"
            description={equipment}
            style={{ backgroundColor: theme.colors.background }}
          />
          <Divider />
          <List.Item
            title="Actividad física"
            description={physicalState}
            style={{ backgroundColor: theme.colors.background }}
          />
        </List.Section>
        {session?.subscription && (
          <List.Section title="Suscripción" style={{ backgroundColor: theme.colors.surfaceVariant }}>
            <List.Item
              title="Cambiar mi suscripción o dar de baja"
              description={session.subscription.planName}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              style={{ backgroundColor: theme.colors.background }}
              onPress={handleOpenCustomerService}
            />
          </List.Section>
        )}
        <Divider />
        <View style={{ padding: 16 }}>
          <AppVersionText
            variant="bodySmall"
            style={{
              color: theme.colors.onSurfaceVariant,
            }}
          />
        </View>
      </ScrollView>
      <View
        style={{
          marginVertical: 16,
          alignSelf: 'center',
        }}
      >
        <Button
          accessibilityLabel="CERRAR SESIÓN"
          mode="text"
          onPress={handleSignOut}
        >
          CERRAR SESIÓN
        </Button>
      </View>
      <CustomerServiceDialog visible={openState} onClose={handleCloseCustomerService} />
    </View>
  );
};

export default ProfileScreen;
