import { colors } from '../../theme';

export type MedicationDraft = {
  name: string;
  cyclePeriod: string;
  doseAmount: string;
  doseUnit: string;
  bacWater: string;
  concentration: string;
  startDate: string;
  unitPerDose: string;
  totalDoses: string;
  vialAvailable: string;
  syringeType: string;
  color: string;
};

export const DEFAULT_MEDICATION: MedicationDraft = {
  name: 'Thylosomin',
  cyclePeriod: '21 May (on : 7 - Off : 7) - 1 June',
  doseAmount: '5',
  doseUnit: 'mcg',
  bacWater: '5',
  concentration: '5',
  startDate: '12.5.2026',
  unitPerDose: '10',
  totalDoses: '20',
  vialAvailable: '45',
  syringeType: 'U - 199',
  color: colors.primary,
};

export const AI_WELCOME =
  "Hey! Just tell me what you're adding — name, dose, cycle and how much BAC water. I'll handle the rest";

export const AI_SUGGESTIONS = [
  'Add 5mcg , 5 ml of BPC',
  'Add 5mcg , 5 ml of BPC',
] as const;

export const AI_PLACEHOLDER =
  'eg : Add 5mcg , 5 ml of BPC with the cycle of on for 7 days and off for 7 days';

export const AI_SUCCESS =
  'Hurray ! I have added your medication and you can review it.';

export const PARSED_METRICS = [
  { label: 'Concentration', value: '2.5mg/ml' },
  { label: 'Unites per dose', value: '10 Units' },
  { label: 'Total doses in vial', value: '20 doses' },
  { label: 'Recommended Syringe Type', value: 'U 100' },
] as const;

export const MEDICATION_NAME_OPTIONS = [
  { label: 'Thylosomin', value: 'Thylosomin' },
  { label: 'BPC-157', value: 'BPC-157' },
  { label: 'TB-500', value: 'TB-500' },
  { label: 'CJC-1295', value: 'CJC-1295' },
  { label: 'Ipamorelin', value: 'Ipamorelin' },
] as const;

export const CYCLE_PERIOD_OPTIONS = [
  {
    label: '21 May (on : 7 - Off : 7) - 1 June',
    value: '21 May (on : 7 - Off : 7) - 1 June',
  },
  {
    label: '1 June (on : 5 - Off : 2) - 30 June',
    value: '1 June (on : 5 - Off : 2) - 30 June',
  },
  {
    label: 'Continuous (daily)',
    value: 'Continuous (daily)',
  },
] as const;

export const SYRINGE_TYPE_OPTIONS = [
  { label: 'U - 199', value: 'U - 199' },
  { label: 'U - 100', value: 'U - 100' },
  { label: 'U - 50', value: 'U - 50' },
  { label: 'U - 30', value: 'U - 30' },
] as const;
