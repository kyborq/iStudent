import { useAtomValue } from 'jotai';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { authAtom } from '../../atoms/authAtom';
import { GroupScreen } from '../../views/profile/GroupScreen';
import { NewSubjectScreen } from '../../views/profile/NewSubjectScreen';
import { ScannerScreen } from '../../views/profile/ScannerScreen';
import { SettingsScreen } from '../../views/profile/SettingsScreen';
import { SubjectsScreen } from '../../views/profile/SubjectsScreen';
import { NewTaskScreen } from '../../views/tasks/NewTaskScreen';
import { ProtectedScreens } from './ProtectedNavigator';
import { RootScreens } from './RootNavigator';
import { AppParamList } from './types';

const AppStack = createNativeStackNavigator<AppParamList>();

export const AppNavigation = () => {
  const user = useAtomValue(authAtom);

  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <AppStack.Screen name="Protected" component={ProtectedScreens} />
          <AppStack.Group screenOptions={{ presentation: 'modal' }}>
            <AppStack.Screen name="Settings" component={SettingsScreen} />
            <AppStack.Screen name="Scanner" component={ScannerScreen} />
            <AppStack.Screen name="Group" component={GroupScreen} />
            <AppStack.Screen name="Subjects" component={SubjectsScreen} />
            <AppStack.Screen name="NewSubject" component={NewSubjectScreen} />
            <AppStack.Screen name="NewTask" component={NewTaskScreen} />
          </AppStack.Group>
        </>
      ) : (
        <AppStack.Screen name="Root" component={RootScreens} />
      )}
    </AppStack.Navigator>
  );
};
