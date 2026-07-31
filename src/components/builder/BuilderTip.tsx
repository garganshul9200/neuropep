import { Text, View } from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';

import { BuilderTipIcon } from '../../assets/icons';
import { colors } from '../../theme';

type BuilderTipProps = {
  message: string;
  inverted?: boolean;
};

export function BuilderTip({ message, inverted = false }: BuilderTipProps) {
  return (
    <View style={[styles.row, inverted && styles.rowInverted]}>
      <View style={[styles.avatar, inverted && styles.avatarInverted]}>
        <BuilderTipIcon width={moderateScale(16)} height={moderateScale(16)} />
      </View>
      <View style={[styles.bubble, inverted && styles.bubbleInverted]}>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: moderateScale(6),
  },
  rowInverted: {
    flexDirection: 'row-reverse',
  },
  avatar: {
    width: moderateScale(32),
    height: moderateScale(32),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: moderateScale(16),
    borderWidth: 0.75,
    borderColor: colors.primaryAccent,
  },
  avatarInverted: {
    borderColor: colors.borderMuted,
  },
  bubble: {
    flex: 0.9,
    justifyContent: 'center',
    padding: moderateScale(12),
    backgroundColor: colors.surfaceMuted,
    borderTopLeftRadius: moderateScale(12),
    borderTopRightRadius: moderateScale(12),
    borderBottomRightRadius: moderateScale(12),
  },
  bubbleInverted: {
    padding: moderateScale(12),
    backgroundColor: colors.surfaceSelected,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: moderateScale(12),
  },
  message: {
    fontSize: moderateScale(16),
    lineHeight: moderateScale(20),
    fontWeight: '400',
    color: colors.textPrimary,
  },
});
