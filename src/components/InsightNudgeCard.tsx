import { Pressable, Text, View } from 'react-native';
import { ScaledSheet, moderateScale, ms } from 'react-native-size-matters';

import { TrackWeightIcon } from '../assets/icons';
import { colors } from '../theme';

type InsightNudgeCardProps = {
  title: string;
  message: string;
  onDismiss?: () => void;
};

export function InsightNudgeCard({
  title,
  message,
  onDismiss,
}: InsightNudgeCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <TrackWeightIcon width={moderateScale(22)} height={moderateScale(22)} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.message}>{message}</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Dismiss"
        onPress={onDismiss}
        style={styles.dismiss}
      >
        <Text style={styles.dismissLabel}>Dismiss</Text>
      </Pressable>
    </View>
  );
}

const styles = ScaledSheet.create({
  card: {
    minHeight: moderateScale(121),
    paddingTop: moderateScale(9),
    paddingBottom: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    backgroundColor: colors.surfaceSelected,
    borderRadius: moderateScale(12),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10),
  },
  title: {
    flex: 1,
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: colors.textPrimary,
    lineHeight: moderateScale(23),
  },
  message: {
    marginTop: moderateScale(2), 
    marginLeft: moderateScale(32),
    fontSize: moderateScale(14),
    lineHeight: moderateScale(22),
    color: colors.textCaption,
  },
  dismiss: {
    alignSelf: 'flex-end',
    marginTop: moderateScale(8),
  },
  dismissLabel: {
    fontSize: moderateScale(14),
    fontWeight: '400',
    color: colors.error,
  },
});
