import { Pressable, Text, View } from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';

import { colors } from '../../theme';

import { ChoiceChip } from './ChoiceChip';

type ChoiceOption<T extends string> = {
  id: T;
  label: string;
};

type ChoiceFieldProps<T extends string> = {
  label: string;
  options: readonly ChoiceOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
  actionLabel?: string;
  onActionPress?: () => void;
};

export function ChoiceField<T extends string>({
  label,
  options,
  value,
  onChange,
  actionLabel,
  onActionPress,
}: ChoiceFieldProps<T>) {
  return (
    <View style={styles.field}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        {actionLabel ? (
          <Pressable accessibilityRole="button" onPress={onActionPress}>
            <Text style={styles.action}>{actionLabel}</Text>
          </Pressable>
        ) : null}
      </View>

      <View style={styles.options}>
        {options.map(option => (
          <ChoiceChip
            key={option.id}
            label={option.label}
            selected={value === option.id}
            onPress={() => onChange(option.id)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  field: {
    gap: moderateScale(14),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: colors.textPrimary,
    letterSpacing: -0.272,
  },
  action: {
    fontSize: moderateScale(15),
    fontWeight: '500',
    color: colors.primaryAccent,
    textDecorationLine: 'underline',
    letterSpacing: -0.255,
  },
  options: {
    flexDirection: 'row',
    gap: moderateScale(12),
  },
});
