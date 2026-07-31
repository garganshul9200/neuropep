import { Pressable, Text, View } from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';

import { RadioSelectedIcon, RadioUnselectedIcon } from '../../assets/icons';
import { colors } from '../../theme';

type ExperienceOptionRowProps = {
  title: string;
  description: string;
  selected?: boolean;
  onPress?: () => void;
};

export function ExperienceOptionRow({
  title,
  description,
  selected = false,
  onPress,
}: ExperienceOptionRowProps) {
  const Radio = selected ? RadioSelectedIcon : RadioUnselectedIcon;

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.row, selected && styles.rowSelected]}
    >
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Radio width={moderateScale(22)} height={moderateScale(22)} />
    </Pressable>
  );
}

const styles = ScaledSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: moderateScale(72),
    paddingTop: moderateScale(14),
    paddingBottom: moderateScale(13),
    paddingLeft: moderateScale(22),
    paddingRight: moderateScale(24),
    backgroundColor: colors.surface,
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: colors.borderLight,
    boxShadow: '0px 2px 4px rgba(99, 99, 99, 0.08)',
  },
  rowSelected: {
    borderColor: colors.primary,
    boxShadow: 'none',
  },
  copy: {
    flex: 1,
    paddingRight: moderateScale(12),
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: colors.textPrimary,
    lineHeight: moderateScale(20),
  },
  description: {
    fontSize: moderateScale(14),
    fontWeight: '400',
    color: colors.textCaption,
    lineHeight: moderateScale(18),
  },
});
