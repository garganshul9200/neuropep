import { ScaledSheet, moderateScale} from 'react-native-size-matters';

import { colors, gradients } from '../../theme';

export const styles = ScaledSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: moderateScale(16),
    paddingTop: moderateScale(16),
    gap: moderateScale(16),
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    gap: moderateScale(18),
    paddingBottom: moderateScale(12),
  },
  stepTitle: {
    marginTop: moderateScale(10),
    fontSize: moderateScale(18),
    fontWeight: '500',
    color: colors.textPrimary,
  },
  stepTitleHint: {
    fontSize: moderateScale(14),
    fontWeight: '400',
    color: colors.textCaption,
  },
  goalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: moderateScale(20),
  },
  listGap: {
    gap: moderateScale(14),
  },
  form: {
    gap: moderateScale(18),
  },
  previewCard: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: moderateScale(12),
    padding: moderateScale(14),
    gap: moderateScale(14),
  },
  previewTitle: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: colors.textPrimary,
  },
  scheduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scheduleItem: {
    width: moderateScale(50),
    alignItems: 'center',
    gap: moderateScale(4),
  },
  scheduleDay: {
    fontSize: moderateScale(15),
    color: colors.textPrimary,
  },
  scheduleDate: {
    width: '100%',
    height: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(12),
    backgroundColor: colors.surface,
  },
  scheduleDateActive: {
    experimental_backgroundImage: gradients.brandReversed,
  },
  scheduleDateText: {
    fontSize: moderateScale(15),
    color: colors.textPrimary,
  },
  scheduleDateTextActive: {
    color: '#FFFFFF',
  },
  reminderSummary: {
    fontSize: moderateScale(16),
    color: colors.textPrimary,
    textAlign: 'center',
  },
  trackingWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: moderateScale(13),
  },
  metricsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
  },
  metricsTitle: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: colors.textPrimary,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: moderateScale(8),
  },
  metricCard: {
    flex: 1,
    minHeight: moderateScale(82),
    justifyContent: 'center',
    padding: moderateScale(16),
    backgroundColor: colors.surface,
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: colors.borderLight,
    gap: moderateScale(2),
  },
  metricValue: {
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: colors.textPrimary,
  },
  metricLabel: {
    fontSize: moderateScale(13),
    color: colors.textCaption,
    lineHeight: moderateScale(19),
  },
  buildingCopy: {
    alignItems: 'center',
    gap: moderateScale(4),
    paddingHorizontal: moderateScale(16),
    marginTop: moderateScale(16),
  },
  buildingTitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: moderateScale(22),
    textTransform: 'capitalize',
  },
  buildingSubtitle: {
    fontSize: moderateScale(14),
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: moderateScale(20),
  },
});
