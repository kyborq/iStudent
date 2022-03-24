import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Empty } from '../../components/Empty';
import { Header } from '../../components/Header';
import { Input } from '../../components/inputs/Input';
import { SortButton } from '../../components/sorting/SortButton';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { changeTaskSorting, ETaskSorting, TTask } from '../../redux/tasksSlice';
import { filterTasks, getKeyByValue, search, sort, uuid4 } from '../../utils';
import { TaskCard } from './components/TaskCard';
import { TasksPanel } from './components/TasksPanel';
import { sortTasks } from './tasksUtils';

export const TasksScreen = () => {
  const handleSearch = () => {
    // ...
  };

  return (
    <View style={styles.container}>
      <Header title="Список задач" rightIcon="search" onRight={handleSearch} />
      <ScrollView contentContainerStyle={styles.content}></ScrollView>
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
