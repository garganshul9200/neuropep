import { Pressable, Text, View } from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import type { FC } from 'react';
import type { SvgProps } from 'react-native-svg';

import { BriefSparkleIcon } from '../../assets/icons';
import { colors } from '../../theme';

export type ParsedMetric = {
  label: string;
  value: string;
};

type ParsedMedicationCardProps = {
  metrics: ParsedMetric[];
};

export function ParsedMedicationCard({ metrics }: ParsedMedicationCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <BriefSparkleIcon width={moderateScale(22)} height={moderateScale(22)} />
        <Text style={styles.title}>Auto Calculated</Text>
      </View>

      <View style={styles.rows}>
        {metrics.map(metric => (
          <View key={metric.label} style={styles.row}>
            <Text style={styles.label}>{metric.label}</Text>
            <Text style={styles.value}>{metric.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

type NextActionCardProps = {
  label: string;
  icon: FC<SvgProps>;
  onPress?: () => void;
};

export function NextActionCard({
  label,
  icon: Icon,
  onPress,
}: NextActionCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      style={styles.actionCard}
      onPress={onPress}
    >
      <Icon width={moderateScale(22)} height={moderateScale(22)} />
      <Text style={styles.actionLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = ScaledSheet.create({
  card: {
    alignSelf: 'center',
    width: '90%',
    padding: moderateScale(16),
    backgroundColor: colors.surface,
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: colors.borderLight,
    gap: moderateScale(14),
    boxShadow: '0px 2px 4px rgba(99, 99, 99, 0.12)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
  },
  title: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: colors.textPrimary,
  },
  rows: {
    gap: moderateScale(10),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  label: {
    flex: 1,
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
    fontWeight: '400',
    color: colors.textPrimary,
  },
  value: {
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
    fontWeight: '500',
    color: colors.textPrimary,
    textAlign: 'right',
  },
  actionCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(8),
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(16),
    backgroundColor: colors.surface,
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: colors.borderLight,
    boxShadow: '0px 2px 4px rgba(99, 99, 99, 0.12)',
  },
  actionLabel: {
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
    fontWeight: '400',
    color: colors.textPrimary,
    textAlign: 'center',
  },
});
