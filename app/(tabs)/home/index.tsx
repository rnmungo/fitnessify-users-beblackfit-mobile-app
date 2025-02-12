import { ExternalLinks } from '@/constants/ExternalLinks';
import React from 'react';
import { Linking, View, ScrollView } from 'react-native';
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

const HomeScreen = () => {
  const theme = useTheme();

  return (
    <ScrollView contentContainerStyle={{ flex: 1, paddingHorizontal: 26, paddingVertical: 30, flexDirection: 'column', gap: 20 }}>
      <Surface
        style={{ padding: 16, borderRadius: 12, flexDirection: 'row', alignItems: 'center' }}
        elevation={2}
      >
        <Avatar.Text
          size={40}
          label="Nv.2"
          style={{ marginRight: 12 }}
          labelStyle={{ fontSize: 16 }}
        />
        <View style={{ flex: 1 }}>
          <Text variant="titleMedium" style={{ color: 'white' }}>Tu último entrenamiento</Text>
          <Text variant="bodyMedium" style={{ color: 'gray' }}>60 minutos</Text>
        </View>
        <IconButton mode="outlined" icon="play-circle" size={32} onPress={() => {}} />
      </Surface>

      <Card mode="elevated" elevation={5}>
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

      <Surface
        style={{ padding: 16, borderRadius: 12, flexDirection: 'row', alignItems: 'center' }}
        elevation={2}
      >
        <View style={{ flex: 1 }}>
          <Text variant="titleMedium" style={{ color: 'white' }}>Tu suscripción vence hoy</Text>
          <Text variant="bodyMedium" style={{ color: 'gray' }}>Recordá hacer el pago para la renovación</Text>
        </View>
        <IconButton icon="chevron-right" size={32} iconColor="white" onPress={() => {}} />
      </Surface>

    </ScrollView>
  );
};

export default HomeScreen;
