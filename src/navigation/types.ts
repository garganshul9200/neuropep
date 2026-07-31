import type { NavigatorScreenParams } from '@react-navigation/native';

import type { MedicationDraft } from '../screens/AddMedication/constants';
import type { ProtocolAnswers } from '../screens/ProtocolBuilder/types';

export type MainTabParamList = {
  Home: { protocol?: ProtocolAnswers } | undefined;
  Track: undefined;
  Lifestyle: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  Main: NavigatorScreenParams<MainTabParamList> | undefined;
  ProtocolBuilder: undefined;
  AddMedication: undefined;
  AddMedicationManual: { medication?: MedicationDraft } | undefined;
};
