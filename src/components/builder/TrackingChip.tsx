import { Pressable, Text, View } from 'react-native';
import { ScaledSheet, moderateScale, ms } from 'react-native-size-matters';
import type { FC } from 'react';
import type { SvgProps } from 'react-native-svg';

import { colors } from '../../theme';

type TrackingChipProps = {
  label: string;
  icon: FC<SvgProps>;
  selected?: boolean;
  onPress?: () => void;
};

export function TrackingChip({
  label,
  icon: Icon,
  selected = false,
  onPress,
}: TrackingChipProps) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      onPress={onPress}
      style={[styles.chip, selected && styles.chipSelected]}
    >
      <Icon width={moderateScale(22)} height={moderateScale(22)} />
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
      <View style={[styles.check, selected && styles.checkSelected]}>
        {selected ? <Text style={styles.checkMark}>✓</Text> : null}
      </View>
    </Pressable>
  );
}

const styles = ScaledSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10),
    height: moderateScale(48),
    paddingLeft: moderateScale(20),
    paddingRight: moderateScale(14),
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
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: colors.textPrimary,
    letterSpacing: -0.255,
  },
  labelSelected: {
    color: colors.primaryAccent,
  },
  check: {
    width: moderateScale(22),
    height: moderateScale(22),
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: colors.borderMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkSelected: {
    borderColor: colors.primaryAccent,
    backgroundColor: colors.primaryAccent,
  },
  checkMark: {
    color: colors.surface,
    fontSize: moderateScale(12),
    fontWeight: '700',
    lineHeight: moderateScale(14),
  },
});
