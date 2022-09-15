import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavBar } from './NavBar';

import { SubjectsScreen } from '../../screens/subjects/SubjectsScreen';
import { TasksScreen } from '../../screens/tasks/TasksScreen';
import { ScheduleScreen } from '../../screens/schedule/ScheduleScreen';
import { EditTask } from '../../screens/tasks/EditTask';
import { ViewTask } from '../../screens/tasks/ViewTask';
import { EditSubject } from '../../screens/subjects/EditSubject';
import { ViewSubject } from '../../screens/subjects/ViewSubject';
import { EditEvent } from '../../screens/schedule/EditEvent';
import { ViewEvent } from '../../screens/schedule/ViewEvent';
import { HomeScreen } from '../../screens/home/HomeScreen';
import { strings } from '../../locales';
import { useAppSelector } from '../../redux/store';
import { WelcomeScreen } from '../../screens/WelcomeScreen';

export type RootStackParamList = {
  Index: undefined;
  Welcome: undefined;
  EditTask: { id: string; subject?: string };
  EditSubject: { id: string };
  EditEvent: { id: string; date?: number };
  ViewTask: { id: string };
  ViewSubject: { id: string };
  ViewEvent: { id: string };
  Timer: { id: string };
  Settings: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

export const TabsNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      tabBar={(props) => <NavBar {...props} />}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: strings.home }}
      />
      <Tab.Screen
        name="SubjectsScreen"
        component={SubjectsScreen}
        options={{ title: strings.subjects }}
      />
      <Tab.Screen
        name="TasksScreen"
        component={TasksScreen}
        options={{ title: strings.tasks }}
      />
      <Tab.Screen
        name="ScheduleScreen"
        component={ScheduleScreen}
        options={{ title: strings.schedule }}
      />
    </Tab.Navigator>
  );
};

export const Navigation = () => {
  const { welcome } = useAppSelector((state) => state.common);

  return (
    <Stack.Navigator
      initialRouteName={welcome ? 'Welcome' : 'Index'}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Index" component={TabsNavigation} />

      <Stack.Screen name="ViewSubject" component={ViewSubject} />
      <Stack.Screen name="ViewEvent" component={ViewEvent} />

      <Stack.Screen name="EditEvent" component={EditEvent} />
      <Stack.Screen name="EditSubject" component={EditSubject} />

      <Stack.Screen name="EditTask" component={EditTask} />
      <Stack.Screen name="ViewTask" component={ViewTask} />
    </Stack.Navigator>
  );
};
