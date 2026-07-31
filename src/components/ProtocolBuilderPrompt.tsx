import { Text, View } from 'react-native';
import { ScaledSheet, moderateScale, ms } from 'react-native-size-matters';

import { PlusIcon, SparkleLargeIcon } from '../assets/icons';
import { colors } from '../theme';
import { GradientButton } from './GradientButton';

type ProtocolBuilderPromptProps = {
  title: string;
  description: string;
  actionLabel: string;
  onAction?: () => void;
};

export function ProtocolBuilderPrompt({
  title,
  description,
  actionLabel,
  onAction,
}: ProtocolBuilderPromptProps) {
  return (
    <View style={styles.container}>
      <SparkleLargeIcon width={moderateScale(60)} height={moderateScale(60)} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.action}>
        <GradientButton
          label={actionLabel}
          icon={PlusIcon}
          onPress={onAction}
        />
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    marginTop: moderateScale(14),
    maxWidth: '92%',
    fontSize: moderateScale(16),
    lineHeight: moderateScale(24),
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  description: {
    marginTop: moderateScale(7),
    maxWidth: '92%',
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
    fontWeight: '400',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  action: {
    marginTop: moderateScale(22),
    alignSelf: 'stretch',
  },
});
