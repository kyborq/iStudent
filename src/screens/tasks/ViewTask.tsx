import {
  CommonActions,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from '../../components/Header';
import { RootStackParamList } from '../../components/navigation/Navigation';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { deleteTask, editTask, sortTasks, TTask } from '../../redux/tasksSlice';
import { Empty } from '../../components/Empty';
import { TaskFooter } from './components/TaskFooter';
import { TaskInfo } from './components/TaskInfo';

export const ViewTask = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<RootStackParamList, 'ViewTask'>>();

  const id = route?.params?.id;
  const { tasks } = useAppSelector((state) => state.tasks);
  const task: TTask = tasks?.filter((t) => t.id === id)[0];
  const subject = useAppSelector((state) =>
    state.subjects.subjects.find((s) => s.id === task.subject),
  );

  const handleComplete = () => {
    const newTask: TTask = { ...task, completed: !task.completed };
    dispatch(editTask(newTask));
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    handleBack();
  };

  const handleArchive = () => {
    const newTask: TTask = { ...task, archived: !task.archived };
    dispatch(editTask(newTask));
    !task.archived && handleBack();
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

  const handleShowSubject = (id: string) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'ViewSubject',
        params: { id: id },
      }),
    );
  };

  const handleSetTimer = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Timer',
        params: { id: task.id },
      }),
    );
  };

  const handleSetDeadline = (date: string) => {
    const newTask: TTask = { ...task, deadline: date };
    dispatch(editTask(newTask));
  };

  return (
    <View style={styles.container}>
      <Header
        label="Просмотр задачи"
        actionIcon="edit"
        onAction={(!task.completed && handleEditTask) || undefined}
        onBack={handleBack}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {!task.archived ? (
          <TaskInfo
            task={task}
            subject={subject}
            onShowSubject={handleShowSubject}
            onSetTimer={handleSetTimer}
            onSetDeadline={handleSetDeadline}
          />
        ) : (
          <Empty
            text="Эта задача архвивирована. Вы можете вернуть ее или удалить навсегда"
            icon="archive"
            onDelete={handleDelete}
            onReturn={handleArchive}
          />
        )}
      </ScrollView>

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
