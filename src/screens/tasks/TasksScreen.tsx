import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Empty } from '../../components/Empty';
import { Header } from '../../components/Header';
import { Input } from '../../components/inputs/Input';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { ETaskSorting, TTask } from '../../redux/tasksSlice';
import { getKeyByValue, sort, uuid4 } from '../../utils';
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

  const handleCompleteTask = (id: string, value: boolean) => {
    // dispatch(completeTask({ id, value }));
  };

  const sortedList = sort(
    tasks,
    getKeyByValue(ETaskSorting, sorting.sorting),
    sorting.direction === 1 ? true : false,
  ) as TTask[];
  const taskList = sortedList.map((task) => {
    if (task.title.toLowerCase().includes(searchQuery.toLowerCase()))
      return (
        <TaskCard
          key={uuid4()}
          task={task}
          onPress={() => handleViewTask(task.id)}
          onComplete={() => handleCompleteTask(task.id, !task.completed)}
        />
      );
  });

  // const tasksCount = tasks.filter(
  //   (t) =>
  //     t.label.toLowerCase().includes(searchQuery.toLowerCase()) &&
  //     (!t.deleted || showArchived) &&
  //     (!t.status || showCompleted),
  // ).length;

  return (
    <View style={styles.container}>
      <Header label="Мои задачи" onAction={handleAddTask} />
      <ScrollView contentContainerStyle={styles.content}>
        <Input
          icon="search"
          placeholder="Поиск"
          clearInput
          value={searchQuery}
          onChange={setSearchQuery}
          style={{ marginBottom: 16 }}
        />
        <View style={{ backgroundColor: '#fff' }}>
          {/* <TaskSortPanel
            completed={tasks.filter((t) => t.status && !t.deleted).length}
            archived={tasks.filter((t) => t.deleted && !t.status).length}
            showCompleted={showCompleted}
            showArchived={showArchived}
            onShowArchived={() => setShowArchived(!showArchived)}
            onShowCompleted={() => setShowCompleted(!showCompleted)}
          /> */}
        </View>
        {taskList}
        {/* {tasksCount === 0 && (
          <Empty text="Список задач пуст" icon="checkLine" />
        )} */}
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
