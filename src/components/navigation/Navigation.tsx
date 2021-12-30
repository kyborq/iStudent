import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavBar } from './NavBar';
import { SubjectsScreen } from '../../screens/SubjectsScreen';
import { TasksScreen } from '../../screens/TasksScreen';
import { ScheduleScreen } from '../../screens/ScheduleScreen';

const Tab = createBottomTabNavigator();

export const TabsNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <NavBar {...props} />}>
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
