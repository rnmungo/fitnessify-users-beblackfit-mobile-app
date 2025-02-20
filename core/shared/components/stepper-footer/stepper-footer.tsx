import { View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

interface StepperFooterProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious?: () => void;
  isNextDisabled?: boolean;
}

const StepperFooter = ({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  isNextDisabled = false,
}: StepperFooterProps) => {
  const theme = useTheme();

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: theme.colors.elevation.level4,
      }}
    >
      <View style={{ width: '25%' }}>
        {onPrevious && (
          <Button mode="text" onPress={onPrevious}>
            Atrás
          </Button>
        )}
      </View>
      <View style={{ flexDirection: 'row', gap: 8, width: 'auto' }}>
        {[...Array(totalSteps)].map((_, index) => (
          <View
            key={index + 1}
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor:
                index + 1 === currentStep ? theme.colors.primary : theme.colors.onSurfaceDisabled,
            }}
          />
        ))}
      </View>
      <View style={{ width: '25%' }}>
        <Button mode="text" onPress={onNext} disabled={isNextDisabled}>
          {currentStep === totalSteps ? 'Finalizar' : 'Siguiente'}
        </Button>
      </View>
    </View>
  );
};

export default StepperFooter;
