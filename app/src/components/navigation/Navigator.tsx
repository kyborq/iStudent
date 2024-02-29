import { useAtomValue } from 'jotai';
import { useEffect } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { useAuth } from '../../api/hooks/useAuth';
import { authAtom } from '../../atoms/authAtom';
import { HomeScreen } from '../../views/HomeScreen';
import { LoginScreen } from '../../views/login/LoginScreen';
import { OnboardingScreen } from '../../views/OnboardingScreen';
import { ProfileScreen } from '../../views/profile/ProfileScreen';
import { ScannerScreen } from '../../views/profile/ScannerScreen';
import { SettingsScreen } from '../../views/profile/SettingsScreen';
import { RegisterCredentialsScreen } from '../../views/register/RegisterCredentialsScreen';
import { RegisterGroupScreen } from '../../views/register/RegisterGroupScreen';
import { RegisterPrefectScreen } from '../../views/register/RegisterPrefectScreen';
import { RegisterStudentScreen } from '../../views/register/RegisterStudentScreen';
import { ScheduleScreen } from '../../views/ScheduleScreen';
import { TasksScreen } from '../../views/TasksScreen';
import { TabBar } from '../TabBar';

export type RootParamList = {
  Onboarding: undefined;
  RegisterStudent: {
    group: string;
    author: string;
  };
  RegisterCredentials: {
    group: string;
    name: string;
  };
  RegisterGroup: undefined;
  RegisterPrefect: {
    group: string;
  };
  Login: undefined;
};

export type ProtectedParamList = {
  Home: undefined;
  Tasks: undefined;
  Schedule: undefined;
  Profile: undefined;
};

export type AppParamList = {
  Root: NavigatorScreenParams<RootParamList> | undefined;
  Protected: NavigatorScreenParams<ProtectedParamList> | undefined;
  Settings: undefined;
  Scanner: undefined;
};

const AppStack = createNativeStackNavigator<AppParamList>();
const RootStack = createNativeStackNavigator<RootParamList>();
const Tabs = createBottomTabNavigator<ProtectedParamList>();

type ScreenProps = NativeStackScreenProps<AppParamList>;

const ProtectedScreens = ({ navigation }: ScreenProps) => {
  useAuth();

  const { isAuth } = useAtomValue(authAtom);

  useEffect(() => {
    if (!isAuth) {
      navigation.navigate('Root');
    }
  }, [isAuth]);

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <TabBar {...props} />}>
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Schedule" component={ScheduleScreen} />
      <Tabs.Screen name="Tasks" component={TasksScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
};

const RootScreens = ({ navigation }: ScreenProps) => {
  useAuth();

  const { isAuth } = useAtomValue(authAtom);

  useEffect(() => {
    if (isAuth) {
      navigation.navigate('Protected');
    }
  }, [isAuth]);

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen name="Onboarding" component={OnboardingScreen} />

      <RootStack.Screen
        name="RegisterStudent"
        component={RegisterStudentScreen}
      />
      <RootStack.Screen
        name="RegisterCredentials"
        component={RegisterCredentialsScreen}
      />
      <RootStack.Screen name="RegisterGroup" component={RegisterGroupScreen} />
      <RootStack.Screen
        name="RegisterPrefect"
        component={RegisterPrefectScreen}
      />
      <RootStack.Screen name="Login" component={LoginScreen} />
    </RootStack.Navigator>
  );
};

export const AppNavigation = () => {
  const { isAuth } = useAtomValue(authAtom);

  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      {isAuth ? (
        <>
          <AppStack.Screen name="Protected" component={ProtectedScreens} />
          <AppStack.Group screenOptions={{ presentation: 'modal' }}>
            <AppStack.Screen name="Settings" component={SettingsScreen} />
            <AppStack.Screen name="Scanner" component={ScannerScreen} />
          </AppStack.Group>
        </>
      ) : (
        <AppStack.Screen name="Root" component={RootScreens} />
      )}
    </AppStack.Navigator>
  );
};
