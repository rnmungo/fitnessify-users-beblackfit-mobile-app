import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'expo-router';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Requerido'),
  lastName: Yup.string().required('Requerido'),
  // Agrega más validaciones según lo necesites
});

const EditProfileScreen = () => {
  const theme = useTheme();
  const router = useRouter();

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: { name: '', lastName: '' },
    validationSchema,
    onSubmit: (vals) => {
      console.log('Editar perfil:', vals);
      // Lógica para actualizar el perfil
      router.back(); // Vuelve a la pantalla anterior
    },
  });

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <TextInput
        label="Nombre"
        mode="outlined"
        value={values.name}
        onChangeText={handleChange('name')}
        error={touched.name && !!errors.name}
      />
      {touched.name && errors.name && <Text style={{ color: theme.colors.error }}>{errors.name}</Text>}
      <TextInput
        label="Apellido"
        mode="outlined"
        value={values.lastName}
        onChangeText={handleChange('lastName')}
        error={touched.lastName && !!errors.lastName}
        style={{ marginTop: 16 }}
      />
      {touched.lastName && errors.lastName && <Text style={{ color: theme.colors.error }}>{errors.lastName}</Text>}
      <Button mode="contained" onPress={() => handleSubmit()} style={{ marginTop: 24 }}>
        Guardar
      </Button>
    </ScrollView>
  );
};

export default EditProfileScreen;
