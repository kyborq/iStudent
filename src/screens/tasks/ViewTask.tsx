import {
  CommonActions,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Header } from '../../components/Header';
import { RootStackParamList } from '../../components/navigation/Navigation';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  completeTask,
  deleteTask,
  permanentDeleteTask,
  setDate,
  setTaskPriority,
  TTask,
} from '../../redux/tasksSlice';
import { Empty } from '../../components/Empty';
import { ModalView } from '../../components/modals/ModalView';
import { getDate } from '../../components/calendar/calendarUtils';
import { TaskFooter } from './components/TaskFooter';
import { TaskInfo } from './components/TaskInfo';
import { CalendarForm } from '../../components/calendar/form/CalendarForm';

export const ViewTask = () => {
  const [dateModalVisible, setDateModalVisible] = useState(false);

  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<RootStackParamList, 'ViewTask'>>();

  const id = route?.params?.id;
  const { tasks } = useAppSelector((state) => state.tasks);
  const task: TTask = tasks?.filter((t) => t.id === id)[0];

  const { date } = useAppSelector((state) => state.root);

  const handleCompleteTask = () => {
    dispatch(completeTask({ id: task.id, value: !task.status }));
  };

  const handleChangePriority = () => {
    dispatch(setTaskPriority({ id: task.id, priority: !task.priority }));
  };

  const handleSetDate = (d: number) => {
    dispatch(setDate({ id: task.id, date: d }));
    setDateModalVisible(false);
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
    dispatch(completeTask({ id: task.id, value: false }));
    !task.deleted && navigation.goBack();
  };

  const handleDeletePermanent = () => {
    dispatch(permanentDeleteTask(task.id));
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
        actionIcon={task.status ? 'archive' : 'edit'}
        onAction={task.status ? handleDelete : handleEditTask}
        hideAction={task.deleted}
        onBack={handleBack}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {!task.deleted ? (
          <TaskInfo
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
      </ScrollView>

      <ModalView
        visible={dateModalVisible}
        onClose={() => setDateModalVisible(!dateModalVisible)}>
        <CalendarForm date={task.date || date} onSelectDate={handleSetDate} />
      </ModalView>

      {!task.deleted && (
        <TaskFooter
          important={task.priority}
          status={task.status}
          onComplete={handleCompleteTask}
          onArchive={handleDelete}
          onDelete={handleDeletePermanent}
          onPriority={handleChangePriority}
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
