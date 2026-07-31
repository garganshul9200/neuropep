import { useEffect, useRef } from 'react';
import { Animated, Easing, View } from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';

import { BuildingSparkleIcon } from '../../assets/icons';
import { colors } from '../../theme';

export function BuildingLoader() {
  const pulse = useRef(new Animated.Value(0)).current;
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1100,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 1100,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    const spinLoop = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    pulseLoop.start();
    spinLoop.start();

    return () => {
      pulseLoop.stop();
      spinLoop.stop();
    };
  }, [pulse, spin]);

  const outerScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.08],
  });
  const middleScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.05],
  });
  const outerOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 0.7],
  });
  const middleOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.55, 0.85],
  });
  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.hero} accessibilityRole="progressbar" accessibilityLabel="Building protocol">
      <Animated.View
        style={[
          styles.ringOuter,
          { opacity: outerOpacity, transform: [{ scale: outerScale }] },
        ]}
      />
      <Animated.View
        style={[
          styles.ringMiddle,
          { opacity: middleOpacity, transform: [{ scale: middleScale }] },
        ]}
      />
      <View style={styles.ringInner}>
          <BuildingSparkleIcon
            width={moderateScale(60)}
            height={moderateScale(60)}
          />
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  hero: {
    alignSelf: 'center',
    width: moderateScale(237),
    height: moderateScale(237),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(20),
  },
  ringOuter: {
    position: 'absolute',
    width: moderateScale(237),
    height: moderateScale(237),
    borderRadius: moderateScale(118.5),
    backgroundColor: colors.surfaceSelected,
  },
  ringMiddle: {
    position: 'absolute',
    width: moderateScale(189),
    height: moderateScale(189),
    borderRadius: moderateScale(94.5),
    backgroundColor: colors.surfaceSelected,
  },
  ringInner: {
    width: moderateScale(136),
    height: moderateScale(136),
    borderRadius: moderateScale(68),
    backgroundColor: colors.surfaceSelected,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
