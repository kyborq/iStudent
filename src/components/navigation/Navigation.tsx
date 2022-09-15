import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavBar } from './NavBar';
import { strings } from '../../locales';

import { Tasks } from '../../screens/tasks/Tasks';
import { EditTask } from '../../screens/tasks/EditTask';
import { ViewTask } from '../../screens/tasks/ViewTask';

import { Subjects } from '../../screens/subjects/Subjects';
import { EditSubject } from '../../screens/subjects/EditSubject';
import { ViewSubject } from '../../screens/subjects/ViewSubject';

import { Schedule } from '../../screens/schedule/Schedule';
import { EditEvent } from '../../screens/schedule/EditEvent';
import { ViewEvent } from '../../screens/schedule/ViewEvent';

import { Home } from '../../screens/home/Home';
import { Contacts } from '../../screens/contacts/Contacts';

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
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      tabBar={(props) => <NavBar {...props} />}>
      <Tab.Screen
        name="Schedule"
        component={Schedule}
        options={{ title: 'Расписание' }}
      />
      <Tab.Screen
        name="Tasks"
        component={Tasks}
        options={{ title: 'Задачи' }}
      />
      <Tab.Screen name="Home" component={Home} options={{ title: 'Главная' }} />
      <Tab.Screen
        name="Subjects"
        component={Subjects}
        options={{ title: 'Предметы' }}
      />
      <Tab.Screen
        name="Contacts"
        component={Contacts}
        options={{ title: 'Контакты' }}
      />
    </Tab.Navigator>
  );
};

export const Navigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Index'}
      screenOptions={{
        headerShown: false,
      }}>
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
