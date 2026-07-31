import { Pressable, Text, View } from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';

import { colors } from '../theme';

export type ChecklistItem = {
  id: string;
  name: string;
  dose: string;
  timeOfDay: string;
  done?: boolean;
};

type TodaysChecklistCardProps = {
  items: ChecklistItem[];
  onMarkDone?: (id: string) => void;
};

export function TodaysChecklistCard({
  items,
  onMarkDone,
}: TodaysChecklistCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Today’s Checklist</Text>
      <View style={styles.list}>
        {items.map(item => (
          <View key={item.id} style={styles.row}>
            <View style={styles.copy}>
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.meta}>
                <Text style={styles.dose}>{item.dose}</Text>
                <View style={styles.timeRow}>
                  <View style={styles.dot} />
                  <Text style={styles.time}>{item.timeOfDay}</Text>
                </View>
              </View>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Mark ${item.name} as done`}
              disabled={item.done}
              onPress={() => onMarkDone?.(item.id)}
              style={[styles.action, item.done && styles.actionDone]}
            >
              <Text style={[styles.actionLabel, item.done && styles.actionLabelDone]}>
                {item.done ? 'Done' : 'Mark as done'}
              </Text>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  card: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: moderateScale(12),
    padding: moderateScale(14),
    gap: moderateScale(13),
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: colors.textPrimary,
    lineHeight: moderateScale(24),
  },
  list: {
    gap: moderateScale(12),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: moderateScale(72),
    paddingHorizontal: moderateScale(19),
    backgroundColor: colors.surface,
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  copy: {
    flex: 1,
    gap: moderateScale(6),
    paddingRight: moderateScale(8),
  },
  name: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: colors.textPrimary,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(9),
  },
  dose: {
    fontSize: moderateScale(13),
    color: colors.textCaption,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10),
  },
  dot: {
    width: moderateScale(6),
    height: moderateScale(6),
    borderRadius: moderateScale(3),
    backgroundColor: colors.primary,
  },
  time: {
    fontSize: moderateScale(13),
    color: colors.textCaption,
  },
  action: {
    height: moderateScale(32),
    paddingHorizontal: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: colors.primaryAccent,
  },
  actionDone: {
    backgroundColor: colors.surfaceSelected,
    borderColor: colors.primary,
  },
  actionLabel: {
    fontSize: moderateScale(12),
    fontWeight: '500',
    color: colors.primaryAccent,
  },
  actionLabelDone: {
    color: colors.primary,
  },
});
