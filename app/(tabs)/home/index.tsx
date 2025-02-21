import { useCallback, useEffect, useMemo } from 'react';
import { useRouter } from 'expo-router';
import { parseISO, differenceInDays } from 'date-fns';
import isEmpty from 'lodash.isempty';
import { Linking, RefreshControl, ScrollView, View } from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Icon,
  IconButton,
  Surface,
  Text,
  useTheme,
} from 'react-native-paper';
import { ReactQueryStatus } from '@/constants/ReactQuery';
import { ExternalLinks } from '@/constants/ExternalLinks';
import { useAuthStore } from '@/core/account/store';
import useQuerySearchUserRoutine from '@/core/routine/hooks/useQuerySearchUserRoutine';
import useQueryMySubscription from '@/core/account/hooks/useQueryMySubscription';
import {
  getRoutineLevelNumber,
  formatRoutineDuration,
} from '@/core/routine/utilities/routineUtils';
import Skeleton from '@/core/shared/components/skeleton';

type SubscriptionProps = {
  title: string;
  description: string;
  onPress?: () => void;
};

const HomeScreen = () => {
  const theme = useTheme();
  const router = useRouter();
  const { session, setSubscription } = useAuthStore();
  const userRoutineQuery = useQuerySearchUserRoutine({ userId: session?.user?.id || '' });
  const subscriptionQuery = useQueryMySubscription({ userId: session?.user?.id || '' });

  useEffect(() => {
    if (subscriptionQuery.status === ReactQueryStatus.Success) {
      setSubscription(subscriptionQuery.data ? subscriptionQuery.data : undefined);
    }
  }, [subscriptionQuery.status]);

  const handleOnRefresh = useCallback(() => {
    subscriptionQuery.refetch();
    userRoutineQuery.refetch();
  }, [subscriptionQuery.refetch, userRoutineQuery.refetch]);

  const isRefreshing =
    subscriptionQuery.status === ReactQueryStatus.Pending ||
    userRoutineQuery.status === ReactQueryStatus.Pending

  const subscriptionProps: SubscriptionProps | undefined = useMemo(() => {
    if (session?.subscription) {
      const { subscription } = session;
      const today = new Date();
      const dueDate = parseISO(subscription.dueDate);
      const daysRemaining = differenceInDays(dueDate, today);

      if (daysRemaining === 0) {
        return {
          title: 'Tu suscripción vence hoy',
          description: 'Recordá hacer el pago para la renovación',
        };
      } else if (daysRemaining > 0) {
        return {
          title: 'Tu suscripción está activa',
          description: 'Comenzá a entrenar y trabajar en tus objetivos',
          onPress: () => router.push('/(tabs)/routines'),
        };
      } else if (daysRemaining < 0) {
        return {
          title: 'Tu suscripción se encuentra vencida',
          description: 'Recordá hacer el pago para la renovación',
        };
      }
    }

    return undefined;
  }, [session?.subscription]);

  const lastRoutines = (userRoutineQuery.data?.results || []);
  const lastRoutine = lastRoutines.length > 0 ? lastRoutines[0] : undefined;

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        paddingHorizontal: 26,
        paddingVertical: 30,
        flexDirection: 'column',
        gap: 20,
      }}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={handleOnRefresh}
        />
      }
    >
      {userRoutineQuery.status === ReactQueryStatus.Pending && (
        <Surface
          style={{
            padding: 16,
            borderRadius: 12,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          elevation={1}
        >
          <Skeleton width={40} height={40} borderRadius={50} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Skeleton width="80%" height={20} />
            <Skeleton width="50%" height={16} style={{ marginTop: 4 }} />
          </View>
        </Surface>
      )}
      {userRoutineQuery.status === ReactQueryStatus.Error && (
        <Surface
          style={{
            padding: 16,
            borderRadius: 12,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.onError,
          }}
          elevation={1}
        >
          <View style={{ flex: 1 }}>
            <Text
              variant="titleMedium"
              style={{
                color: theme.colors.error,
              }}
            >
              Ocurrió un error inesperado
            </Text>
            <Text
              variant="bodyMedium"
              style={{
                color: theme.colors.onErrorContainer,
                marginTop: 4,
              }}
            >
              No pudimos recuperar tu información sobre rutinas realizadas. Intenta nuevamente.
            </Text>
          </View>
          <IconButton
            mode="outlined"
            icon="refresh"
            size={32}
            iconColor={theme.colors.onError}
            containerColor={theme.colors.error}
            rippleColor={theme.colors.errorContainer}
            onPress={() => userRoutineQuery.refetch()}
          />
        </Surface>
      )}
      {(userRoutineQuery.status === ReactQueryStatus.Success && lastRoutine) && (
        <Surface
          style={{ padding: 16, borderRadius: 12, flexDirection: 'row', alignItems: 'center' }}
          elevation={1}
        >
          <Avatar.Text
            size={40}
            label={getRoutineLevelNumber(lastRoutine.routineLevel)}
            style={{ marginRight: 12 }}
            labelStyle={{ fontSize: 16 }}
          />
          <View style={{ flex: 1 }}>
            <Text
              variant="titleMedium"
              style={{
                color: theme.colors.onSurface,
              }}
            >
              Tu último entrenamiento
            </Text>
            <Text
              variant="bodyMedium"
              style={{
                color: theme.colors.onSurfaceVariant,
                marginTop: 4,
              }}
            >
              {lastRoutine.routineName}{', '}
              {formatRoutineDuration(lastRoutine.routineDuration)}
            </Text>
          </View>
          <IconButton mode="outlined" icon="play-circle" size={32} onPress={() => router.push(`/routines/${lastRoutine.routineId}`)} />
        </Surface>
      )}
      {(userRoutineQuery.status === ReactQueryStatus.Success && !lastRoutine) && (
        <Surface
          style={{ padding: 16, borderRadius: 12, flexDirection: 'row', alignItems: 'center' }}
          elevation={1}
        >
          <View style={{ flex: 1 }}>
            <Text
              variant="titleMedium"
              style={{
                color: theme.colors.onSurface,
              }}
            >
              No realizaste ninguna rutina aún
            </Text>
            <Text
              variant="bodyMedium"
              style={{
                color: theme.colors.onSurfaceVariant,
                marginTop: 4,
              }}
            >
              Comenzá tu entrenamiento y alcanzá tus objetivos
            </Text>
          </View>
          <IconButton icon="chevron-right" size={32} iconColor="white" onPress={() => router.push('/(tabs)/routines')} />
        </Surface>
      )}
      <Card mode="elevated" elevation={1}>
        <Card.Title
          title="Artículo destacado"
          right={(props) => <Icon {...props} source="star" />}
          rightStyle={{ paddingRight: 16 }}
        />
        <Card.Cover
          source={{ uri: 'https://lirp.cdn-website.com/47db96a5/dms3rep/multi/opt/DSC041891608057773933-1920w.jpg' }}
          style={{ borderRadius: 0 }}
        />
        <Card.Content style={{ padding: 16 }}>
          <Text variant="titleMedium" style={{ color: theme.colors.onSurface }}>El método BeBlackFit</Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, marginTop: 4 }}>Visita nuestra web para enterarte de las últimas novedades</Text>
        </Card.Content>
        <Card.Actions style={{ padding: 16 }}>
          <Button
            mode="contained"
            onPress={() => {
              const link = ExternalLinks['InstitutionalPage'];

              if (link) {
                Linking.openURL(link);
              }
            }}
          >
            Ir al sitio
          </Button>
        </Card.Actions>
      </Card>
      {subscriptionQuery.status === ReactQueryStatus.Pending && (
        <Surface
          style={{
            padding: 16,
            borderRadius: 12,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          elevation={1}
        >
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Skeleton width="80%" height={20} />
            <Skeleton width="50%" height={16} style={{ marginTop: 4 }} />
          </View>
        </Surface>
      )}
      {subscriptionQuery.status === ReactQueryStatus.Error && (
        <Surface
          style={{
            padding: 16,
            borderRadius: 12,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.onError,
          }}
          elevation={1}
        >
          <View style={{ flex: 1 }}>
            <Text
              variant="titleMedium"
              style={{
                color: theme.colors.error,
              }}
            >
              Ocurrió un error inesperado
            </Text>
            <Text
              variant="bodyMedium"
              style={{
                color: theme.colors.onErrorContainer,
                marginTop: 4,
              }}
            >
              No pudimos recuperar la información de tu subscripción. Intenta nuevamente.
            </Text>
          </View>
          <IconButton
            mode="outlined"
            icon="refresh"
            size={32}
            iconColor={theme.colors.onError}
            containerColor={theme.colors.error}
            rippleColor={theme.colors.errorContainer}
            onPress={() => subscriptionQuery.refetch()}
          />
        </Surface>
      )}
      {(subscriptionQuery.status === ReactQueryStatus.Success && !isEmpty(subscriptionProps)) && (
        <Surface
          style={{ padding: 16, borderRadius: 12, flexDirection: 'row', alignItems: 'center' }}
          elevation={1}
        >
          <View style={{ flex: 1 }}>
            <Text variant="titleMedium" style={{ color: theme.colors.onSurface }}>
              {subscriptionProps.title}
            </Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, marginTop: 4 }}>
              {subscriptionProps.description}
            </Text>
          </View>
          <IconButton icon="chevron-right" size={32} iconColor="white" onPress={subscriptionProps.onPress} />
        </Surface>
      )}
      {(subscriptionQuery.status === ReactQueryStatus.Success && isEmpty(subscriptionProps)) && (
        <Surface
          style={{ padding: 16, borderRadius: 12, flexDirection: 'row', alignItems: 'center' }}
          elevation={1}
        >
          <View style={{ flex: 1 }}>
            <Text variant="titleMedium" style={{ color: theme.colors.onSurface }}>
            No tenés un plan activo
            </Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, marginTop: 4 }}>
            Tenemos que trabajar juntos en tus objetivos, realizá el pago de tu suscripción, envianos el comprobante y activaremos tu cuenta.
            </Text>
          </View>
        </Surface>
      )}
    </ScrollView>
  );
};

export default HomeScreen;
