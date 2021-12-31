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
import {
  completeTask,
  deleteAllTaskSteps,
  deleteTask,
  permanentDeleteTask,
  TTask,
} from '../../redux/tasksSlice';
import { TaskSteps } from './components/TaskSteps';
import { Empty } from '../../components/Empty';

export const ViewTask = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<RootStackParamList, 'ViewTask'>>();

  const id = route?.params?.id;
  const { tasks, steps } = useAppSelector((state) => state.tasks);
  const task: TTask = tasks?.filter((t) => t.id === id)[0];
  const taskSteps = steps.filter((s) => s.taskId === task.id);

  const handleCompleteTask = () => {
    dispatch(completeTask(task.id));
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

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    !task.deleted && navigation.goBack();
  };

  const handleDeletePermanent = () => {
    dispatch(permanentDeleteTask(task.id));
    dispatch(deleteAllTaskSteps(task.id));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header
        label="Просмотр задачи"
        actionIcon={task.status ? 'archive' : 'edit'}
        onAction={task.status ? handleDelete : handleEditTask}
        hideAction={task.deleted}
        onBack={handleBack}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {!task.deleted && (
          <>
            {/* <InfoLine
              icon="check"
              label="Статус"
              text={task.status ? 'Начать' : 'Завершить'}
              onPress={handleCompleteTask}
            /> */}

            <InfoLine
              icon="info"
              label="Название задачи"
              text={task.label}
              disabled={task.status}
            />

            {/* {!!task.description && (
              <InfoLine
                label="Описание задачи"
                text={task.description}
                disabled={task.status}
              />
            )} */}

            {/* <TaskSteps
              taskId={task.id}
              steps={taskSteps}
              disabled={task.status}
            /> */}
          </>
        )}
        {task.deleted && (
          <Empty
            text="Эта задача архвивирована. Вы можете вернуть ее или удалить навсегда"
            icon="archive"
            onDelete={handleDeletePermanent}
            onReturn={handleDelete}
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
    paddingHorizontal: 24,
    paddingBottom: 24,
    flexGrow: 1,
  },
});
