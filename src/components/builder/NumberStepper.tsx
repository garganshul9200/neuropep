import { Pressable, Text, View } from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';

import { colors } from '../../theme';

type NumberStepperProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

export function NumberStepper({
  label,
  value,
  onChange,
  min = 1,
  max = 300,
  step = 1,
}: NumberStepperProps) {
  const decrement = () => onChange(Math.max(min, value - step));
  const increment = () => onChange(Math.min(max, value + step));

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.stepper}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Decrease ${label}`}
          hitSlop={8}
          onPress={decrement}
          style={styles.control}
        >
          <Text style={styles.controlText}>−</Text>
        </Pressable>
        <Text style={styles.value}>{value}</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Increase ${label}`}
          hitSlop={8}
          onPress={increment}
          style={styles.control}
        >
          <Text style={styles.controlText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: moderateScale(64),
    paddingHorizontal: moderateScale(18),
    backgroundColor: colors.surface,
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: colors.borderMuted,
  },
  label: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: colors.textPrimary,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10),
    width: moderateScale(112),
    height: moderateScale(48),
    justifyContent: 'center',
  },
  control: {
    width: moderateScale(24),
    height: moderateScale(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlText: {
    fontSize: moderateScale(20),
    fontWeight: '500',
    color: colors.textPrimary,
    lineHeight: moderateScale(24),
  },
  value: {
    minWidth: moderateScale(28),
    textAlign: 'center',
    fontSize: moderateScale(15),
    fontWeight: '600',
    color: colors.textPrimary,
  },
});
