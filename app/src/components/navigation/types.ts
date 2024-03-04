import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type ScreenProps = NativeStackScreenProps<AppParamList>;

export type ProtectedParamList = {
  Home: undefined;
  Tasks: undefined;
  Schedule: undefined;
  Profile: undefined;
};

export type RootParamList = {
  Onboarding: undefined;
  RegisterStudent: {
    group: string;
    groupId: string;
    author: string;
  };
  RegisterCredentials: {
    group: string;
    groupId: string;
    name: string;
  };
  RegisterGroup: undefined;
  RegisterPrefect: {
    group: string;
  };
  Login: undefined;
};

export type AppParamList = {
  Root: NavigatorScreenParams<RootParamList> | undefined;
  Protected: NavigatorScreenParams<ProtectedParamList> | undefined;
  Settings: undefined;
  Scanner: undefined;
  Group: undefined;
  Subjects: undefined;
  NewSubject: undefined;
  NewTask: undefined;
};
