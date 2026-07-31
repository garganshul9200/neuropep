import { Pressable, Text, View } from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import type { FC } from 'react';
import type { SvgProps } from 'react-native-svg';

import { colors } from '../../theme';

type GoalOptionCardProps = {
  title: string;
  subtitle: string;
  icon: FC<SvgProps>;
  selected?: boolean;
  onPress?: () => void;
};

export function GoalOptionCard({
  title,
  subtitle,
  icon: Icon,
  selected = false,
  onPress,
}: GoalOptionCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.card, selected && styles.cardSelected]}
    >
      <Icon width={moderateScale(22)} height={moderateScale(22)} />
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </Pressable>
  );
}

const styles = ScaledSheet.create({
  card: {
    width: '48%',
    minHeight: moderateScale(139),
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(10),
    paddingTop: moderateScale(21),
    paddingBottom: moderateScale(16),
    paddingHorizontal: moderateScale(16),
    backgroundColor: colors.surface,
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: colors.borderLight,
    boxShadow: '0px 2px 4px rgba(99, 99, 99, 0.12)',
  },
  cardSelected: {
    backgroundColor: colors.surfaceSelected,
    borderColor: colors.primary,
    boxShadow: 'none',
  },
  copy: {
    alignItems: 'center',
    width: '90%',
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: moderateScale(20),
  },
  subtitle: {
    fontSize: moderateScale(14),
    fontWeight: '400',
    color: colors.textCaption,
    textAlign: 'center',
    lineHeight: moderateScale(18),
  },
});
