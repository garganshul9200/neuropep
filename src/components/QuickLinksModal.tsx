import { Modal, Pressable, Text, View } from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import type { FC } from 'react';
import type { SvgProps } from 'react-native-svg';

import {
  QuickAddMedicationIcon,
  QuickAddScheduleIcon,
  QuickCalculatorIcon,
  QuickDailyCheckInIcon,
  QuickLogDoseIcon,
  QuickLogWeightIcon,
} from '../assets/icons';
import { colors } from '../theme';

type QuickLink = {
  id: string;
  label: string;
  icon: FC<SvgProps>;
};

const QUICK_LINKS: QuickLink[] = [
  { id: 'add-medication', label: 'Add Medication', icon: QuickAddMedicationIcon },
  { id: 'add-schedule', label: 'Add Schedule', icon: QuickAddScheduleIcon },
  { id: 'log-dose', label: 'Log Dose', icon: QuickLogDoseIcon },
  { id: 'log-weight', label: 'Log Weight', icon: QuickLogWeightIcon },
  { id: 'daily-check-in', label: 'Daily Check In', icon: QuickDailyCheckInIcon },
  { id: 'calculator', label: 'Calculator', icon: QuickCalculatorIcon },
];

type QuickLinksModalProps = {
  visible: boolean;
  onClose: () => void;
  onSelect?: (id: string) => void;
};

export function QuickLinksModal({
  visible,
  onClose,
  onSelect,
}: QuickLinksModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <Pressable style={styles.backdropDismiss} onPress={onClose} />
        <View style={styles.sheet}>
          <Text style={styles.title}>Quick Links</Text>
          <View style={styles.grid}>
            {QUICK_LINKS.map(link => {
              const Icon = link.icon;
              return (
                <Pressable
                  key={link.id}
                  accessibilityRole="button"
                  accessibilityLabel={link.label}
                  style={styles.card}
                  onPress={() => {
                    onSelect?.(link.id);
                    onClose();
                  }}
                >
                  <Icon width={moderateScale(24)} height={moderateScale(24)} />
                  <Text style={styles.label}>{link.label}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = ScaledSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.60)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(16),
  },
  backdropDismiss: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  sheet: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: moderateScale(12),
    paddingTop: moderateScale(20),
    paddingBottom: moderateScale(24),
    paddingHorizontal: moderateScale(16),
    gap: moderateScale(18),
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: colors.textCaption,
    letterSpacing: -0.272,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: moderateScale(18),
  },
  card: {
    width: '47%',
    minHeight: moderateScale(88),
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(8),
    paddingVertical: moderateScale(16),
    paddingHorizontal: moderateScale(12),
    backgroundColor: colors.surface,
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: colors.borderLight,
    boxShadow: '0px 2px 4px rgba(99, 99, 99, 0.12)',
  },
  label: {
    fontSize: moderateScale(14),
    fontWeight: '400',
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: moderateScale(21),
  },
});
