import { View } from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';

import { colors, gradients } from '../../theme';

type BuilderProgressProps = {
  total?: number;
  /** 1-based completed/active count */
  current: number;
};

export function BuilderProgress({ total = 5, current }: BuilderProgressProps) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }, (_, index) => {
        const filled = index < current;
        return (
          <View
            key={index}
            style={[styles.segment, filled ? styles.segmentFilled : styles.segmentIdle]}
          />
        );
      })}
    </View>
  );
}

const styles = ScaledSheet.create({
  row: {
    flexDirection: 'row',
    gap: moderateScale(4),
  },
  segment: {
    flex: 1,
    height: moderateScale(6),
    borderRadius: moderateScale(12),
  },
  segmentFilled: {
    experimental_backgroundImage: gradients.brand,
  },
  segmentIdle: {
    backgroundColor: colors.surfaceMuted,
  },
});
