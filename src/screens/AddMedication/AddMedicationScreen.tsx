import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  ArrowUpIcon,
  DashboardMetricsIcon,
  QuickAddScheduleIcon,
  SparkleLargeIcon,
  UpChevronIcon,
} from '../../assets/icons';
import { BuilderHeader } from '../../components/builder/BuilderHeader';
import { BuilderTip } from '../../components/builder/BuilderTip';
import { GradientButton } from '../../components/GradientButton';
import { WrapperScreen } from '../../components/WrapperScreen';
import type { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme';

import {
  AI_PLACEHOLDER,
  AI_SUCCESS,
  AI_SUGGESTIONS,
  AI_WELCOME,
  DEFAULT_MEDICATION,
  PARSED_METRICS,
} from './constants';
import { NextActionCard, ParsedMedicationCard } from './ParsedResult';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'AddMedication'>;

type ChatMessage = {
  id: string;
  role: 'ai' | 'user';
  text: string;
};

export function AddMedicationScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const [input, setInput] = useState('');
  const [parsing, setParsing] = useState(false);
  const [parsed, setParsed] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'welcome', role: 'ai', text: AI_WELCOME },
  ]);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages, parsing, parsed]);

  const openManual = () => {
    navigation.navigate('AddMedicationManual', {
      medication: {
        ...DEFAULT_MEDICATION,
        name: 'BPC',
        doseAmount: '5',
        bacWater: '5',
        concentration: '2.5',
        unitPerDose: '10',
        totalDoses: '20',
        syringeType: 'U 100',
      },
    });
  };

  const sendMessage = (raw: string) => {
    const text = raw.trim();
    if (!text || parsing) {
      return;
    }

    setParsed(false);
    setMessages(prev => [
      ...prev,
      { id: `user-${Date.now()}`, role: 'user', text },
    ]);
    setInput('');
    setParsing(true);

    setTimeout(() => {
      setParsing(false);
      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: 'ai',
          text: AI_SUCCESS,
        },
      ]);
      setParsed(true);
    }, 1600);
  };

  return (
    <WrapperScreen backgroundColor={colors.background} safeAreaTop>
      <KeyboardAvoidingView
        style={[
          styles.screen,
          { paddingBottom: insets.bottom || moderateScale(8) },
        ]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <BuilderHeader
          title="Add Medication"
          onBack={() => navigation.goBack()}
          containerStyle={{marginHorizontal: moderateScale(16)}}
        />

        <ScrollView
          ref={scrollRef}
          style={styles.chat}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map(message => (
            <BuilderTip
              key={message.id}
              message={message.text}
              inverted={message.role !== 'ai'}
            />
          ))}

          {parsing ? (
            <View style={styles.parsingRow}>
              <Text style={styles.parsingText}>Parsing your request</Text>
              <ActivityIndicator size="small" color={colors.primaryAccent} />
            </View>
          ) : null}

          {parsed ? (
            <>
              <ParsedMedicationCard metrics={[...PARSED_METRICS]} />

              <View style={styles.nextSection}>
                <Text style={styles.nextTitle}>What do you want me do next</Text>
                <View style={styles.nextActions}>
                  <NextActionCard
                    label="Create a schedule"
                    icon={QuickAddScheduleIcon}
                    onPress={() => {}}
                  />
                  <NextActionCard
                    label="Save & go to preview"
                    icon={DashboardMetricsIcon}
                  />
                </View>
              </View>
            </>
          ) : null}
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.composerHeader}>
            <SparkleLargeIcon
              width={moderateScale(22)}
              height={moderateScale(22)}
            />
            <Text style={styles.composerTitle}>Tell AI what to do</Text>
            <View style={styles.chevron}>
              <UpChevronIcon
                width={moderateScale(18)}
                height={moderateScale(18)}
              />
            </View>
          </View>

          <View>
            <View style={styles.inputWrap}>
              <TextInput
                value={input}
                onChangeText={setInput}
                placeholder={AI_PLACEHOLDER}
                placeholderTextColor={colors.textMuted}
                multiline
                style={styles.input}
              />
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Send"
              style={styles.sendButton}
              onPress={() => sendMessage(input)}
            >
              <ArrowUpIcon
                width={moderateScale(24)}
                height={moderateScale(24)}
                color={colors.surface}
              />
            </Pressable>
          </View>

          <View style={styles.chips}>
            {AI_SUGGESTIONS.map((label, index) => (
              <Pressable
                key={`${label}-${index}`}
                accessibilityRole="button"
                style={styles.chip}
                onPress={() => sendMessage(label)}
              >
                <Text style={styles.chipLabel} numberOfLines={1}>
                  {label}
                </Text>
              </Pressable>
            ))}
          </View>
          <GradientButton
          label="Add medication manually"
          onPress={openManual}
        />
        </View>

        
      </KeyboardAvoidingView>
    </WrapperScreen>
  );
}
