import { useRef } from 'react';
import { useRouter } from 'expo-router';
import { View, TextInput as NativeTextInput, useWindowDimensions } from 'react-native';
import { HelperText, Text, TextInput, useTheme } from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useOnboardingStore } from '@/core/account/store';
import StepperFooter from '@/core/shared/components/stepper-footer';

const validationSchema = Yup.object().shape({
  weight: Yup.number()
    .typeError('Ingrese un valor numérico')
    .required('El peso es requerido')
    .positive('Ingrese un número válido')
    .max(600, 'El número no puede excederse de 600 Kg.'),
  height: Yup.number()
    .typeError('Ingrese un valor numérico')
    .required('La altura es requerida')
    .positive('Ingrese un número válido')
    .max(300, 'El número no puede excederse de 300 Cm.'),
});

const OnboardingStepThreeScreen = () => {
  const theme = useTheme();
  const router = useRouter();
  const { height } = useWindowDimensions();
  const { setOnboardingData, data } = useOnboardingStore();

  const weightInputRef = useRef<NativeTextInput>(null);
  const heightInputRef = useRef<NativeTextInput>(null);

  const formik = useFormik({
    initialValues: {
      weight: data.weight?.toString() || '',
      height: data.height?.toString() || '',
    },
    validationSchema,
    onSubmit: (values) => {
      setOnboardingData({ weight: parseFloat(values.weight), height: parseInt(values.height, 10) });
      router.push('/onboarding/step-four');
    },
  });

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 40,
        paddingTop: height * 0.1,
      }}
    >
      <Text variant="headlineMedium" style={{ color: theme.colors.onSurface }}>
        A nosotros tampoco nos gustan los formularios
      </Text>
      <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, marginTop: 16 }}>
        Ya queda poco, completá los siguientes datos para conocer tu índice de masa corporal (IMC)
      </Text>
      <TextInput
        ref={weightInputRef}
        label="Peso"
        mode="outlined"
        keyboardType="numeric"
        left={<TextInput.Icon icon="weight-kilogram" />}
        right={<TextInput.Affix text="Kg." />}
        returnKeyType="next"
        value={formik.values.weight}
        onChangeText={formik.handleChange('weight')}
        onBlur={formik.handleBlur('weight')}
        error={formik.touched.weight && !!formik.errors.weight}
        style={{ marginTop: 40 }}
        onSubmitEditing={() => heightInputRef.current?.focus()}
      />
      {formik.touched.weight && formik.errors.weight && (
        <HelperText type="error">{formik.errors.weight}</HelperText>
      )}
      <TextInput
        ref={heightInputRef}
        label="Altura"
        mode="outlined"
        keyboardType="numeric"
        left={<TextInput.Icon icon="human-male-height" />}
        right={<TextInput.Affix text="Cm." />}
        returnKeyType="done"
        value={formik.values.height}
        onChangeText={formik.handleChange('height')}
        onBlur={formik.handleBlur('height')}
        error={formik.touched.height && !!formik.errors.height}
        style={{ marginTop: 30 }}
      />
      {formik.touched.height && formik.errors.height && (
        <HelperText type="error">{formik.errors.height}</HelperText>
      )}
      <StepperFooter
        currentStep={3}
        totalSteps={6}
        onPrevious={() => router.back()}
        onNext={formik.handleSubmit}
        isNextDisabled={!formik.isValid}
      />
    </View>
  );
};

export default OnboardingStepThreeScreen;
