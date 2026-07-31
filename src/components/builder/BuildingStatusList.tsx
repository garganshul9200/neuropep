import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import type { FC } from 'react';
import type { SvgProps } from 'react-native-svg';

import { colors } from '../../theme';

type StatusItem = {
  label: string;
  icon: FC<SvgProps>;
};

type BuildingStatusListProps = {
  items: StatusItem[];
  intervalMs?: number;
  onComplete: () => void;
};

export function BuildingStatusList({
  items,
  intervalMs = 1500,
  onComplete,
}: BuildingStatusListProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (activeIndex >= items.length) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setActiveIndex(current => current + 1);
    }, intervalMs);

    return () => clearTimeout(timer);
  }, [activeIndex, intervalMs, items.length, onComplete]);

  return (
    <View style={styles.list}>
      {items.map((item, index) => {
        const Icon = item.icon;
        const isActive = index === activeIndex;
        const isDone = index < activeIndex;

        return (
          <View
            key={item.label}
            style={[styles.row, isActive && styles.rowActive]}
          >
            {isActive ? (
              <ActivityIndicator
                size="small"
                color={colors.primary}
                style={styles.loader}
              />
            ) : isDone ? (
              <View style={styles.checkWrap}>
                <Text style={styles.check}>✓</Text>
              </View>
            ) : (
              <Icon
                width={moderateScale(22)}
                height={moderateScale(22)}
                opacity={0.45}
              />
            )}
            <Text
              style={[
                styles.label,
                isActive && styles.labelActive,
                !isActive && !isDone && styles.labelPending,
              ]}
            >
              {item.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = ScaledSheet.create({
  list: {
    gap: moderateScale(8),
    marginTop: moderateScale(12),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10),
    minHeight: moderateScale(64),
    paddingHorizontal: moderateScale(16),
    backgroundColor: colors.surfaceSelected,
    borderRadius: moderateScale(12),
    opacity: 0.7,
  },
  rowActive: {
    opacity: 1,
  },
  loader: {
    width: moderateScale(22),
    height: moderateScale(22),
  },
  checkWrap: {
    width: moderateScale(22),
    height: moderateScale(22),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(11),
    backgroundColor: colors.primary,
  },
  check: {
    color: '#FFFFFF',
    fontSize: moderateScale(12),
    fontWeight: '700',
    lineHeight: moderateScale(14),
  },
  label: {
    flex: 1,
    fontSize: moderateScale(14),
    color: colors.textPrimary,
    letterSpacing: -0.238,
  },
  labelActive: {
    fontWeight: '500',
  },
  labelPending: {
    color: colors.textCaption,
  },
});
