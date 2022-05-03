import { CommonActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Empty } from '../../components/Empty';
import { FloatingButton } from '../../components/FloatingButton';
import { Header } from '../../components/Header';
import { strings } from '../../localization';
import { useAppSelector } from '../../redux/store';
import { ETaskSorting } from '../../redux/tasksSlice';
import { uuid4 } from '../../utils/uuid4';
import { TaskCard } from './components/TaskCard';
import { TasksPanel } from './components/TasksPanel';
import { sortTasks } from './tasksUtils';

export const TasksScreen = () => {
  const { tasks } = useAppSelector((state) => state.tasks);

  const sortedTasks = sortTasks(tasks, ETaskSorting.title);

  const allTasks = sortedTasks.filter((t) => !t.archived);
  const newTasks = sortedTasks.filter((t) => !t.archived && !t.completed);
  const completedTasks = sortedTasks.filter((t) => !t.archived && t.completed);
  const archived = sortedTasks.filter((t) => t.archived);

  const navigation = useNavigation();

  const handleSearch = () => {
    // ...
  };

  const handleAddTask = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'EditTask',
      }),
    );
  };

  const handleViewTask = (id: string) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'EditTask',
        params: {
          id,
        },
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Header title={strings.tasks} rightIcon="search" onRight={handleSearch} />
      <ScrollView contentContainerStyle={styles.content}>
        <TasksPanel
          all={allTasks.length}
          archived={archived.length}
          completed={completedTasks.length}
          todo={newTasks.length}
          filter="ALL"
        />
        {/* <Empty text="Список пуст" /> */}
        {tasks.map((t) => (
          <TaskCard
            task={t}
            key={uuid4()}
            onPress={() => handleViewTask(t.id)}
          />
        ))}
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
