import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavBar } from './NavBar';
import { SubjectsScreen } from '../../screens/SubjectsScreen';
import { TasksScreen } from '../../screens/tasks/TasksScreen';
import { ScheduleScreen } from '../../screens/ScheduleScreen';
import { EditTask } from '../../screens/tasks/EditTask';

export type RootStackParamList = {
  Index: undefined;
  // AddSubjectScreen: undefined;
  // AddTaskScreen: undefined;
  // ViewSubjectScreen: { id: string };
  EditTask: { id: string };
  // ViewTaskScreen: { id: string };
  // EditTaskScreen: { id: string };
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

      {/* <Stack.Screen name="AddSubjectScreen" component={AddSubjectScreen} /> */}
      {/* <Stack.Screen name="ViewSubjectScreen" component={ViewSubjectScreen} /> */}
      {/* <Stack.Screen name="EditSubjectScreen" component={EditSubjectScreen} /> */}

      {/* <Stack.Screen name="AddTask" component={AddTaskScreen} /> */}
      <Stack.Screen name="EditTask" component={EditTask} />
      {/* <Stack.Screen name="ViewTaskScreen" component={ViewTaskScreen} /> */}

      {/* <Stack.Screen name="TimerScreen" component={TimerScreen} /> */}
    </Stack.Navigator>
  );
};
