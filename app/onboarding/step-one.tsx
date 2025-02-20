import { useRef } from 'react';
import { useRouter } from 'expo-router';
import { TextInput as NativeTextInput, View, useWindowDimensions } from 'react-native';
import { HelperText, Text, TextInput, useTheme } from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useOnboardingStore } from '@/core/account/store';
import StepperFooter from '@/core/shared/components/stepper-footer';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Debe tener al menos 2 caracteres')
    .required('El nombre es obligatorio'),
  lastName: Yup.string()
    .min(2, 'Debe tener al menos 2 caracteres')
    .required('El apellido es obligatorio'),
});

const OnboardingStepOneScreen = () => {
  const theme = useTheme();
  const router = useRouter();
  const { height } = useWindowDimensions();
  const { setOnboardingData, data } = useOnboardingStore();
  const nameInputRef = useRef<NativeTextInput>(null);
  const lastNameInputRef = useRef<NativeTextInput>(null);

  const formik = useFormik({
    initialValues: {
      name: data.name || '',
      lastName: data.lastName || '',
    },
    validationSchema,
    onSubmit: (values) => {
      setOnboardingData(values);
      router.push('/onboarding/step-two');
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
        ¡Hola!
      </Text>
      <Text
        variant="bodyMedium"
        style={{ color: theme.colors.onSurfaceVariant, marginTop: 10 }}
      >
        Vamos a conocernos un poco más... ¿Cómo te llamas?
      </Text>
      <TextInput
        ref={nameInputRef}
        label="Nombre"
        mode="outlined"
        returnKeyType="next"
        value={formik.values.name}
        onChangeText={formik.handleChange('name')}
        onBlur={formik.handleBlur('name')}
        error={formik.touched.name && !!formik.errors.name}
        style={{ marginTop: 40 }}
        onSubmitEditing={() => {
          lastNameInputRef.current?.focus();
        }}
      />
      {formik.touched.name && formik.errors.name && (
        <HelperText type="error">{formik.errors.name}</HelperText>
      )}
      <TextInput
        ref={lastNameInputRef}
        label="Apellido"
        mode="outlined"
        value={formik.values.lastName}
        onChangeText={formik.handleChange('lastName')}
        onBlur={formik.handleBlur('lastName')}
        error={formik.touched.lastName && !!formik.errors.lastName}
        style={{ marginTop: 30 }}
      />
      {formik.touched.lastName && formik.errors.lastName && (
        <HelperText type="error">{formik.errors.lastName}</HelperText>
      )}
      <StepperFooter
        currentStep={1}
        totalSteps={6}
        onNext={formik.handleSubmit}
        // isNextDisabled={!formik.isValid || !formik.dirty}
        isNextDisabled={!formik.isValid}
      />
    </View>
  );
};

export default OnboardingStepOneScreen;
