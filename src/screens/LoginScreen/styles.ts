import { ScaledSheet, moderateScale } from 'react-native-size-matters';

import { colors } from '../../theme';

export const styles = ScaledSheet.create({
  screen: {
    alignItems: 'center',
    paddingHorizontal: moderateScale(16),
  },
  hero: {
    width: '100%',
    borderRadius: moderateScale(12),
  },
  headline: {
    marginTop: moderateScale(18),
    maxWidth: '80%',
    fontSize: moderateScale(20),
    lineHeight: moderateScale(28),
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  googleButton: {
    marginTop: moderateScale(16),
    height: moderateScale(48),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(8),
    backgroundColor: colors.surface,
    borderRadius: moderateScale(12),
    boxShadow: '0px 2px 2px rgba(99, 99, 99, 0.08)',
  },
  pressed: {
    opacity: 0.9,
  },
  googleLabel: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: colors.textPrimary,
  },
  legal: {
    marginTop: moderateScale(16),
    marginBottom: moderateScale(8),
    maxWidth: '90%',
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
    fontWeight: '400',
    color: colors.textMuted,
    textAlign: 'center',
  },
  legalLink: {
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
    fontWeight: '500',
    color: colors.primary,
  },
});
