import { Text, TextInput, View, type TextInputProps } from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';

import { colors } from '../../theme';

type FormTextFieldProps = Omit<TextInputProps, 'style'> & {
  label: string;
};

export function FormTextField({
  label,
  placeholderTextColor = colors.textMuted,
  ...inputProps
}: FormTextFieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor={placeholderTextColor}
        style={styles.input}
        {...inputProps}
      />
    </View>
  );
}

const styles = ScaledSheet.create({
  field: {
    gap: moderateScale(10),
  },
  label: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: colors.textPrimary,
  },
  input: {
    height: moderateScale(52),
    paddingHorizontal: moderateScale(12),
    backgroundColor: colors.surface,
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: colors.borderMuted,
    fontSize: moderateScale(14),
    color: colors.textPrimary,
  },
});
