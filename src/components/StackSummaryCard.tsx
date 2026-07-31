import { Text, View } from 'react-native';
import { ScaledSheet, moderateScale, ms } from 'react-native-size-matters';
import type { FC } from 'react';
import type { SvgProps } from 'react-native-svg';

import { colors } from '../theme';

type StackStat = {
  value: string;
  label: string;
};

type StackSummaryCardProps = {
  title: string;
  icon: FC<SvgProps>;
  stats: StackStat[];
};

export function StackSummaryCard({
  title,
  icon: Icon,
  stats,
}: StackSummaryCardProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <Icon width={moderateScale(22)} height={moderateScale(22)} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.stats}>
        {stats.map(stat => (
          <View key={stat.label} style={styles.statCard}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  wrap: {
    gap: moderateScale(18),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: colors.textPrimary,
    lineHeight: moderateScale(24),
  },
  stats: {
    flexDirection: 'row',
    gap: moderateScale(8),
  },
  statCard: {
    flex: 1,
    minHeight: moderateScale(82),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(16),
    backgroundColor: colors.surface,
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: colors.borderLight,
    gap: moderateScale(2),
  },
  statValue: {
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: moderateScale(14),
    color: colors.textCaption,
    lineHeight: moderateScale(18),
  },
});
