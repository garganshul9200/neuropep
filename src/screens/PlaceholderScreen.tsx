import { Text } from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';

import { WrapperScreen } from '../components/WrapperScreen';
import { colors } from '../theme';

type PlaceholderScreenProps = {
  title: string;
};

export function PlaceholderScreen({ title }: PlaceholderScreenProps) {
  return (
    <WrapperScreen backgroundColor={colors.background} safeAreaTop>
      <Text style={styles.title}>{title}</Text>
    </WrapperScreen>
  );
}

const styles = ScaledSheet.create({
  title: {
    marginTop: moderateScale(24),
    marginHorizontal: moderateScale(16),
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: colors.textPrimary,
  },
});
