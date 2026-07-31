import { Pressable, Text, View } from 'react-native';
import { ScaledSheet, moderateScale, ms } from 'react-native-size-matters';

import {
  ArrowUpIcon,
  BriefSparkleIcon,
  LockIcon,
} from '../assets/icons';
import { colors } from '../theme';

type MorningBriefCardProps = {
  lockedMessage?: string;
  briefText?: string;
  pageCount?: number;
  activePage?: number;
  onExpand?: () => void;
};

export function MorningBriefCard({
  lockedMessage,
  briefText,
  pageCount = 3,
  activePage = 0,
  onExpand,
}: MorningBriefCardProps) {
  const unlocked = briefText != null && briefText.length > 0;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <BriefSparkleIcon width={moderateScale(18)} height={moderateScale(18)} />
          <Text style={styles.title}>Morning Brief</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open morning brief"
          hitSlop={moderateScale(8)}
          onPress={onExpand}
        >
          <View style={styles.arrow}>
            <ArrowUpIcon width={moderateScale(22)} height={moderateScale(22)} />
          </View>
        </Pressable>
      </View>

      {unlocked ? (
        <>
          <Text style={styles.briefText}>{briefText}</Text>
          <View style={styles.dots}>
            {Array.from({ length: pageCount }, (_, index) => (
              <View
                key={index}
                style={[
                  index === activePage ? styles.dotActive : styles.dot,
                ]}
              />
            ))}
          </View>
        </>
      ) : (
        <View style={styles.lockedState}>
          <View style={styles.lockBadge}>
            <LockIcon width={moderateScale(20)} height={moderateScale(20)} />
          </View>
          <Text style={styles.lockedMessage}>{lockedMessage}</Text>
        </View>
      )}
    </View>
  );
}

const styles = ScaledSheet.create({
  card: {
    padding: moderateScale(14),
    backgroundColor: colors.surface,
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: colors.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(6),
  },
  title: {
    fontSize: moderateScale(14),
    lineHeight: moderateScale(18),
    fontWeight: '400',
    color: colors.primary,
  },
  arrow: {
    transform: [{ rotate: '48.54deg' }],
  },
  briefText: {
    marginTop: moderateScale(16),
    fontSize: moderateScale(14),
    lineHeight: moderateScale(18),
    fontWeight: '400',
    color: colors.textPrimary,
  },
  dots: {
    marginTop: moderateScale(16),
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    gap: moderateScale(2),
  },
  dotActive: {
    width: moderateScale(28),
    height: moderateScale(6),
    borderRadius: moderateScale(4),
    backgroundColor: colors.primary,
  },
  dot: {
    width: moderateScale(6),
    height: moderateScale(6),
    borderRadius: moderateScale(4),
    backgroundColor: colors.borderMuted,
  },
  lockedState: {
    marginTop: moderateScale(12),
    alignItems: 'center',
    alignSelf: 'center',
    width: '70%',
    gap: moderateScale(8),
  },
  lockBadge: {
    width: moderateScale(38),
    height: moderateScale(38),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceMuted,
    borderRadius: moderateScale(12),
  },
  lockedMessage: {
    fontSize: moderateScale(14),
    fontWeight: '400',
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: moderateScale(20),
  },
});
