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

export type RootStackParamList = {
  Index: undefined;
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
        options={{ title: 'Главная' }}
      />
      <Tab.Screen
        name="SubjectsScreen"
        component={SubjectsScreen}
        options={{ title: 'Предметы' }}
      />
      <Tab.Screen
        name="TasksScreen"
        component={TasksScreen}
        options={{ title: 'Задачи' }}
      />
      <Tab.Screen
        name="ScheduleScreen"
        component={ScheduleScreen}
        options={{ title: 'Расписание' }}
      />
    </Tab.Navigator>
  );
};

export const Navigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Index"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Index" component={TabsNavigation} />

      <Stack.Screen name="ViewSubject" component={ViewSubject} />
      <Stack.Screen name="EditEvent" component={EditEvent} />
      <Stack.Screen name="EditSubject" component={EditSubject} />

      {/* 
      <Stack.Screen name="EditTask" component={EditTask} />
      <Stack.Screen name="ViewTask" component={ViewTask} />
      <Stack.Screen name="ViewEvent" component={ViewEvent} />
      
      <Stack.Screen name="Timer" component={TimerScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} /> */}
    </Stack.Navigator>
  );
};
