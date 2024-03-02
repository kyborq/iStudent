import { SafeAreaView, StyleSheet } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Header } from '../../components/Header';
import { AppParamList } from '../../components/navigation/Navigator';

type ScreenProps = NativeStackScreenProps<AppParamList>;

export const SettingsScreen = ({ navigation }: ScreenProps) => {
  return (
    <SafeAreaView style={styles.root}>
      <Header title="Настройки" onBack={() => navigation.pop()} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 20,
    paddingVertical: 32,
    flexGrow: 1,
    gap: 24,
  },
});
