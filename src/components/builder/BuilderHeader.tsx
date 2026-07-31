import { Pressable, StyleProp, Text, View, ViewStyle } from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';

import { BuilderBackIcon } from '../../assets/icons';
import { colors } from '../../theme';

type BuilderHeaderProps = {
  title?: string;
  onBack?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
};

export function BuilderHeader({
  title = 'Smart Protocol Builder',
  onBack,
  containerStyle,
}: BuilderHeaderProps) {
  return (
    <View style={[styles.row, containerStyle]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        hitSlop={8}
        onPress={onBack}
        style={styles.backButton}
      >
        <View style={styles.backIcon}>
          <BuilderBackIcon width={moderateScale(22)} height={moderateScale(22)} />
        </View>
      </Pressable>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = ScaledSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(6),
    paddingBottom: moderateScale(8),
  },
  backButton: {
    width: moderateScale(22),
    height: moderateScale(22),
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    transform: [{ rotate: '-90deg' }],
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: colors.textPrimary,
  },
});
