
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { Appbar, Avatar, useTheme } from 'react-native-paper';
import CustomerServiceDialog from '@/core/shared/components/customer-service-dialog';

interface AppBarProps {
  avatarText?: string;
  onBack?: () => void;
  title?: string;
};

const AppBar = ({ avatarText, onBack, title }: AppBarProps) => {
  const [openState, setOpenState] = useState<boolean>(false);
  const theme = useTheme();

  const handleOpenCustomerService = useCallback(() => {
    setOpenState(true);
  }, []);

  const handleCloseCustomerService = useCallback(() => {
    setOpenState(false);
  }, []);

  return (
    <View>
      <Appbar.Header style={{ backgroundColor: theme.colors.background }}>
        {onBack && <Appbar.BackAction onPress={onBack} />}
        {avatarText && (
          <Avatar.Text
            size={40}
            label={avatarText}
            style={{ marginHorizontal: 16, backgroundColor: theme.colors.inversePrimary }}
          />
        )}
        {title && (
          <Appbar.Content
            title={title}
            titleStyle={{
              fontSize: 16,
              lineHeight: 24,
            }}
          />
        )}
        <Appbar.Action icon="face-agent" onPress={handleOpenCustomerService} />
      </Appbar.Header>
      <CustomerServiceDialog visible={openState} onClose={handleCloseCustomerService} />
    </View>
  );
};

export default AppBar;
