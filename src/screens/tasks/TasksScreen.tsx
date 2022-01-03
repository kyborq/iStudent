import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from '../../components/Header';
import { Input } from '../../components/inputs/Input';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { completeTask, ETaskSorting, TTask } from '../../redux/tasksSlice';
import { getKeyByValue, sort } from '../../utils';
import { TaskCard } from './components/TaskCard';
import { TaskSortPanel } from './components/TaskSortPanel';

export const TasksScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { tasks, sorting } = useAppSelector((state) => state.tasks);
  const [searchQuery, setSearchQuery] = useState('');

  const [showCompleted, setShowCompleted] = useState(true);
  const [showArchived, setShowArchived] = useState(false);

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

  const handleCompleteTask = (id: string) => {
    dispatch(completeTask(id));
  };

  const sortedList = sort(
    tasks,
    getKeyByValue(ETaskSorting, sorting),
  ) as TTask[];
  const taskList = sortedList.map((task) => {
    if ((!task.deleted || showArchived) && (!task.status || showCompleted))
      return (
        <TaskCard
          key={task.id}
          title={task.label}
          status={task.status}
          onPress={() => handleViewTask(task.id)}
          onComplete={() => handleCompleteTask(task.id)}
        />
      );
  });

  return (
    <View style={styles.container}>
      <Header label="Мои задачи" onAction={handleAddTask} />
      <View style={styles.content}>
        <Input
          icon="search"
          placeholder="Поиск"
          clearInput
          value={searchQuery}
          onChange={setSearchQuery}
          style={{ marginBottom: 16 }}
        />
        <TaskSortPanel
          completed={tasks.filter((t) => t.status).length}
          archived={tasks.filter((t) => t.deleted).length}
          showCompleted={showCompleted}
          showArchived={showArchived}
          onShowArchived={() => setShowArchived(!showArchived)}
          onShowCompleted={() => setShowCompleted(!showCompleted)}
        />

        {taskList}
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
