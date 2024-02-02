import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '../views/HomeScreen';
import { OnboardingScreen } from '../views/OnboardingScreen';
import { ProfileScreen } from '../views/ProfileScreen';
import { ScheduleScreen } from '../views/ScheduleScreen';
import { TasksScreen } from '../views/TasksScreen';
import { TabBar } from './TabBar';
import { RegisterScreen } from '../views/RegisterScreen';
import { CreateGroupScreen } from '../views/CreateGroupScreen';

export type RootParamList = {
  Onboarding: undefined;
  Register: {
    group: string;
    author: string;
  };
  CreateGroup: undefined;
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
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen name="Onboarding" component={OnboardingScreen} />
      <RootStack.Screen name="Register" component={RegisterScreen} />
      <RootStack.Screen name="CreateGroup" component={CreateGroupScreen} />
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
