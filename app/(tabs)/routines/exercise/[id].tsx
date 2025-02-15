import { View } from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import useQueryExercise from '@/core/routine/hooks/useQueryExercise';
import { ReactQueryStatus } from '@/constants/ReactQuery';

const ExerciseDetailScreen = () => {
  const theme = useTheme();
  const searchParams = useLocalSearchParams();

  const id = searchParams.id as string;

  const { data: exercise, status } = useQueryExercise({
    exerciseId: id,
  });

  const player = useVideoPlayer(exercise?.videoUrl || '', player => {
    player.loop = false;
    player.muted = false;
  });

  if (status === ReactQueryStatus.Pending) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator animating size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (status === ReactQueryStatus.Error || !exercise) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text variant="titleMedium" style={{ color: theme.colors.error, textAlign: 'center' }}>
          No se pudo cargar el video
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
      }}
    >
      <View style={{ marginBottom: 20 }}>
        <Text
          variant="headlineMedium"
          style={{
            textAlign: 'center',
            color: theme.colors.onSurface,
          }}
        >
          {exercise.name}
        </Text>
        {exercise.description && (
          <Text
            variant="bodyMedium"
            style={{
              textAlign: 'center',
              color: theme.colors.onSurfaceVariant,
              marginTop: 12,
            }}
          >
            {exercise.description}
          </Text>
        )}
      </View>
      <VideoView
        style={{ width: '100%', aspectRatio: '16 / 9' }}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        contentFit="cover"
        startsPictureInPictureAutomatically={false}
      />
    </View>
  );
};

export default ExerciseDetailScreen;
