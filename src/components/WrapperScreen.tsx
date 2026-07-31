import type { ReactNode } from 'react';
import {
  StatusBar,
  View,
  type StatusBarStyle,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../theme';

type WrapperScreenProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  barStyle?: StatusBarStyle;
  safeAreaTop?: boolean;
  safeAreaBottom?: boolean;
};

export function WrapperScreen({
  children,
  style,
  backgroundColor = colors.background,
  barStyle = 'dark-content',
  safeAreaTop = false,
  safeAreaBottom = false,
}: WrapperScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.root,
        { backgroundColor },
        safeAreaTop && { paddingTop: insets.top },
        safeAreaBottom && { paddingBottom: insets.bottom },
        style,
      ]}
    >
      <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
      {children}
    </View>
  );
}

const styles = {
  root: {
    flex: 1,
  },
} as const;
