import { createContext, useCallback, useContext, useState, ReactNode, Ref } from 'react';
import Snackbar, { type SnackbarVariant } from '../../components/snackbar';

interface SnackbarState {
  open: boolean;
  message: string;
  variant: SnackbarVariant;
}

interface SnackbarContextProps {
  notify: (message: string, variant?: SnackbarVariant) => void;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(undefined);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }

  const { notify } = context;

  const success = (message: string) => notify(message, 'success');
  const error = (message: string) => notify(message, 'error');
  const info = (message: string) => notify(message, 'default');

  return { success, error, info };
};

interface SnackbarProviderProps {
  children: ReactNode;
}

const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    variant: 'default',
  });

  const notify = useCallback(
    (message: string, variant: SnackbarVariant = 'default') => {
      setSnackbar({
        open: true,
        message,
        variant,
      });
    },
    [],
  );

  const handleClose = () => setSnackbar((prev) => ({ ...prev, open: false }));

  return (
    <>
      <SnackbarContext.Provider value={{ notify }}>{children}</SnackbarContext.Provider>
      <Snackbar
        visible={snackbar.open}
        variant={snackbar.variant}
        onDismiss={handleClose}
        action={{
          label: 'Cerrar',
          onPress: handleClose,
        }}
      >
        {snackbar.message}
      </Snackbar>
    </>
  );
};

export default SnackbarProvider;
