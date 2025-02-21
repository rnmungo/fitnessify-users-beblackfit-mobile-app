import { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, useWindowDimensions } from 'react-native';
import {
  ActivityIndicator,
  Portal,
  RadioButton,
  Text,
  useTheme,
} from 'react-native-paper';
import { useAuthStore, useOnboardingStore } from '@/core/account/store';
import { useMutationUpdateProfile } from '@/core/account/hooks';
import { GENDER, PHYSICAL_STATE } from '@/core/profile/constants';
import { ProfileUpdated } from '@/core/account/interfaces/session';
import { useSnackbar } from '@/core/shared/context/snackbar';
import StepperFooter from '@/core/shared/components/stepper-footer';
import { ReactQueryStatus } from '@/constants/ReactQuery';

const equipmentOptions = [
  { label: 'Peso corporal', value: 'BodyWeight' },
  { label: 'Mancuernas y pesas rusas', value: 'DumbbellsAndKettlebells' },
  { label: 'Bandas', value: 'Bands' },
  { label: 'Todas las anteriores', value: 'All' },
];

const OnboardingStepSixScreen = () => {
  const theme = useTheme();
  const router = useRouter();
  const { height } = useWindowDimensions();
  const snackbar = useSnackbar();
  const { clearOnboardingData, data } = useOnboardingStore();
  const { reloadProfile } = useAuthStore();

  const [selectedEquipment, setSelectedEquipment] = useState<string>(data.preferredEquipment || '');
  const updateProfile = useMutationUpdateProfile();

  const handleNext = () => {
    updateProfile.mutate({
      name: data?.name || '',
      lastName: data?.lastName || '',
      gender: data?.gender || GENDER.Unspecified,
      weight: data?.weight ? Number(data?.weight) : 0,
      height: data?.height ? Number(data?.height) : 0,
      goals: data?.goals || [],
      preferredEquipment: selectedEquipment,
      physicalState: data?.physicalState || PHYSICAL_STATE.Unspecified,
      completeOnBoarding: true,
    }, {
      onSuccess: (updatedProfile: ProfileUpdated) => {
        updateProfile.reset();
        clearOnboardingData();
        reloadProfile(updatedProfile);
        router.replace('/onboarding/congrats-onboarding');
      },
      onError: () => {
        updateProfile.reset();
        snackbar.error('Error al actualizar el perfil.');
      },
    });
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 40,
          paddingTop: height * 0.1,
        }}
      >
        <Text variant="headlineMedium" style={{ color: theme.colors.onSurface }}>
          ¿Cómo te gustaría entrenar?
        </Text>
        <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, marginTop: 16 }}>
          Esto nos permitirá seleccionar un entrenamiento acorde a tus preferencias.
        </Text>
        <RadioButton.Group
          value={selectedEquipment}
          onValueChange={(newValue) => setSelectedEquipment(newValue)}
        >
          <View style={{ marginTop: 40 }}>
            {equipmentOptions.map((option) => (
              <RadioButton.Item
                key={option.value}
                label={option.label}
                value={option.value}
                position="leading"
                mode="android"
                style={{ paddingHorizontal: 0 }}
                labelStyle={{ textAlign: 'left', paddingLeft: 10 }}
                color={theme.colors.primary}
                uncheckedColor={theme.colors.primary}
              />
            ))}
          </View>
        </RadioButton.Group>
        <StepperFooter
          currentStep={6}
          totalSteps={6}
          onPrevious={() => router.back()}
          onNext={handleNext}
          isNextDisabled={!selectedEquipment}
        />
      </View>
      <Portal>
        {updateProfile.status === ReactQueryStatus.Pending && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: theme.colors.backdrop,
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
            }}
          >
            <ActivityIndicator
              animating
              size="large"
              color={theme.colors.onSurfaceVariant}
            />
          </View>
        )}
      </Portal>
    </>
  );
};

export default OnboardingStepSixScreen;
