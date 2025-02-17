import { View, ScrollView } from 'react-native';
import { Modal, Portal, Text, Button, useTheme } from 'react-native-paper';

interface TermsPrivacyModalProps {
  visible: boolean;
  onDismiss: () => void;
  type: 'terms' | 'privacy';
}

const TERMS_OF_USE_TEXT = `
### Condiciones de uso
Al registrarte en BeBlackFit, aceptas cumplir con nuestras reglas y regulaciones. No debes compartir tu cuenta con terceros ni usar la aplicación para fines distintos a los previstos.

1. **Acceso y Uso**
   Solo puedes usar la app para tus entrenamientos personales. No está permitido el uso comercial sin autorización.

2. **Responsabilidad del Usuario**
   El usuario es responsable de la información proporcionada y debe asegurarse de que es correcta.

3. **Modificaciones y Terminación**
   BeBlackFit se reserva el derecho de modificar las condiciones o cerrar cuentas que infrinjan las normas.
`;

const PRIVACY_POLICY_TEXT = `
### Aviso de privacidad
Nos tomamos muy en serio la privacidad de nuestros usuarios. La información que recopilamos se usa únicamente para mejorar la experiencia del usuario.

1. **Datos Recopilados**
   Recopilamos datos personales como nombre, correo electrónico y preferencias de entrenamiento.

2. **Uso de la Información**
   Usamos estos datos para personalizar recomendaciones y mejorar nuestros servicios.

3. **Protección de Datos**
   BeBlackFit protege tu información con medidas de seguridad avanzadas y no la comparte con terceros sin consentimiento.
`;

const TermsPrivacyModal: React.FC<TermsPrivacyModalProps> = ({ visible, onDismiss, type }) => {
  const theme = useTheme();

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: theme.colors.background, padding: 20 }}>
          <ScrollView>
            <Text variant="headlineMedium" style={{ textAlign: 'center', marginBottom: 20 }}>
              {type === 'terms' ? 'Condiciones de Uso' : 'Aviso de Privacidad'}
            </Text>
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
              {type === 'terms' ? TERMS_OF_USE_TEXT : PRIVACY_POLICY_TEXT}
            </Text>
          </ScrollView>
          <Button mode="text" onPress={onDismiss} style={{ marginTop: 20 }}>
            CERRAR
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default TermsPrivacyModal;
