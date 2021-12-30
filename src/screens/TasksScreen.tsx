import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Empty } from '../components/Empty';
import { Header } from '../components/Header';

export const TasksScreen = () => {
  const handleAddTask = () => {
    // ...
  };

  return (
    <View style={styles.container}>
      <Header label="Мои задачи" onAction={handleAddTask} />
      <Empty text="Список пуст" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
});
