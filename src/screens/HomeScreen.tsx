import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { ScaledSheet, moderateScale, ms } from 'react-native-size-matters';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  BriefSparkleIcon,
  GoalEnergyIcon,
  GoalFatLossIcon,
  GoalLongevityIcon,
  GoalMuscleIcon,
  GoalRecoveryIcon,
  GoalSleepIcon,
} from '../assets/icons';
import { HomeHeader } from '../components/HomeHeader';
import { InsightNudgeCard } from '../components/InsightNudgeCard';
import { MorningBriefCard } from '../components/MorningBriefCard';
import { PriorityMetricsSection } from '../components/PriorityMetricsSection';
import { ProtocolBuilderPrompt } from '../components/ProtocolBuilderPrompt';
import { QuickLinksModal } from '../components/QuickLinksModal';
import { StackSummaryCard } from '../components/StackSummaryCard';
import {
  TodaysChecklistCard,
  type ChecklistItem,
} from '../components/TodaysChecklistCard';
import { WrapperScreen } from '../components/WrapperScreen';
import type { MainTabParamList, RootStackParamList } from '../navigation/types';
import type { GoalId, ProtocolAnswers } from './ProtocolBuilder/types';
import { colors } from '../theme';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

const GOAL_STACK: Record<
  GoalId,
  { title: string; icon: typeof GoalFatLossIcon }
> = {
  'fat-loss': { title: 'Fat loss stack', icon: GoalFatLossIcon },
  muscle: { title: 'Muscle Growth stack', icon: GoalMuscleIcon },
  recovery: { title: 'Recovery stack', icon: GoalRecoveryIcon },
  sleep: { title: 'Sleep stack', icon: GoalSleepIcon },
  energy: { title: 'Energy & Focus stack', icon: GoalEnergyIcon },
  longevity: { title: 'Longevity stack', icon: GoalLongevityIcon },
};

const DEFAULT_CHECKLIST: ChecklistItem[] = [
  {
    id: 'dose-1',
    name: 'BPC - 124',
    dose: '25mcg',
    timeOfDay: 'Morning',
  },
  {
    id: 'dose-2',
    name: 'BPC - 124',
    dose: '25mcg',
    timeOfDay: 'Evening',
  },
];

const PRIORITY_METRICS = [
  { value: '72lbs', label: 'Weight' },
  { value: '8h', label: 'of Sleep' },
  { value: '78%', label: 'Recovery' },
];

function firstName(fullName: string | undefined) {
  const trimmed = fullName?.trim();
  if (!trimmed) {
    return 'Alex';
  }
  return trimmed.split(/\s+/)[0];
}

function ActiveHome({
  protocol,
  onQuickLink,
}: {
  protocol: ProtocolAnswers;
  onQuickLink: (id: string) => void;
}) {
  const [nudgeVisible, setNudgeVisible] = useState(true);
  const [checklist, setChecklist] = useState(DEFAULT_CHECKLIST);
  const [quickLinksVisible, setQuickLinksVisible] = useState(false);

  const stack = GOAL_STACK[protocol.goal ?? 'fat-loss'];
  const reminderLabel =
    protocol.frequency === 'daily'
      ? 'Morning'
      : protocol.reminderTime.replace(' PM', '');

  const checklistItems = useMemo(
    () =>
      checklist.map((item, index) =>
        index === 0
          ? { ...item, timeOfDay: reminderLabel || item.timeOfDay }
          : item,
      ),
    [checklist, reminderLabel],
  );

  return (
    <>
      <View style={styles.sections}>
        <MorningBriefCard
          briefText="Recovery is up 8% after last night's sleep. Your BPC-157 cycle enters week 3."
          onExpand={() => setQuickLinksVisible(true)}
        />

        {nudgeVisible ? (
          <InsightNudgeCard
            title="You haven't logged weight in 3 days"
            message="Kindly log your weight to maintain your streak."
            onDismiss={() => setNudgeVisible(false)}
          />
        ) : null}

        <StackSummaryCard
          title={stack.title}
          icon={stack.icon}
          stats={[
            { value: '76%', label: 'Adherence' },
            { value: '14', label: 'of 30 days' },
            { value: 'Peak', label: 'Phase' },
          ]}
        />

        <TodaysChecklistCard
          items={checklistItems}
          onMarkDone={id =>
            setChecklist(prev =>
              prev.map(item =>
                item.id === id ? { ...item, done: true } : item,
              ),
            )
          }
        />
        <PriorityMetricsSection metrics={PRIORITY_METRICS} />
      </View>

      <QuickLinksModal
        visible={quickLinksVisible}
        onClose={() => setQuickLinksVisible(false)}
        onSelect={onQuickLink}
      />
    </>
  );
}

export function HomeScreen({ navigation, route }: Props) {
  const protocol = route.params?.protocol;
  const hasProtocol = protocol != null;

  const onQuickLink = (id: string) => {
    if (id === 'add-medication') {
      navigation.navigate('AddMedication');
    }
  };

  return (
    <WrapperScreen backgroundColor={colors.background} safeAreaTop>
      <View style={styles.root}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <HomeHeader
            greeting={`Good Morning ! ${firstName(protocol?.fullName)}`}
            date="Thursday , May 16"
          />

          <View style={styles.body}>
            {hasProtocol ? (
              <ActiveHome protocol={protocol} onQuickLink={onQuickLink} />
            ) : (
              <>
                <MorningBriefCard lockedMessage="Create your peptide protocol to activate this brief" />
                <View style={styles.prompt}>
                  <ProtocolBuilderPrompt
                    title="Built your Peptide Protocol with our Smart protocol builder"
                    description="Set your goal, experience level, frequency preference and let our AI handle your stack"
                    actionLabel="Build your stack"
                    onAction={() => navigation.navigate('ProtocolBuilder')}
                  />
                </View>
              </>
            )}
          </View>
        </ScrollView>

        {hasProtocol ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Tell AI what to do"
            style={styles.aiFab}
            onPress={() => navigation.navigate('AddMedication')}
          >
            <BriefSparkleIcon width={moderateScale(22)} height={moderateScale(22)} />
            <Text style={styles.aiFabLabel}>Tell AI what to do</Text>
          </Pressable>
        ) : null}
      </View>
    </WrapperScreen>
  );
}

const styles = ScaledSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingBottom: moderateScale(80),
    paddingHorizontal: moderateScale(16),
  },
  body: {
    marginTop: moderateScale(18),
  },
  prompt: {
    marginTop: moderateScale(72),
  },
  sections: {
    gap: moderateScale(20),
  },
  aiFab: {
    position: 'absolute',
    right: moderateScale(16),
    bottom: moderateScale(16),
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(6),
    height: moderateScale(50),
    paddingHorizontal: moderateScale(14),
    backgroundColor: colors.surface,
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: colors.primary,
    boxShadow: '0px 2px 8px rgba(99, 99, 99, 0.16)',
  },
  aiFabLabel: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: colors.textPrimary,
  },
});
