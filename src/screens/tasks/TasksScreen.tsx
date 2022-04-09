import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Empty } from '../../components/Empty';
import { FloatingButton } from '../../components/FloatingButton';
import { Header } from '../../components/Header';

export const TasksScreen = () => {
  const handleSearch = () => {
    // ...
  };

  const handleAddTask = () => {
    // ...
  };

  return (
    <View style={styles.container}>
      <Header title="Мои задачи" rightIcon="search" onRight={handleSearch} />
      <ScrollView contentContainerStyle={styles.content}>
        <Empty text="Список пуст" />
      </ScrollView>
      <FloatingButton icon="add" onPress={handleAddTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    flexGrow: 1,
  },
});
