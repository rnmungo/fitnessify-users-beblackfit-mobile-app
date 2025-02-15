import { View, FlatList } from 'react-native';
import {
  ActivityIndicator,
  Button,
  IconButton,
  List,
  Text,
  Surface,
  useTheme,
} from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { formatRoutineDuration } from '@/core/routine/utilities/routineUtils';
import useQueryRoutine from '@/core/routine/hooks/useQueryRoutine';
import { ReactQueryStatus } from '@/constants/ReactQuery';

const RoutineDetailScreen = () => {
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useLocalSearchParams();
  const id = searchParams.id as string;

  const { data: routine, refetch, status } = useQueryRoutine({ routineId: id });

  if (status === ReactQueryStatus.Pending) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <ActivityIndicator animating size="large" color={theme.colors.onSurfaceVariant} />
        <Text variant="titleMedium" style={{ color: theme.colors.onSurfaceVariant }}>
          Cargando la rutina
        </Text>
      </View>
    );
  }

  if (status === ReactQueryStatus.Error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >
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
              No pudimos recuperar la rutina. Intenta nuevamente.
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
      </View>
    );
  }

  if (status === ReactQueryStatus.Success && routine) {
    const routineDuration = formatRoutineDuration(routine.duration);

    return (
      <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 20 }}>
        <View style={{ marginBottom: 20 }}>
          {routineDuration && (
            <Text
              variant="bodyMedium"
              style={{ textAlign: 'center', color: theme.colors.onSurfaceVariant }}
            >
              {routineDuration}
            </Text>
          )}
          <Text
            variant="headlineMedium"
            style={{ textAlign: 'center', color: theme.colors.onSurface }}
          >
            {routine.name}
          </Text>
          {routine.description && (
            <Text
              variant="bodyLarge"
              style={{ textAlign: 'center', color: theme.colors.onSurfaceVariant }}
            >
              {routine.description}
            </Text>
          )}
        </View>
        <FlatList
          data={routine.routineSections}
          keyExtractor={(section) => section.id}
          renderItem={({ item: section }) => {
            const sectionDuration = formatRoutineDuration(section.duration);

            return (
              <Surface
                style={{
                  paddingHorizontal: 12,
                  borderRadius: 6,
                  marginBottom: 12,
                  backgroundColor: theme.colors.elevation.level2,
                }}
                elevation={1}
              >
                <List.Section>
                  <List.Subheader style={{ color: theme.colors.onSurface, fontWeight: 'bold' }}>
                    {section.name}
                    {section.laps > 1 && ` - ${section.laps} rondas`}
                    {sectionDuration && ` - ${sectionDuration}`}
                  </List.Subheader>

                  {section.routineExercises.map((exerciseItem) => {
                    const exerciseDuration = formatRoutineDuration(exerciseItem.duration);
                    const exerciseRepetitions = exerciseItem.repetitions > 1 ? `${exerciseItem.repetitions} repeticiones` : null;
                    const description = [exerciseRepetitions, exerciseDuration].filter(Boolean).join(' - ');

                    return (
                      <List.Item
                        key={exerciseItem.id}
                        title={exerciseItem.exercise.name}
                        description={description}
                        right={() => <IconButton icon="chevron-right" size={24} />}
                        onPress={() => router.push(`/routines/exercise/${exerciseItem.exercise.id}`)}
                        style={{ backgroundColor: theme.colors.elevation.level4, borderRadius: 8, marginVertical: 4 }}
                      />
                    );
                  })}
                </List.Section>
              </Surface>
            );
          }}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}
    >
      <Text
        variant="titleMedium"
        style={{
          color: theme.colors.onSurface,
          textAlign: 'center',
        }}
      >
        No encontramos esta rutina
      </Text>
      <Text
        variant="bodyMedium"
        style={{
          color: theme.colors.onSurfaceVariant,
          textAlign: 'center',
          marginTop: 8,
        }}
      >
        Puede que esta rutina haya sido eliminada o no esté disponible.
      </Text>
      <Button
        mode="text"
        style={{ marginTop: 16 }}
        onPress={() => router.replace('/routines')}
      >
        Ir al listado de rutinas
      </Button>
    </View>
  );
};

export default RoutineDetailScreen;
