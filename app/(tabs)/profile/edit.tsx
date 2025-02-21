import { ScrollView, View } from 'react-native';
import {
  Button,
  Checkbox,
  HelperText,
  RadioButton,
  TextInput,
  Text,
  useTheme,
} from 'react-native-paper';
import { Dropdown } from 'react-native-paper-dropdown';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from '@/core/shared/context/snackbar';
import { useAuthStore } from '@/core/account/store';
import { useMutationUpdateProfile } from '@/core/account/hooks';
import type { ProfileUpdated } from '@/core/account/interfaces/session';

const goalsOptions = [
  { label: 'Perder peso', value: 'LoseWeight' },
  { label: 'Ganar músculo', value: 'GainMuscle' },
  { label: 'Mejorar la alimentación', value: 'ImproveDiet' },
  { label: 'Mejorar la resistencia', value: 'ImproveEndurance' },
  { label: 'Reducir el estrés', value: 'ReduceStress' },
  { label: 'Mejorar la fuerza mental', value: 'ImproveMentalStrength' },
];

const equipmentOptions = [
  { label: 'Peso corporal', value: 'BodyWeight' },
  { label: 'Mancuernas y pesas rusas', value: 'DumbbellsAndKettlebells' },
  { label: 'Bandas', value: 'Bands' },
  { label: 'Todas las anteriores', value: 'All' },
];

const physicalStateOptions = [
  { label: 'No especificado', value: 'Unspecified' },
  { label: 'Sedentario', value: 'Sedentary' },
  { label: 'Ligeramente activo', value: 'LightlyActive' },
  { label: 'Moderadamente activo', value: 'ModeratelyActive' },
  { label: 'Muy activo', value: 'VeryActive' },
];

const genderOptions = [
  { label: 'Prefiero no decirlo', value: 'Unspecified' },
  { label: 'Masculino', value: 'Male' },
  { label: 'Femenino', value: 'Female' },
];

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Debe tener al menos 2 caracteres')
    .required('El nombre es requerido'),
  lastName: Yup.string()
    .min(2, 'Debe tener al menos 2 caracteres')
    .required('El apellido es requerido'),
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
  goals: Yup.array().of(Yup.string()).min(1, 'Debe seleccionar al menos un objetivo'),
  preferredEquipment: Yup.string()
    .oneOf(equipmentOptions.map(o => o.value))
    .required('Debe indicar la preferencia de equipamiento'),
  physicalState: Yup.string()
    .oneOf(physicalStateOptions.map(o => o.value))
    .required('Debe indicar el nivel de actividad física'),
  gender: Yup.string().oneOf(genderOptions.map(o => o.value)).required('Debe seleccionar un género válido'),
});

