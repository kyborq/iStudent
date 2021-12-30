import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Empty } from '../components/Empty';
import { Header } from '../components/Header';
import { Input } from '../components/inputs/Input';

export const TasksScreen = () => {
  const handleAddTask = () => {
    // ...
  };

  return (
    <View style={styles.container}>
      <Header label="Мои задачи" onAction={handleAddTask} />
      <View style={styles.content}>
        <Input placeholder="Поиск" />
        <Empty text="Список пуст" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    flex: 1,
  },
});
