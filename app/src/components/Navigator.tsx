import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '../views/HomeScreen';
import { OnboardingScreen } from '../views/OnboardingScreen';
import { ProfileScreen } from '../views/ProfileScreen';
import { ScheduleScreen } from '../views/ScheduleScreen';
import { TasksScreen } from '../views/TasksScreen';
import { TabBar } from './TabBar';
import { RegisterStudentScreen } from '../views/register/RegisterStudentScreen';
import { RegisterGroupScreen } from '../views/register/RegisterGroupScreen';
import { RegisterPrefectScreen } from '../views/register/RegisterPrefectScreen';
import { RegisterCredentialsScreen } from '../views/register/RegisterCredentialsScreen';
import { LoginScreen } from '../views/login/LoginScreen';
import { useAuth } from '../api/hooks/useAuth';
import { useEffect } from 'react';

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
};

const AppStack = createNativeStackNavigator<AppParamList>();
const RootStack = createNativeStackNavigator<RootParamList>();
const Tabs = createBottomTabNavigator<ProtectedParamList>();

const ProtectedScreens = () => {
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

const RootScreens = () => {
  const user = useAuth();

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
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AppStack.Screen name="Root" component={RootScreens} />
      <AppStack.Screen name="Protected" component={ProtectedScreens} />
    </AppStack.Navigator>
  );
};