const EditProfileScreen = () => {
  const theme = useTheme();
  const snackbar = useSnackbar();
  const { reloadProfile, session } = useAuthStore();

  const updateProfile = useMutationUpdateProfile();

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    setFieldValue,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      name: session?.profile?.name || '',
      lastName: session?.profile?.lastName || '',
      weight: session?.profile?.weight ? String(session.profile.weight) : '',
      height: session?.profile?.height ? String(session.profile.height) : '',
      goals: session?.profile?.goals || [],
      preferredEquipment: session?.profile?.preferredEquipment || 'All',
      physicalState: session?.profile?.physicalState || 'Unspecified',
      gender: session?.profile?.gender || 'Unspecified',
    },
    validationSchema,
    onSubmit: (values) => {
      updateProfile.mutate({
        ...values,
        weight: Number(values.weight),
        height: Number(values.height),
        completeOnBoarding: false,
      }, {
        onSuccess: (data: ProfileUpdated) => {
          updateProfile.reset();
          snackbar.success('Perfil actualizado con éxito.');
          reloadProfile(data);
        },
        onError: () => {
          updateProfile.reset();
          snackbar.error('Error al actualizar el perfil.');
        },
      });
    },
  });

  const toggleGoals = (value: string) => {
    if (values.goals.includes(value)) {
      setFieldValue(
        'goals',
        values.goals.filter(obj => obj !== value)
      );
    } else {
      setFieldValue('goals', [...values.goals, value]);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 24,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 8,
          width: '100%',
          marginBottom: 8,
        }}
      >
        <View style={{ flex: 1 }}>
          <TextInput
            label="Nombre"
            mode="outlined"
            value={values.name}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            error={touched.name && !!errors.name}
          />
          {(touched.name && !!errors.name) && (
            <HelperText
              type="error"
              visible={touched.name && !!errors.name}
            >
              {errors.name}
            </HelperText>
          )}
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            label="Apellido"
            mode="outlined"
            value={values.lastName}
            onChangeText={handleChange('lastName')}
            onBlur={handleBlur('lastName')}
            error={touched.lastName && !!errors.lastName}
          />
          {(touched.lastName && !!errors.lastName) && (
            <HelperText
              type="error"
              visible={touched.lastName && !!errors.lastName}
            >
              {errors.lastName}
            </HelperText>
          )}
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 8,
          width: '100%',
          marginBottom: 8,
        }}
      >
        <View style={{ flex: 0.5 }}>
          <TextInput
            label="Peso (kg)"
            mode="outlined"
            value={values.weight}
            onChangeText={handleChange('weight')}
            onBlur={handleBlur('weight')}
            keyboardType="numeric"
            error={touched.weight && !!errors.weight}
          />
          {(touched.weight && !!errors.weight) && (
            <HelperText
              type="error"
              visible={touched.weight && !!errors.weight}
            >
              {errors.weight}
            </HelperText>
          )}
        </View>
        <View style={{ flex: 0.5 }}>
          <TextInput
            label="Altura (cm)"
            mode="outlined"
            value={values.height}
            onChangeText={handleChange('height')}
            onBlur={handleBlur('height')}
            keyboardType="numeric"
            error={touched.height && !!errors.height}
          />
          {(touched.height && !!errors.height) && (
            <HelperText
              type="error"
              visible={touched.height && !!errors.height}
            >
              {errors.height}
            </HelperText>
          )}
        </View>
        <View style={{ flex: 1 }}>
          <Dropdown
            label="Sexo"
            mode="outlined"
            value={values.gender}
            options={genderOptions}
            onSelect={(value) => setFieldValue('gender', value)}
          />
          {(touched.gender && !!errors.gender) && (
            <HelperText
              type="error"
              visible={touched.gender && !!errors.gender}
            >
              {errors.gender}
            </HelperText>
          )}
        </View>
      </View>
      <Text
        variant="titleSmall"
        style={{
          backgroundColor: theme.colors.surfaceVariant,
          paddingHorizontal: 10,
          paddingVertical: 10,
          marginTop: 8,
        }}
      >
        Objetivos
      </Text>
      {goalsOptions.map((option) => (
        <Checkbox.Item
          key={option.value}
          label={option.label}
          style={{ backgroundColor: theme.colors.background }}
          status={values.goals.includes(option.value) ? 'checked' : 'unchecked'}
          onPress={() => toggleGoals(option.value)}
        />
      ))}
      {(touched.goals && !!errors.goals) && (
        <HelperText
          type="error"
          visible={touched.goals && !!errors.goals}
        >
          {errors.goals}
        </HelperText>
      )}
      <Text
        variant="titleSmall"
        style={{
          backgroundColor: theme.colors.surfaceVariant,
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
      >
        Preferencia de Equipamiento
      </Text>
      <RadioButton.Group
        onValueChange={(value) => setFieldValue('preferredEquipment', value)}
        value={values.preferredEquipment}
      >
        {equipmentOptions.map((option) => (
          <RadioButton.Item key={option.value} label={option.label} value={option.value} />
        ))}
      </RadioButton.Group>
      {(touched.preferredEquipment && !!errors.preferredEquipment) && (
        <HelperText
          type="error"
          visible={touched.preferredEquipment && !!errors.preferredEquipment}
        >
          {errors.preferredEquipment}
        </HelperText>
      )}
      <Text
        variant="titleSmall"
        style={{
          backgroundColor: theme.colors.surfaceVariant,
          paddingHorizontal: 10,
          paddingVertical: 10
        }}
      >
        Actividad Física
      </Text>
      <RadioButton.Group
        onValueChange={(value) => setFieldValue('physicalState', value)}
        value={values.physicalState}
      >
        {physicalStateOptions.map((option) => (
          <RadioButton.Item key={option.value} label={option.label} value={option.value} />
        ))}
      </RadioButton.Group>
      {(touched.physicalState && !!errors.physicalState) && (
        <HelperText
          type="error"
          visible={touched.physicalState && !!errors.physicalState}
        >
          {errors.physicalState}
        </HelperText>
      )}
      <Button
        mode="contained"
        onPress={() => handleSubmit()}
        style={{ marginTop: 24 }}
        loading={updateProfile.status === 'pending'}
      >
        Guardar Cambios
      </Button>
    </ScrollView>
  );
};

export default EditProfileScreen;
