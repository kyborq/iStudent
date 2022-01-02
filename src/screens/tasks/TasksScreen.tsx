import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from '../../components/Header';
import { Input } from '../../components/inputs/Input';
import { SortPanel } from '../../components/sorting/SortPanel';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { completeTask, TTask } from '../../redux/tasksSlice';

export const TasksScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const tasks: TTask[] = useAppSelector((state) => state.tasks.tasks);
  const [searchQuery, setSearchQuery] = useState('');

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
        <SortPanel />
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
