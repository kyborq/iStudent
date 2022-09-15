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
import { deleteTask, editTask, TTask } from '../../redux/tasksSlice';
import { Empty } from '../../components/Empty';
import { TaskFooter } from './components/TaskFooter';
import { TaskInfo } from './components/TaskInfo';
import { FloatingButton } from '../../components/FloatingButton';
import { COLORS } from '../../colors';
import { strings } from '../../locales';

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
      <Header leftIcon="back" onLeft={handleBack} />

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
          <Empty text={strings.archivedTask} />
        )}
      </ScrollView>

      {(!task.archived && (
        <View>
          <FloatingButton icon="edit" onPress={handleEditTask} />
          <FloatingButton
            icon="trash"
            style={{ left: 64 }}
            background={COLORS.redF26969}
            onPress={handleDelete}
          />
          <FloatingButton
            icon="archive"
            style={{ left: 0 }}
            background={COLORS.mediumF2BB69}
            onPress={handleArchive}
          />
        </View>
      )) || (
        <View>
          <FloatingButton
            icon="back"
            style={{ left: 0 }}
            onPress={handleArchive}
          />
          <FloatingButton
            icon="trash"
            background={COLORS.redF26969}
            onPress={handleDelete}
          />
        </View>
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
