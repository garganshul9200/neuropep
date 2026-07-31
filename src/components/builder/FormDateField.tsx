import { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  Text,
  View,
} from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';

import { UpChevronIcon } from '../../assets/icons';
import { colors } from '../../theme';

type FormDateFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const;
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

function formatDate(date: Date) {
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

function parseDate(value: string): Date {
  const parts = value.split('.').map(Number);
  if (parts.length === 3 && parts.every(part => Number.isFinite(part))) {
    const [day, month, year] = parts;
    const parsed = new Date(year, month - 1, day);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed;
    }
  }
  return new Date();
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function getMonthCells(monthDate: Date) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<Date | null> = Array.from({ length: firstWeekday }, () => null);

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(year, month, day));
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return cells;
}

export function FormDateField({
  label,
  value,
  onChange,
  placeholder = 'Select date',
}: FormDateFieldProps) {
  const [open, setOpen] = useState(false);
  const selectedDate = useMemo(() => parseDate(value), [value]);
  const [draftDate, setDraftDate] = useState(selectedDate);
  const [visibleMonth, setVisibleMonth] = useState(
    () => new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1),
  );

  const monthCells = useMemo(() => getMonthCells(visibleMonth), [visibleMonth]);

  const openPicker = () => {
    const next = parseDate(value);
    setDraftDate(next);
    setVisibleMonth(new Date(next.getFullYear(), next.getMonth(), 1));
    setOpen(true);
  };

  const shiftMonth = (delta: number) => {
    setVisibleMonth(
      prev => new Date(prev.getFullYear(), prev.getMonth() + delta, 1),
    );
  };

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        accessibilityLabel={label}
        style={[styles.trigger, open && styles.triggerOpen]}
        onPress={openPicker}
      >
        <Text
          style={[styles.value, !value && styles.placeholder]}
          numberOfLines={1}
        >
          {value || placeholder}
        </Text>
        <View style={[styles.chevron, open && styles.chevronOpen]}>
          <UpChevronIcon width={moderateScale(24)} height={moderateScale(12)} />
        </View>
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <View style={styles.backdrop}>
          <Pressable
            style={styles.backdropDismiss}
            onPress={() => setOpen(false)}
          />
          <View style={styles.sheet}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>{label}</Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Done"
                onPress={() => {
                  onChange(formatDate(draftDate));
                  setOpen(false);
                }}
              >
                <Text style={styles.done}>Done</Text>
              </Pressable>
            </View>

            <View style={styles.monthHeader}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Previous month"
                hitSlop={8}
                onPress={() => shiftMonth(-1)}
                style={styles.monthNav}
              >
                <View style={styles.monthNavPrev}>
                  <UpChevronIcon
                    width={moderateScale(20)}
                    height={moderateScale(10)}
                  />
                </View>
              </Pressable>
              <Text style={styles.monthLabel}>
                {MONTHS[visibleMonth.getMonth()]} {visibleMonth.getFullYear()}
              </Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Next month"
                hitSlop={8}
                onPress={() => shiftMonth(1)}
                style={styles.monthNav}
              >
                <View style={styles.monthNavNext}>
                  <UpChevronIcon
                    width={moderateScale(20)}
                    height={moderateScale(10)}
                  />
                </View>
              </Pressable>
            </View>

            <View style={styles.weekRow}>
              {WEEKDAYS.map((day, index) => (
                <Text key={`${day}-${index}`} style={styles.weekday}>
                  {day}
                </Text>
              ))}
            </View>

            <View style={styles.daysGrid}>
              {monthCells.map((date, index) => {
                if (!date) {
                  return <View key={`empty-${index}`} style={styles.dayCell} />;
                }

                const selected = sameDay(date, draftDate);
                return (
                  <Pressable
                    key={date.toISOString()}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    style={styles.dayCell}
                    onPress={() => setDraftDate(date)}
                  >
                    <View
                      style={[
                        styles.dayInner,
                        selected && styles.dayInnerSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          selected && styles.dayTextSelected,
                        ]}
                      >
                        {date.getDate()}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = ScaledSheet.create({
  field: {
    gap: moderateScale(14),
  },
  label: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: colors.textPrimary,
    lineHeight: moderateScale(20),
  },
  trigger: {
    height: moderateScale(52),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(12),
    backgroundColor: colors.surface,
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: colors.borderMuted,
    gap: moderateScale(8),
  },
  triggerOpen: {
    borderColor: colors.primaryAccent,
  },
  value: {
    flex: 1,
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: colors.textPrimary,
    lineHeight: moderateScale(24),
  },
  placeholder: {
    color: colors.textMuted,
  },
  chevron: {
    transform: [{ rotate: '180deg' }],
  },
  chevronOpen: {
    transform: [{ rotate: '0deg' }],
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'flex-end',
  },
  backdropDismiss: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: moderateScale(16),
    borderTopRightRadius: moderateScale(16),
    paddingTop: moderateScale(16),
    paddingBottom: moderateScale(24),
    paddingHorizontal: moderateScale(16),
    gap: moderateScale(12),
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sheetTitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: colors.textPrimary,
  },
  done: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: colors.primaryAccent,
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: moderateScale(4),
  },
  monthLabel: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: colors.textPrimary,
  },
  monthNav: {
    width: moderateScale(36),
    height: moderateScale(36),
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthNavPrev: {
    transform: [{ rotate: '-90deg' }],
  },
  monthNavNext: {
    transform: [{ rotate: '90deg' }],
  },
  weekRow: {
    flexDirection: 'row',
  },
  weekday: {
    flex: 1,
    textAlign: 'center',
    fontSize: moderateScale(13),
    fontWeight: '500',
    color: colors.textMuted,
    lineHeight: moderateScale(20),
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.2857%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayInner: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayInnerSelected: {
    backgroundColor: colors.primaryAccent,
  },
  dayText: {
    fontSize: moderateScale(15),
    fontWeight: '400',
    color: colors.textPrimary,
  },
  dayTextSelected: {
    color: colors.surface,
    fontWeight: '600',
  },
});
