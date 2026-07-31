import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from '../screens/LoginScreen/LoginScreen';
import { AddMedicationManualScreen } from '../screens/AddMedication/AddMedicationManualScreen';
import { AddMedicationScreen } from '../screens/AddMedication/AddMedicationScreen';
import { ProtocolBuilderScreen } from '../screens/ProtocolBuilder/ProtocolBuilderScreen';
import { MainTabNavigator } from './MainTabNavigator';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false, animation: 'fade' }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen name="ProtocolBuilder" component={ProtocolBuilderScreen} />
        <Stack.Screen name="AddMedication" component={AddMedicationScreen} />
        <Stack.Screen
          name="AddMedicationManual"
          component={AddMedicationManualScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
