import { Pressable, StyleProp, Text, View, ViewStyle } from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import type { FC } from 'react';
import type { SvgProps } from 'react-native-svg';

import { gradients, colors } from '../theme';

type GradientButtonProps = {
  label: string;
  icon?: FC<SvgProps>;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
};

export function GradientButton({
  label,
  icon: Icon,
  onPress,
  containerStyle,
}: GradientButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed, containerStyle]}
    >
      <View style={styles.content}>
        {Icon ? <Icon width={moderateScale(22)} height={moderateScale(22)} /> : null}
        <Text style={styles.label}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = ScaledSheet.create({
  button: {
    height: moderateScale(52),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(12),
    experimental_backgroundImage: gradients.brand,
    boxShadow: '0px 2px 2px rgba(99, 99, 99, 0.08)',
  },
  pressed: {
    opacity: 0.9,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
  },
  label: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: colors.surface,
  },
});
