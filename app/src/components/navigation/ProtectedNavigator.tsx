import { useAtomValue } from 'jotai';
import { useEffect } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useAuth } from '../../api/hooks/useAuth';
import { authAtom } from '../../atoms/authAtom';
import { HomeScreen } from '../../views/HomeScreen';
import { ProfileScreen } from '../../views/profile/ProfileScreen';
import { ScheduleScreen } from '../../views/ScheduleScreen';
import { TasksScreen } from '../../views/tasks/TasksScreen';
import { TabBar } from '../TabBar';
import { AppParamList, ProtectedParamList } from './types';

const Tabs = createBottomTabNavigator<ProtectedParamList>();

export type ProtectedScreenProps = NativeStackScreenProps<AppParamList>;

export const ProtectedScreens = ({ navigation }: ProtectedScreenProps) => {
  useAuth();

  const user = useAtomValue(authAtom);

  useEffect(() => {
    if (!user) {
      navigation.navigate('Root');
    }
  }, [user]);

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
