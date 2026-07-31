import { useCallback, useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { DashboardMetricsIcon } from '../../assets/icons';
import { BuilderHeader } from '../../components/builder/BuilderHeader';
import { BuilderProgress } from '../../components/builder/BuilderProgress';
import { BuilderTip } from '../../components/builder/BuilderTip';
import { BuildingLoader } from '../../components/builder/BuildingLoader';
import { BuildingStatusList } from '../../components/builder/BuildingStatusList';
import { ChoiceField } from '../../components/builder/ChoiceField';
import { ExperienceOptionRow } from '../../components/builder/ExperienceOptionRow';
import { FormTextField } from '../../components/builder/FormTextField';
import { GoalOptionCard } from '../../components/builder/GoalOptionCard';
import { NumberStepper } from '../../components/builder/NumberStepper';
import { TrackingChip } from '../../components/builder/TrackingChip';
import { GradientButton } from '../../components/GradientButton';
import { WrapperScreen } from '../../components/WrapperScreen';
import type { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme';

import {
  ACTIVITY_OPTIONS,
  BUILDING_STATUS,
  EXPERIENCE_OPTIONS,
  FREQUENCY_OPTIONS,
  getDashboardPreviewMetrics,
  GOALS,
  INITIAL_ANSWERS,
  REMINDER_OPTIONS,
  SCHEDULE_PREVIEW,
  SEX_OPTIONS,
  STEP_META,
  TRACKING_OPTIONS,
} from './constants';
import { styles } from './styles';
import type { BuilderStep, ProtocolAnswers, TrackingId } from './types';

type Props = NativeStackScreenProps<RootStackParamList, 'ProtocolBuilder'>;

export function ProtocolBuilderScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState<BuilderStep>(1);
  const [answers, setAnswers] = useState<ProtocolAnswers>(INITIAL_ANSWERS);

  const finishBuilding = useCallback(() => {
    navigation.replace('Main', {
      screen: 'Home',
      params: { protocol: answers },
    });
  }, [answers, navigation]);

  const patch = (partial: Partial<ProtocolAnswers>) => {
    setAnswers(prev => ({ ...prev, ...partial }));
  };

  const toggleTracking = (id: TrackingId) => {
    setAnswers(prev => {
      const exists = prev.tracking.includes(id);
      return {
        ...prev,
        tracking: exists
          ? prev.tracking.filter(item => item !== id)
          : [...prev.tracking, id],
      };
    });
  };

  const getStepError = (): string | null => {
    switch (step) {
      case 1:
        return answers.goal == null ? 'Please select a goal to continue.' : null;
      case 2:
        return answers.experience == null
          ? 'Please select your experience level.'
          : null;
      case 3:
        if (!answers.fullName.trim()) {
          return 'Please enter your full name.';
        }
        if (answers.sex == null) {
          return 'Please select your biological sex.';
        }
        if (answers.activity == null) {
          return 'Please select your activity level.';
        }
        return null;
      case 4:
        return answers.frequency == null
          ? 'Please select a dosage frequency.'
          : null;
      case 5:
        return answers.tracking.length === 0
          ? 'Please select at least one tracking priority.'
          : null;
      default:
        return 'Unable to continue.';
    }
  };

  const onBack = () => {
    if (step === 1 || step === 6) {
      navigation.goBack();
      return;
    }
    setStep(prev => (prev - 1) as BuilderStep);
  };

  const onNext = () => {
    const error = getStepError();
    if (error) {
      Alert.alert('Missing information', error);
      return;
    }

    if (step === 5) {
      setStep(6);
      return;
    }

    setStep(prev => (prev + 1) as BuilderStep);
  };

  if (step === 6) {
    return (
      <WrapperScreen backgroundColor={colors.background} safeAreaTop>
        <View style={styles.screen}>
          <BuilderHeader onBack={onBack} />
          <BuildingLoader />
          <View style={styles.buildingCopy}>
            <Text style={styles.buildingTitle}>Building your protocol</Text>
            <Text style={styles.buildingSubtitle}>
              Neuro pep is generating the protocol plan personalized to your
              goals.
            </Text>
          </View>
          <BuildingStatusList
            items={BUILDING_STATUS}
            intervalMs={1500}
            onComplete={finishBuilding}
          />
        </View>
      </WrapperScreen>
    );
  }

  const meta = STEP_META[step];
  const previewMetrics = getDashboardPreviewMetrics(answers.tracking);

  return (
    <WrapperScreen safeAreaTop>
      <View style={[styles.screen, { paddingBottom: insets.bottom }]}>
        <BuilderHeader onBack={onBack} />
        <BuilderProgress current={meta.progress} />
        <BuilderTip message={meta.tip} />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {step === 5 ? (
            <Text style={styles.stepTitle}>
              Tracking priorities
              <Text style={styles.stepTitleHint}> (Select Multiple)</Text>
            </Text>
          ) : (
            <Text style={styles.stepTitle}>{meta.title}</Text>
          )}

          {step === 1 ? (
            <View style={styles.goalGrid}>
              {GOALS.map(goal => (
                <GoalOptionCard
                  key={goal.id}
                  title={goal.title}
                  subtitle={goal.subtitle}
                  icon={goal.icon}
                  selected={answers.goal === goal.id}
                  onPress={() => patch({ goal: goal.id })}
                />
              ))}
            </View>
          ) : null}

          {step === 2 ? (
            <View style={styles.listGap}>
              {EXPERIENCE_OPTIONS.map(item => (
                <ExperienceOptionRow
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  selected={answers.experience === item.id}
                  onPress={() => patch({ experience: item.id })}
                />
              ))}
            </View>
          ) : null}

          {step === 3 ? (
            <View style={styles.form}>
              <FormTextField
                label="Your Full Name"
                value={answers.fullName}
                onChangeText={fullName => patch({ fullName })}
                placeholder="eg: jamesanderson"
                autoCapitalize="words"
                autoCorrect={false}
              />

              <ChoiceField
                label="Your Biological Sex"
                options={SEX_OPTIONS}
                value={answers.sex}
                onChange={sex => patch({ sex })}
              />

              <NumberStepper
                label="Age"
                value={answers.age}
                min={16}
                max={100}
                onChange={age => patch({ age })}
              />
              <NumberStepper
                label="Weight (lbs)"
                value={answers.weightLbs}
                min={80}
                max={400}
                onChange={weightLbs => patch({ weightLbs })}
              />
              <NumberStepper
                label="Height (cm)"
                value={answers.heightCm}
                min={120}
                max={230}
                onChange={heightCm => patch({ heightCm })}
              />

              <ChoiceField
                label="Activity Level"
                options={ACTIVITY_OPTIONS}
                value={answers.activity}
                onChange={activity => patch({ activity })}
              />
            </View>
          ) : null}

          {step === 4 ? (
            <View style={styles.form}>
              <ChoiceField
                label="Select frequency"
                options={FREQUENCY_OPTIONS}
                value={answers.frequency}
                onChange={frequency => patch({ frequency })}
              />

              <ChoiceField
                label="Reminder time"
                options={REMINDER_OPTIONS}
                value={answers.reminderTime}
                onChange={reminderTime => patch({ reminderTime })}
                actionLabel="Set Custom time"
              />

              <View style={styles.previewCard}>
                <Text style={styles.previewTitle}>Schedule preview</Text>
                <View style={styles.scheduleRow}>
                  {SCHEDULE_PREVIEW.map(item => (
                    <View key={item.day} style={styles.scheduleItem}>
                      <Text style={styles.scheduleDay}>{item.day}</Text>
                      <View
                        style={[
                          styles.scheduleDate,
                          item.active && styles.scheduleDateActive,
                        ]}
                      >
                        <Text
                          style={[
                            styles.scheduleDateText,
                            item.active && styles.scheduleDateTextActive,
                          ]}
                        >
                          {item.date}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
                <Text style={styles.reminderSummary}>
                  Reminder time : {answers.reminderTime.replace(' ', '')}
                </Text>
              </View>
            </View>
          ) : null}

          {step === 5 ? (
            <View style={styles.form}>
              <View style={styles.trackingWrap}>
                {TRACKING_OPTIONS.map(option => (
                  <TrackingChip
                    key={option.id}
                    label={option.label}
                    icon={option.icon}
                    selected={answers.tracking.includes(option.id)}
                    onPress={() => toggleTracking(option.id)}
                  />
                ))}
              </View>

              <View style={styles.previewCard}>
                <Text style={styles.previewTitle}>Dashboard Preview</Text>
                <View style={styles.metricsHeader}>
                  <DashboardMetricsIcon
                    width={moderateScale(22)}
                    height={moderateScale(22)}
                  />
                  <Text style={styles.metricsTitle}>Priority Metrices</Text>
                </View>
                <View style={styles.metricsRow}>
                  {previewMetrics.map(metric => (
                    <View key={metric.id} style={styles.metricCard}>
                      <Text style={styles.metricValue}>{metric.previewValue}</Text>
                      <Text style={styles.metricLabel}>{metric.previewLabel}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ) : null}
        </ScrollView>

        <GradientButton label={meta.nextLabel} onPress={onNext} />
      </View>
    </WrapperScreen>
  );
}
