import { Colors } from '@/constants/Colors';
import { useWindowDimensions, View } from 'react-native';
import { Avatar, Button, Text, useTheme } from 'react-native-paper';

type FeedbackButton = {
  mode: 'contained' | 'outlined' | 'text';
  text: string;
  onPress: () => void;
};

interface FeedbackProps {
  type: 'success' | 'error';
  title: string;
  subtitle: string;
  buttons: Array<FeedbackButton>;
}

const Feedback = ({ buttons, subtitle, title, type }: FeedbackProps) => {
  const theme = useTheme();
  const { height } = useWindowDimensions();

  const isSuccess = type === 'success';

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingBottom: 32,
        paddingTop: height * 0.15,
      }}
    >
      <Avatar.Icon
        size={60}
        icon={isSuccess ? 'check' : 'exclamation'}
        color={theme.colors.background}
        style={{
          backgroundColor: isSuccess ? theme.colors.primary : theme.colors.error,
        }}
      />
      <Text
        variant="headlineMedium"
        style={{
          textAlign: 'center',
          marginTop: 20,
          color: isSuccess ? theme.colors.primary : theme.colors.error,
        }}
      >
        {title}
      </Text>
      <Text
        variant="bodyMedium"
        style={{
          textAlign: 'center',
          marginTop: 8,
          color: theme.colors.onSurfaceVariant,
        }}
      >
        {subtitle}
      </Text>
      <View
        style={{
          marginTop: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          width: '100%',
        }}
      >
        {buttons && buttons.map((button => (
          <Button
            key={button.text}
            mode={button.mode}
            onPress={button.onPress}
            style={{ width: '100%' }}
          >
            {button.text}
          </Button>
        )))}
      </View>
    </View>
  );
};

export default Feedback;
