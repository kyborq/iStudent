import { SafeAreaView, StyleSheet } from 'react-native';

import { Header } from '../components/Header';

export const TasksScreen = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Header title="Задачи" />
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
