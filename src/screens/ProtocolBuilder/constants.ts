import {
  GoalEnergyIcon,
  GoalFatLossIcon,
  GoalLongevityIcon,
  GoalMuscleIcon,
  GoalRecoveryIcon,
  GoalSleepIcon,
  StatusBiomarkersIcon,
  StatusDoseIcon,
  StatusGoalsIcon,
  TrackHydrationIcon,
  TrackMoodIcon,
  TrackRecoveryIcon,
  TrackSideEffectsIcon,
  TrackSleepIcon,
  TrackWeightIcon,
} from '../../assets/icons';

import type {
  ActivityLevel,
  BiologicalSex,
  BuilderStep,
  BuildingStatusItem,
  ExperienceOption,
  FrequencyId,
  GoalOption,
  LabeledOption,
  ProtocolAnswers,
  ReminderTime,
  SchedulePreviewDay,
  StepMeta,
  TrackingId,
  TrackingOption,
} from './types';

export const INITIAL_ANSWERS: ProtocolAnswers = {
  goal: 'fat-loss',
  experience: 'beginner',
  fullName: '',
  sex: null,
  age: 32,
  weightLbs: 170,
  heightCm: 175,
  activity: null,
  frequency: 'weekly',
  reminderTime: '7:00 PM',
  tracking: ['weight'],
};

export const STEP_META: Record<Exclude<BuilderStep, 6>, StepMeta> = {
  1: {
    title: 'Choose your Goal',
    tip: "What's your primary goal? I'll shape your protocol and tracking around it.",
    nextLabel: 'Next : Choose your experience',
    progress: 0,
  },
  2: {
    title: 'Your Experience',
    tip: "How experienced are you? I'll calibrate dosing and detail level accordingly.",
    nextLabel: 'Next : Fill out your basic details',
    progress: 1,
  },
  3: {
    title: 'A little Bit Baseline Profile',
    tip: 'A few baseline numbers help me personalize doses and trend analysis.',
    nextLabel: 'Next : Set dosage frequency',
    progress: 2,
  },
  4: {
    title: 'Dosage Frequency',
    tip: "Let's plan the rhythm. I'll keep reminders quiet but reliable.",
    nextLabel: 'Next : Track priorities',
    progress: 3,
  },
  5: {
    title: 'Tracking priorities',
    tip: 'What should I pay closer attention to? Pick any categories.',
    nextLabel: 'Activate your stack',
    progress: 4,
  },
};

export const GOALS: GoalOption[] = [
  {
    id: 'fat-loss',
    title: 'Fat Loss',
    subtitle: 'Lean down, preserve muscle',
    icon: GoalFatLossIcon,
  },
  {
    id: 'muscle',
    title: 'Muscle Growth',
    subtitle: 'Hypertrophy and strength',
    icon: GoalMuscleIcon,
  },
  {
    id: 'recovery',
    title: 'Recovery & Healing',
    subtitle: 'Tissue repair',
    icon: GoalRecoveryIcon,
  },
  {
    id: 'sleep',
    title: 'Sleep Optimization',
    subtitle: 'Deep sleep',
    icon: GoalSleepIcon,
  },
  {
    id: 'energy',
    title: 'Energy & Focus',
    subtitle: 'Daytime cognition & drive',
    icon: GoalEnergyIcon,
  },
  {
    id: 'longevity',
    title: 'Longevity & Wellness',
    subtitle: 'Health span optimization',
    icon: GoalLongevityIcon,
  },
];

export const EXPERIENCE_OPTIONS: ExperienceOption[] = [
  {
    id: 'beginner',
    title: 'Beginner',
    description: 'First Cycle. Need guidance on basics',
  },
  {
    id: 'intermediate',
    title: 'Intermediate',
    description: 'A Few Cycles. Comfortable with dosing',
  },
  {
    id: 'advanced',
    title: 'Advanced',
    description: 'Stacking, long term protocols',
  },
];

export const SEX_OPTIONS: LabeledOption<BiologicalSex>[] = [
  { id: 'male', label: 'Male' },
  { id: 'female', label: 'Female' },
  { id: 'others', label: 'Others' },
];

export const ACTIVITY_OPTIONS: LabeledOption<ActivityLevel>[] = [
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'athlete', label: 'Athlete' },
];

export const FREQUENCY_OPTIONS: LabeledOption<FrequencyId>[] = [
  { id: 'daily', label: 'Daily' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'cycle', label: '8-12 Weeks' },
];

export const REMINDER_OPTIONS: LabeledOption<ReminderTime>[] = [
  { id: '7:00 PM', label: '7:00 PM' },
  { id: '8:00 PM', label: '8:00 PM' },
  { id: '9:00 PM', label: '9:00 PM' },
];

export const SCHEDULE_PREVIEW: SchedulePreviewDay[] = [
  { day: 'M', date: '12', active: true },
  { day: 'T', date: '13', active: false },
  { day: 'W', date: '14', active: false },
  { day: 'Th', date: '15', active: false },
  { day: 'F', date: '16', active: false },
];

export const TRACKING_OPTIONS: TrackingOption[] = [
  {
    id: 'weight',
    label: 'Weight',
    icon: TrackWeightIcon,
    previewValue: '72lbs',
    previewLabel: 'Weight',
  },
  {
    id: 'sleep',
    label: 'Sleep',
    icon: TrackSleepIcon,
    previewValue: '8h',
    previewLabel: 'of Sleep',
  },
  {
    id: 'side-effects',
    label: 'Side Effects',
    icon: TrackSideEffectsIcon,
  },
  { id: 'mood', label: 'Mood', icon: TrackMoodIcon },
  {
    id: 'recovery',
    label: 'Recovery',
    icon: TrackRecoveryIcon,
    previewValue: '78%',
    previewLabel: 'Recovery',
  },
  {
    id: 'hydration',
    label: 'Hydration',
    icon: TrackHydrationIcon,
  },
];

export const BUILDING_STATUS: BuildingStatusItem[] = [
  { label: 'Analyzing your goals...', icon: StatusGoalsIcon },
  { label: 'Mapping baseline biomarkers..', icon: StatusBiomarkersIcon },
  { label: 'Optimizing dose schedule..', icon: StatusDoseIcon },
  {
    label: 'Building personalized tracking system..',
    icon: StatusDoseIcon,
  },
];

const PREVIEW_FALLBACK = TRACKING_OPTIONS.filter(
  option => option.previewValue && option.previewLabel,
).slice(0, 3);

export function getDashboardPreviewMetrics(
  selected: TrackingId[],
): TrackingOption[] {
  const selectedMetrics = TRACKING_OPTIONS.filter(
    option =>
      selected.includes(option.id) &&
      option.previewValue &&
      option.previewLabel,
  ).slice(0, 3);

  return selectedMetrics.length > 0 ? selectedMetrics : PREVIEW_FALLBACK;
}
