import { Colors } from '@/constants/Colors';
import { useCallback, useMemo, useState, forwardRef } from 'react';
import { View } from 'react-native';
import {
  HelperText,
  Text,
  TextInput,
  type TextInputProps,
} from 'react-native-paper';

export type PasswordInputVariant = 'default' | 'error' | 'warning' | 'success';

export interface PasswordInputProps extends TextInputProps {
  helperText?: string;
  variant?: PasswordInputVariant;
}

const PasswordTextInput = forwardRef<any, PasswordInputProps>(
  ({ helperText, variant = 'default', ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = useCallback(() => {
      setIsPasswordVisible((prev) => !prev);
    }, []);

    const variantColor = useMemo(() => {
        const colors = Object.freeze({
          default: undefined,
          error: Colors.dark.error,
          success: Colors.dark.success,
          warning: Colors.dark.warning,
        });

        const props = colors[variant];

        return props;
      }, [variant]);

    return (
      <View>
        <TextInput
          {...props}
          ref={ref}
          secureTextEntry={!isPasswordVisible}
          right={
            <TextInput.Icon
              color={variantColor}
              icon={isPasswordVisible ? 'eye' : 'eye-off'}
              onPress={togglePasswordVisibility}
            />
          }
          outlineColor={variantColor}
          activeOutlineColor={variantColor}
          contentStyle={{ ...(variantColor ? { color: variantColor } : {}) }}
          underlineColor={variantColor}
          activeUnderlineColor={variantColor}
        />
        {helperText && (
          <HelperText type="info" visible>
            <Text style={{ ...(variantColor ? { color: variantColor, placeholder: variantColor } : {}) }}>
              {helperText}
            </Text>
          </HelperText>
        )}
      </View>
    );
  }
);

export default PasswordTextInput;
