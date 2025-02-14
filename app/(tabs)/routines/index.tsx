import { View, FlatList } from 'react-native';
import {
  ActivityIndicator,
  Button,
  IconButton,
  SegmentedButtons,
  Surface,
  Text,
  useTheme,
} from 'react-native-paper';
import { useRouter } from 'expo-router';
import useQuerySearchRoutines from '@/core/routine/hooks/useQuerySearchRoutines';
import { formatRoutineDuration } from '@/core/routine/utilities/routineUtils';
import Skeleton from '@/core/shared/components/skeleton';
import { ReactQueryStatus } from '@/constants/ReactQuery';

const LEVELS = [
  { label: 'Principiante', value: 'Beginner', icon: 'signal-cellular-1' },
  { label: 'Intermedio', value: 'Intermediate', icon: 'signal-cellular-2' },
  { label: 'Avanzado', value: 'Advanced', icon: 'signal-cellular-3' },
];

const EQUIPMENTS = [
  { label: 'Pesas', value: 'DumbbellsAndKettlebells' },
  { label: 'Bandas', value: 'Bands' },
  { label: 'Peso corporal', value: 'BodyWeight' },
  { label: 'Indistinto', value: 'All' },
];

const RoutinesScreen = () => {
  const theme = useTheme();
  const router = useRouter();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    status,
    filtersState,
    setFiltersState
  } = useQuerySearchRoutines({
    level: 'Beginner',
    equipment: 'BodyWeight'
  });

  const routines = data?.pages.flatMap(page => page.results) || [];

  return (
    <View style={{ flex: 1, paddingHorizontal: 26, paddingVertical: 30 }}>
      <Text
        variant="headlineMedium"
        style={{
          color: theme.colors.onSurface,
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        Comenzá a entrenar
      </Text>
      <Text
        variant="bodyLarge"
        style={{
          color: theme.colors.onSurfaceVariant,
          textAlign: 'center',
        }}
      >
        Elegí la rutina que más se adapte a tus preferencias
      </Text>
      <View
        style={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          width: '100%',
        }}
      >
        <Text
          variant="bodyLarge"
          style={{
            color: theme.colors.onSurfaceVariant,
            textAlign: 'center',
          }}
        >
          Dificultad
        </Text>
        <SegmentedButtons
          value={filtersState.level}
          onValueChange={(value) => setFiltersState(prev => ({ ...prev, level: value }))}
          buttons={LEVELS}
        />
        <Text
          variant="bodyLarge"
          style={{
            color: theme.colors.onSurfaceVariant,
            textAlign: 'center',
          }}
        >
          Preferencia de equipamiento
        </Text>
        <SegmentedButtons
          value={filtersState.equipment}
          onValueChange={(value) => setFiltersState(prev => ({ ...prev, equipment: value }))}
          buttons={EQUIPMENTS}
        />
      </View>
      {status === ReactQueryStatus.Pending && (
        <View
          style={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <ActivityIndicator animating size="large" color={theme.colors.onSurfaceVariant} />
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            Buscando rutinas
          </Text>
        </View>
      )}
      {status === ReactQueryStatus.Error && (
        <Surface
          style={{
            marginTop: 20,
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
              No pudimos recuperar las rutinas. Intenta nuevamente.
            </Text>
          </View>
          <IconButton
            mode="outlined"
            icon="refresh"
            size={32}
            iconColor={theme.colors.onError}
            containerColor={theme.colors.error}
            rippleColor={theme.colors.errorContainer}
            onPress={() => refetch()}
          />
        </Surface>
      )}
      {status === ReactQueryStatus.Success && routines.length === 0 && (
        <View
          style={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Text
            variant="titleMedium"
            style={{ color: theme.colors.onSurfaceVariant, textAlign: 'center' }}
          >
            No encontramos rutinas con los filtros seleccionados
          </Text>
          <Text
            variant="bodyMedium"
            style={{
              color: theme.colors.onSurfaceVariant,
              textAlign: 'center',
              marginTop: 4,
            }}
          >
            Intenta ajustar los filtros para ver más opciones.
          </Text>
          <Button
            mode="outlined"
            onPress={() => setFiltersState({ level: 'Beginner', equipment: 'All' })}
            style={{ marginTop: 12 }}
          >
            Restablecer Filtros
          </Button>
        </View>
      )}
      <FlatList
        style={{ marginTop: 20 }}
        data={routines}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Surface
            style={{ padding: 16, borderRadius: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}
            elevation={1}
          >
            <View style={{ flex: 1 }}>
              <Text variant="titleMedium" style={{ color: theme.colors.onSurface }}>
                {item.name}
              </Text>
              <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, marginTop: 4 }}>
                {formatRoutineDuration(item.duration)}
              </Text>
            </View>
            <IconButton
              icon="chevron-right"
              size={32}
              iconColor={theme.colors.onSurface}
              onPress={() => {}}
            />
          </Surface>
        )}
        ListFooterComponent={isFetchingNextPage ? (
          <ActivityIndicator animating size="large" style={{ marginVertical: 16 }} />
        ) : null}
        onEndReached={() => {
          if (hasNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.3}
      />
    </View>
  );
};

export default RoutinesScreen;
