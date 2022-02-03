import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Empty } from '../../components/Empty';
import { Header } from '../../components/Header';
import { Input } from '../../components/inputs/Input';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { editTask, ETaskSorting, TTask } from '../../redux/tasksSlice';
import { getKeyByValue, sort, uuid4 } from '../../utils';
import { TaskCard } from './components/TaskCard';
import { TaskSortPanel } from './components/TaskSortPanel';

export const TasksScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const { tasks, sorting } = useAppSelector((state) => state.tasks);

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
        name: 'ViewTask',
        params: { id },
      }),
    );
  };

  // const handleCompleteTask = (task: TTask) => {
  //   const newTask: TTask = {
  //     ...task,
  //     completed: !task.completed,
  //   };
  //   dispatch(editTask(newTask));
  // };

  const sortedList = sort(
    tasks,
    getKeyByValue(ETaskSorting, sorting.sorting),
    sorting.direction === 1 ? true : false,
  ) as TTask[];

  const taskCount = sortedList.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) && !t.completed,
  ).length;

  const taskList = sortedList.map((task, i) => {
    if (
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !task.completed
    )
      return (
        <TaskCard
          key={uuid4()}
          task={task}
          onPress={() => handleViewTask(task.id)}
          last={i === taskCount}
        />
      );
  });

  const completedCount = sortedList.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) && t.completed,
  ).length;

  const completedTasks = sortedList.map((task, i) => {
    if (
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      task.completed
    )
      return (
        <TaskCard
          key={uuid4()}
          task={task}
          onPress={() => handleViewTask(task.id)}
          last={i === completedCount - 1}
        />
      );
  });

  return (
    <View style={styles.container}>
      <Header label="Мои задачи" onAction={handleAddTask} />
      <ScrollView
        contentContainerStyle={styles.content}
        stickyHeaderIndices={[1, 3]}>
        <Input
          icon="search"
          placeholder="Поиск"
          clearInput
          value={searchQuery}
          onChange={setSearchQuery}
          style={{ marginBottom: 24 }}
        />
        {taskCount > 0 && (
          <View
            style={{
              paddingBottom: 8,
              marginBottom: 8,
              backgroundColor: '#FFF',
            }}>
            <Text
              style={{ fontSize: 16, color: '#c7c7c7', fontWeight: 'bold' }}>
              {`Задачи (${taskCount})`}
            </Text>
          </View>
        )}
        {taskList}
        {completedCount > 0 && (
          <View style={{ marginVertical: 16, backgroundColor: '#FFF' }}>
            <Text
              style={{ fontSize: 16, color: '#c7c7c7', fontWeight: 'bold' }}>
              {`Завершенные (${completedCount})`}
            </Text>
          </View>
        )}
        {completedTasks}
      </ScrollView>
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
    paddingBottom: 24,
    flexGrow: 1,
  },
});
