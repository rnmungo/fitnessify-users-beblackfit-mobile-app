import { View } from 'react-native';
import {
  Button,
  Dialog,
  Portal,
  Text,
  useTheme,
} from 'react-native-paper';

const BulletItem = ({ children }: { children: string }) => {
  const theme = useTheme();

  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
      <Text style={{ marginRight: 8, color: theme.colors.onSurfaceVariant }}>{'\u2022'}</Text>
      <Text style={{ flex: 1, color: theme.colors.onSurfaceVariant }}>{children}</Text>
    </View>
  );
};

interface CustomerServiceDialogProps {
  visible: boolean;
  onClose: () => void;
};

const CustomerServiceDialog = ({
  visible = false,
  onClose,
}: CustomerServiceDialogProps) => (
  <Portal>
    <Dialog visible={visible} onDismiss={onClose}>
      <Dialog.Title>Atención al cliente</Dialog.Title>
      <Dialog.Content>
        <Text variant="titleMedium" style={{ marginBottom: 8 }}>
          Contactanos para resolver tu solicitud.
        </Text>
        <BulletItem>Teléfono: +54 911 6806-5208</BulletItem>
        <BulletItem>Email: support@beblackfit.com</BulletItem>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onClose}>Cerrar</Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
);

export default CustomerServiceDialog;
