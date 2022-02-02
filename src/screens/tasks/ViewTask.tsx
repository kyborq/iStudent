import {
  CommonActions,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from '../../components/Header';
import { RootStackParamList } from '../../components/navigation/Navigation';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { deleteTask, editTask, TTask } from '../../redux/tasksSlice';
import { Empty } from '../../components/Empty';
import { ModalView } from '../../components/modals/ModalView';
import { getDate } from '../../components/calendar/calendarUtils';
import { TaskFooter } from './components/TaskFooter';
import { TaskInfo } from './components/TaskInfo';
import { CalendarForm } from '../../components/calendar/form/CalendarForm';

export const ViewTask = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<RootStackParamList, 'ViewTask'>>();

  const id = route?.params?.id;
  const { tasks } = useAppSelector((state) => state.tasks);
  const task: TTask = tasks?.filter((t) => t.id === id)[0];

  const handleComplete = () => {
    const newTask: TTask = { ...task, completed: !task.completed };
    dispatch(editTask(newTask));
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    navigation.goBack();
  };

  const handleArchive = () => {
    const newTask: TTask = { ...task, archived: !task.archived };
    dispatch(editTask(newTask));
  };

  const handleEditTask = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'EditTask',
        params: { id: task.id },
      }),
    );
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSetTimer = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Timer',
        params: { id: task.id },
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Header
        label="Просмотр задачи"
        actionIcon={'edit'}
        onAction={(!task.completed && handleEditTask) || undefined}
        onBack={handleBack}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <TaskInfo task={task} />
      </ScrollView>

      {/* <ScrollView contentContainerStyle={styles.content}>
        {!task.deleted ? (
          <TaskInfo
            spended={task.spend}
            estimate={task.estimate}
            label={task.label}
            description={task.description}
            date={!!task.date ? getDate(task.date) : ''}
            status={task.status}
            onShowDateModal={setDateModalVisible}
            onTimer={handleSetTimer}
          />
        ) : (
          <Empty
            text="Эта задача архвивирована. Вы можете вернуть ее или удалить навсегда"
            icon="archive"
            onDelete={handleDeletePermanent}
            onReturn={handleDelete}
          />
        )}
      </ScrollView> */}

      {/* <ModalView
        visible={dateModalVisible}
        onClose={() => setDateModalVisible(!dateModalVisible)}>
        <CalendarForm date={task.date || date} onSelectDate={handleSetDate} />
      </ModalView> */}

      {!task.archived && (
        <TaskFooter
          task={task}
          onDelete={handleDelete}
          onComplete={handleComplete}
          onArchive={handleArchive}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  content: {
    paddingBottom: 24,
    flexGrow: 1,
  },
});
