import { Pressable, Text, View } from 'react-native';
import { ScaledSheet, moderateScale, ms } from 'react-native-size-matters';
import type { FC } from 'react';
import type { SvgProps } from 'react-native-svg';

import { AlarmIcon, BulbIcon } from '../assets/icons';
import { colors } from '../theme';

type HeaderActionProps = {
  icon: FC<SvgProps>;
  size: number;
  label: string;
  highlighted?: boolean;
  onPress?: () => void;
};

function HeaderAction({
  icon: Icon,
  size,
  label,
  highlighted = false,
  onPress,
}: HeaderActionProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={[styles.action, highlighted && styles.actionHighlighted]}
    >
      <Icon width={size} height={size} />
    </Pressable>
  );
}

type HomeHeaderProps = {
  greeting: string;
  date: string;
  onInsightsPress?: () => void;
  onRemindersPress?: () => void;
};

export function HomeHeader({
  greeting,
  date,
  onInsightsPress,
  onRemindersPress,
}: HomeHeaderProps) {
  return (
    <View>
      <View style={styles.topRow}>
        <Text style={styles.wordmark}>Neuropep</Text>
        <View style={styles.actions}>
          <HeaderAction
            icon={BulbIcon}
            size={ms(20)}
            label="Insights"
            highlighted
            onPress={onInsightsPress}
          />
          <HeaderAction
            icon={AlarmIcon}
            size={ms(22)}
            label="Reminders"
            onPress={onRemindersPress}
          />
        </View>
      </View>

      <View style={styles.greetingBlock}>
        <Text style={styles.greeting}>{greeting}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wordmark: {
    fontSize: moderateScale(18),
    lineHeight: moderateScale(27),
    fontWeight: '700',
    color: colors.primary,
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(14),
  },
  action: {
    width: moderateScale(40),
    height: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionHighlighted: {
    borderColor: colors.primaryAccent,
  },
  greetingBlock: {
    marginTop: moderateScale(12),
    gap: moderateScale(4),
  },
  greeting: {
    fontSize: moderateScale(20),
    lineHeight: moderateScale(27),
    fontWeight: '600',
    color: colors.textPrimary,
  },
  date: {
    fontSize: moderateScale(15),
    lineHeight: moderateScale(20),
    fontWeight: '400',
    color: colors.textMuted,
  },
});
