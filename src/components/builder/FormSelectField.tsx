import { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';

import { UpChevronIcon } from '../../assets/icons';
import { colors } from '../../theme';

export type SelectOption = {
  label: string;
  value: string;
};

type FormSelectFieldProps = {
  label: string;
  value: string;
  options: readonly SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
};

export function FormSelectField({
  label,
  value,
  options,
  onChange,
  placeholder = 'Select',
}: FormSelectFieldProps) {
  const [open, setOpen] = useState(false);
  const selected = options.find(option => option.value === value);

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        accessibilityLabel={label}
        style={[styles.trigger, open && styles.triggerOpen]}
        onPress={() => setOpen(true)}
      >
        <Text
          style={[styles.value, !selected && styles.placeholder]}
          numberOfLines={1}
        >
          {selected?.label ?? placeholder}
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
          <Pressable style={styles.backdropDismiss} onPress={() => setOpen(false)} />
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>{label}</Text>
            <ScrollView
              style={styles.options}
              bounces={false}
              showsVerticalScrollIndicator={false}
            >
              {options.map(option => {
                const isSelected = option.value === value;
                return (
                  <Pressable
                    key={option.value}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                    style={[styles.option, isSelected && styles.optionSelected]}
                    onPress={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.optionLabel,
                        isSelected && styles.optionLabelSelected,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
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
    maxHeight: '50%',
    backgroundColor: colors.surface,
    borderTopLeftRadius: moderateScale(16),
    borderTopRightRadius: moderateScale(16),
    paddingTop: moderateScale(16),
    paddingBottom: moderateScale(24),
    paddingHorizontal: moderateScale(16),
    gap: moderateScale(12),
  },
  sheetTitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: colors.textPrimary,
  },
  options: {
    maxHeight: moderateScale(280),
  },
  option: {
    minHeight: moderateScale(48),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(12),
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginBottom: moderateScale(8),
    backgroundColor: colors.surface,
  },
  optionSelected: {
    borderColor: colors.primaryAccent,
    backgroundColor: colors.surfaceSelected,
  },
  optionLabel: {
    fontSize: moderateScale(14),
    fontWeight: '400',
    color: colors.textPrimary,
  },
  optionLabelSelected: {
    fontWeight: '500',
    color: colors.primaryAccent,
  },
});
