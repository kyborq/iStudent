import {
  CommonActions,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from '../../components/Header';
import { InfoLine } from '../../components/InfoLine';
import { RootStackParamList } from '../../components/navigation/Navigation';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { editTask, TTask } from '../../redux/tasksSlice';
import { decline, uuid4 } from '../../utils';
import { TaskCard } from '../tasks/components/TaskCard';

export const ViewSubject = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'ViewSubject'>>();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const id = route?.params?.id;

  const subject = useAppSelector((state) =>
    state.subjects.subjects.find((s) => s.id === id),
  );
  const tasks = useAppSelector((state) =>
    state.tasks.tasks.filter(
      (task) =>
        task.subject === subject?.id && !task.completed && !task.archived,
    ),
  );

  const handleBack = () => {
    navigation.goBack();
  };

  const handleEdit = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'EditSubject',
        params: { id: subject?.id },
      }),
    );
  };

  const handleCreateTask = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'EditTask',
        params: { subject: subject?.id },
      }),
    );
  };

  const handleViewTask = (id: string) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'ViewTask',
        params: { id: id },
      }),
    );
  };

  const handleCompleteTask = (task: TTask) => {
    const newTask: TTask = { ...task, completed: !task.completed };
    dispatch(editTask(newTask));
  };

  const taskCount = decline(tasks.length, ['задача', 'задачи', 'задач']);

  return (
    <View style={styles.container}>
      <Header
        title="Предмет"
        rightIcon={'edit'}
        onLeft={handleBack}
        onRight={(!subject?.archived && handleEdit) || undefined}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <View>
          <InfoLine
            icon="book"
            label="Название дисциплины"
            text={subject?.title}
          />
          {!!subject?.teacher && (
            <InfoLine
              icon="user"
              label="Преподаватель"
              text={subject?.teacher}
            />
          )}
          <InfoLine
            icon="check"
            label="Задачи"
            text={tasks.length > 0 ? taskCount : 'Нет задач'}
            onPress={handleCreateTask}></InfoLine>

          <View style={{ marginHorizontal: 24, marginTop: 16 }}>
            {tasks.map((t) => (
              <TaskCard
                key={uuid4()}
                short={false}
                task={t}
                onComplete={() => handleCompleteTask(t)}
                onPress={() => handleViewTask(t.id)}
              />
            ))}
          </View>
        </View>
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
    paddingBottom: 24,
    flexGrow: 1,
  },
  tasksView: {
    paddingHorizontal: 24,
    marginTop: 16,
  },
});
