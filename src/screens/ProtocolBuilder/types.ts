import type { FC } from 'react';
import type { SvgProps } from 'react-native-svg';

export type BuilderStep = 1 | 2 | 3 | 4 | 5 | 6;

export type GoalId =
  | 'fat-loss'
  | 'muscle'
  | 'recovery'
  | 'sleep'
  | 'energy'
  | 'longevity';

export type ExperienceId = 'beginner' | 'intermediate' | 'advanced';

export type BiologicalSex = 'male' | 'female' | 'others';

export type ActivityLevel = 'beginner' | 'intermediate' | 'athlete';

export type FrequencyId = 'daily' | 'weekly' | 'cycle';

export type ReminderTime = '7:00 PM' | '8:00 PM' | '9:00 PM';

export type TrackingId =
  | 'weight'
  | 'sleep'
  | 'side-effects'
  | 'mood'
  | 'recovery'
  | 'hydration';

export type ProtocolAnswers = {
  goal: GoalId | null;
  experience: ExperienceId | null;
  fullName: string;
  sex: BiologicalSex | null;
  age: number;
  weightLbs: number;
  heightCm: number;
  activity: ActivityLevel | null;
  frequency: FrequencyId | null;
  reminderTime: ReminderTime;
  tracking: TrackingId[];
};

export type GoalOption = {
  id: GoalId;
  title: string;
  subtitle: string;
  icon: FC<SvgProps>;
};

export type ExperienceOption = {
  id: ExperienceId;
  title: string;
  description: string;
};

export type LabeledOption<T extends string> = {
  id: T;
  label: string;
};

export type TrackingOption = {
  id: TrackingId;
  label: string;
  icon: FC<SvgProps>;
  previewValue?: string;
  previewLabel?: string;
};

export type SchedulePreviewDay = {
  day: string;
  date: string;
  active: boolean;
};

export type BuildingStatusItem = {
  label: string;
  icon: FC<SvgProps>;
};

export type StepMeta = {
  title: string;
  tip: string;
  nextLabel: string;
  progress: number;
};
