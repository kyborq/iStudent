import {
  CommonActions,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from '../../components/Header';
import { InfoLine } from '../../components/InfoLine';
import { RootStackParamList } from '../../components/navigation/Navigation';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { completeTask, TTask } from '../../redux/tasksSlice';

export const ViewTask = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<RootStackParamList, 'ViewTask'>>();

  const id = route?.params?.id;
  const tasks: TTask[] = useAppSelector((state) => state.tasks.tasks);
  const task: TTask = tasks?.filter((t) => t.id === id)[0];

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

  return (
    <View style={styles.container}>
      <Header
        label={task.label || 'Просмотр задачи'}
        onAction={handleEditTask}
        onBack={handleBack}
        actionIcon="edit"
      />
      <View style={styles.content}>
        <InfoLine
          icon={'check'}
          label="Статус"
          text={task.status ? 'Завершен' : 'Не завершен'}
          actionIcon={task.status ? 'play' : 'checkLine'}
          onAction={handleCompleteTask}
        />
        <InfoLine
          icon="info"
          label="Название задачи"
          text={task.label}
          disabled={task.status}
        />
        {!!task.description && (
          <InfoLine label="Описание задачи" text={task.description} />
        )}
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
