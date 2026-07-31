import { Pressable, Text, View } from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import type { FC } from 'react';
import type { SvgProps } from 'react-native-svg';

import {
  TabAddIcon,
  TabHomeIcon,
  TabLifestyleIcon,
  TabProfileIcon,
  TabTrackIcon,
} from '../assets/icons';
import type { MainTabParamList } from '../navigation/types';
import { colors } from '../theme';

export type TabKey = keyof MainTabParamList;

type TabDefinition = {
  key: TabKey;
  label: string;
  icon: FC<SvgProps>;
};

const LEFT_TABS: TabDefinition[] = [
  { key: 'Home', label: 'Home', icon: TabHomeIcon },
  { key: 'Track', label: 'Track', icon: TabTrackIcon },
];

const RIGHT_TABS: TabDefinition[] = [
  { key: 'Lifestyle', label: 'Lifestyle', icon: TabLifestyleIcon },
  { key: 'Profile', label: 'Profile', icon: TabProfileIcon },
];

type TabItemProps = {
  tab: TabDefinition;
  active: boolean;
  onPress?: (key: TabKey) => void;
};

function TabItem({ tab, active, onPress }: TabItemProps) {
  const Icon = tab.icon;

  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      accessibilityLabel={tab.label}
      onPress={() => onPress?.(tab.key)}
      style={styles.tab}
    >
      {active ? <View style={styles.activeIndicator} /> : null}
      <Icon width={moderateScale(24)} height={moderateScale(24)} />
      <Text style={active ? styles.tabLabelActive : styles.tabLabel}>
        {tab.label}
      </Text>
    </Pressable>
  );
}

type BottomTabBarProps = {
  activeTab: TabKey;
  bottomInset?: number;
  onTabPress?: (key: TabKey) => void;
  onAddPress?: () => void;
};

export function BottomTabBar({
  activeTab,
  bottomInset = 0,
  onTabPress,
  onAddPress,
}: BottomTabBarProps) {
  return (
    <View style={[styles.bar, { paddingBottom: bottomInset }]}>
      <View style={styles.row}>
        {LEFT_TABS.map(tab => (
          <TabItem
            key={tab.key}
            tab={tab}
            active={tab.key === activeTab}
            onPress={onTabPress}
          />
        ))}

        <View style={styles.tab}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Add entry"
            onPress={onAddPress}
            style={styles.addButton}
          >
            <TabAddIcon width={moderateScale(24)} height={moderateScale(24)} />
          </Pressable>
        </View>

        {RIGHT_TABS.map(tab => (
          <TabItem
            key={tab.key}
            tab={tab}
            active={tab.key === activeTab}
            onPress={onTabPress}
          />
        ))}
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  bar: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: moderateScale(12),
    borderTopRightRadius: moderateScale(12),
    boxShadow: '0px -2px 8px rgba(99, 99, 99, 0.2)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: moderateScale(12),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: moderateScale(10),
  },
  activeIndicator: {
    position: 'absolute',
    top: moderateScale(-12),
    width: moderateScale(58),
    height: moderateScale(6),
    backgroundColor: colors.primary,
    borderRadius: moderateScale(4),
  },
  tabLabel: {
    fontSize: moderateScale(14),
    fontWeight: '400',
    color: colors.textPrimary,
  },
  tabLabelActive: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: colors.primary,
  },
  addButton: {
    width: moderateScale(50),
    height: moderateScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: colors.primary,
    boxShadow: '0px 2px 4px rgba(99, 99, 99, 0.2)',
  },
});
