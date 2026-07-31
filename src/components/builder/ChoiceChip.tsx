import { Pressable, Text } from 'react-native';
import { ScaledSheet, moderateScale, scale } from 'react-native-size-matters';

import { colors } from '../../theme';

type ChoiceChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
};

export function ChoiceChip({
  label,
  selected = false,
  onPress,
}: ChoiceChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.chip, selected && styles.chipSelected]}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = ScaledSheet.create({
  chip: {
    flex: 1,
    minHeight: moderateScale(48),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: colors.borderMuted,
  },
  chipSelected: {
    borderColor: colors.primaryAccent,
    backgroundColor: colors.surfaceSelected,
  },
  label: {
    fontSize: scale(14),
    fontWeight: '400',
    color: colors.textPrimary,
  },
  labelSelected: {
    fontWeight: '500',
    color: colors.primaryAccent,
  },
});
