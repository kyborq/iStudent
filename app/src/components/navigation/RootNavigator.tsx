import { useAtomValue } from 'jotai';
import { useEffect } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../../api/hooks/useAuth';
import { authAtom } from '../../atoms/authAtom';
import { LoginScreen } from '../../views/login/LoginScreen';
import { OnboardingScreen } from '../../views/OnboardingScreen';
import { RegisterCredentialsScreen } from '../../views/register/RegisterCredentialsScreen';
import { RegisterGroupScreen } from '../../views/register/RegisterGroupScreen';
import { RegisterPrefectScreen } from '../../views/register/RegisterPrefectScreen';
import { RegisterStudentScreen } from '../../views/register/RegisterStudentScreen';
import { RootParamList, ScreenProps } from './types';

const RootStack = createNativeStackNavigator<RootParamList>();

export const RootScreens = ({ navigation }: ScreenProps) => {
  useAuth();

  const user = useAtomValue(authAtom);

  useEffect(() => {
    if (user) {
      navigation.navigate('Protected');
    }
  }, [user]);

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
