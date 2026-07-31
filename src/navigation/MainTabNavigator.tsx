import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { BottomTabBar } from '../components/BottomTabBar';
import { HomeScreen } from '../screens/HomeScreen';
import { PlaceholderScreen } from '../screens/PlaceholderScreen';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

function AppTabBar({ state, navigation, insets }: BottomTabBarProps) {
  const activeTab = state.routes[state.index].name as keyof MainTabParamList;

  return (
    <BottomTabBar
      activeTab={activeTab}
      bottomInset={insets.bottom}
      onTabPress={route => {
        const event = navigation.emit({
          type: 'tabPress',
          target: state.routes.find(r => r.name === route)?.key,
          canPreventDefault: true,
        });

        if (!event.defaultPrevented) {
          navigation.navigate(route);
        }
      }}
      onAddPress={() => {
        navigation.getParent()?.navigate('ProtocolBuilder');
      }}
    />
  );
}

const renderTabBar = (props: BottomTabBarProps) => <AppTabBar {...props} />;

function TrackScreen() {
  return <PlaceholderScreen title="Track" />;
}

function LifestyleScreen() {
  return <PlaceholderScreen title="Lifestyle" />;
}

function ProfileScreen() {
  return <PlaceholderScreen title="Profile" />;
}

export function MainTabNavigator() {
  return (
    <Tab.Navigator tabBar={renderTabBar} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Track" component={TrackScreen} />
      <Tab.Screen name="Lifestyle" component={LifestyleScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
