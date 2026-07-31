import { Text, View } from 'react-native';
import { ScaledSheet, moderateScale, ms } from 'react-native-size-matters';

import { DashboardMetricsIcon } from '../assets/icons';
import { colors } from '../theme';

type Metric = {
  value: string;
  label: string;
};

type PriorityMetricsSectionProps = {
  metrics: Metric[];
};

export function PriorityMetricsSection({ metrics }: PriorityMetricsSectionProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <DashboardMetricsIcon width={moderateScale(22)} height={moderateScale(22)} />
        <Text style={styles.title}>Priority Metrices</Text>
      </View>
      <View style={styles.row}>
        {metrics.map(metric => (
          <View key={metric.label} style={styles.card}>
            <Text style={styles.value}>{metric.value}</Text>
            <Text style={styles.label}>{metric.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  wrap: {
    gap: moderateScale(14),
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
  row: {
    flexDirection: 'row',
    gap: moderateScale(8),
  },
  card: {
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
  value: {
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: colors.textPrimary,
  },
  label: {
    fontSize: moderateScale(14),
    color: colors.textCaption,
    lineHeight: moderateScale(18),
  },
});
