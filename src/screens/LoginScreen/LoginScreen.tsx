import { Image, Pressable, Text } from 'react-native';
import { ms } from 'react-native-size-matters';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { GoogleIcon } from '../../assets/icons';
import { WrapperScreen } from '../../components/WrapperScreen';
import imagePath from '../../constants/imagePath';
import type { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme';

import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  return (
    <WrapperScreen
      backgroundColor={colors.loginBackground}
      style={styles.screen}
      safeAreaTop
    >
      <Image
        source={imagePath.loginHero}
        style={styles.hero}
        resizeMode="stretch"
        accessibilityLabel="Neuropep app preview"
      />

      <Text style={styles.headline}>
        A smarter way to track peptides, recovery, and performance.
      </Text>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Continue with Google"
        onPress={() => navigation.navigate('Main')}
        style={({ pressed }) => [styles.googleButton, pressed && styles.pressed]}
      >
        <GoogleIcon width={ms(22)} height={ms(22)} />
        <Text style={styles.googleLabel}>Continue with Google</Text>
      </Pressable>

      <Text style={styles.legal}>
        By Continuing, you agree to our{' '}
        <Text style={styles.legalLink}>Terms of Services </Text>
        and <Text style={styles.legalLink}>Privacy Policy</Text>
      </Text>
    </WrapperScreen>
  );
}
