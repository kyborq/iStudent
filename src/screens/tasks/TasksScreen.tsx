import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Empty } from '../../components/Empty';
import { Header } from '../../components/Header';
import { Input } from '../../components/inputs/Input';
import { SortButton } from '../../components/sorting/SortButton';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { ETaskSorting, TTask } from '../../redux/tasksSlice';
import { filterTasks, getKeyByValue, search, sort, uuid4 } from '../../utils';
import { TaskCard } from './components/TaskCard';
import { TasksPanel } from './components/TasksPanel';

export const TasksScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterQuery, setFilterQuery] = useState('ALL');

  const navigation = useNavigation();

  const tasks = useAppSelector((state) =>
    state.tasks.tasks.filter((t) => search(searchQuery, t.title)),
  );
  const filteredTasks = tasks.filter((t) => filterTasks(t, filterQuery));

  const allCount = tasks.filter((t) => !t.archived).length;
  const todoCount = tasks.filter((t) => !t.archived && !t.completed).length;
  const completedCount = tasks.filter((t) => !t.archived && t.completed).length;
  const archivedCount = tasks.filter((t) => t.archived).length;

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

  const taskList = filteredTasks.map((task) => {
    return (
      <TaskCard
        key={uuid4()}
        task={task}
        onPress={() => handleViewTask(task.id)}
      />
    );
  });

  return (
    <View style={styles.container}>
      <Header label="Мои задачи" onAction={handleAddTask} />
      <ScrollView contentContainerStyle={styles.content}>
        <Input
          icon="search"
          placeholder="Поиск"
          clearInput
          value={searchQuery}
          onType={setSearchQuery}
          style={{ marginHorizontal: 24 }}
        />
        <TasksPanel
          all={allCount}
          todo={todoCount}
          completed={completedCount}
          archived={archivedCount}
          filter={filterQuery}
          onSetFilter={setFilterQuery}
        />
        <View
          style={{
            paddingHorizontal: 24,
            flexDirection: 'row',
            marginBottom: 8,
          }}>
          <SortButton />
        </View>

        <View style={{ paddingHorizontal: 24 }}>{taskList}</View>
        {filteredTasks.length === 0 && (
          <Empty
            text={!searchQuery ? 'Задач нет' : 'Ничего не найдено'}
            icon={!searchQuery ? 'check' : 'search'}
          />
        )}
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
    // paddingHorizontal: 24,
    paddingBottom: 24,
    flexGrow: 1,
  },
});
