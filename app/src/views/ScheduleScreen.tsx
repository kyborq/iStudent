import { SafeAreaView, StyleSheet } from 'react-native';

import { Header } from '../components/Header';

export const ScheduleScreen = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Header title="Расписание" />
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
