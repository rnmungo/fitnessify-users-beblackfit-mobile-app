import { useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import {
  Portal as PaperPortal,
  Snackbar as PaperSnackbar,
  Text as PaperText,
  type SnackbarProps as PaperSnackbarProps,
  useTheme,
} from 'react-native-paper';

export type SnackbarVariant = 'default' | 'error' | 'success';

export interface SnackbarState {
  open: boolean;
  message: string;
  variant: SnackbarVariant;
};

interface SnackbarProps extends Omit<PaperSnackbarProps, 'style'> {
  variant?: SnackbarVariant;
  style?: StyleProp<ViewStyle>;
}

const Snackbar = ({
  children,
  style,
  variant = 'default',
  ...rest
}: SnackbarProps) => {
  const theme = useTheme();

  const { action } = rest;

  const actionColorProps = useMemo(() => {
    const actionColors = Object.freeze({
      default: undefined,
      error: {
        textColor: theme.colors.onError,
        buttonColor: theme.colors.error,
        rippleColor: theme.colors.errorContainer,
      },
      success: {
        textColor: theme.colors.onTertiary,
        buttonColor: theme.colors.tertiary,
        rippleColor: theme.colors.tertiaryContainer,
      },
    });

    const props = actionColors[variant];

    return props;
  }, [variant, theme]);

  const snackbarBackgroundColor = useMemo(() => {
    const snackbarColors = Object.freeze({
      default: undefined,
      error: theme.colors.error,
      success: theme.colors.tertiary,
    });

    const color = snackbarColors[variant];

    return color;
  }, [variant, theme]);

  const actionProps = action ? { ...action, ...actionColorProps } : undefined;

  return (
    <PaperPortal>
      <PaperSnackbar
        style={[{ backgroundColor: snackbarBackgroundColor }, style]}
        {...rest}
        action={actionProps}
      >
        <PaperText style={{ ...(actionProps ? { color: actionProps.textColor } : {})}}>
          {children}
        </PaperText>
      </PaperSnackbar>
    </PaperPortal>
  );
};

export default Snackbar;
