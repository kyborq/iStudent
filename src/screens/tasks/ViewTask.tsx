import {
  CommonActions,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Header } from '../../components/Header';
import { InfoLine } from '../../components/InfoLine';
import { RootStackParamList } from '../../components/navigation/Navigation';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  completeTask,
  deleteTask,
  permanentDeleteTask,
  setTaskPriority,
  TTask,
} from '../../redux/tasksSlice';
import { Empty } from '../../components/Empty';
import { IconButton } from '../../components/inputs/IconButton';
import { COLORS } from '../../colors';
import { ModalView } from '../../components/modals/ModalView';
import { Calendar } from '../../components/calendar/Calendar';

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
          <View>
            <InfoLine
              icon="textInfo"
              label="Название задачи"
              text={task.label}
              disabled={task.status}
            />

            {!!task.description && (
              <InfoLine
                label="Описание задачи"
                text={task.description}
                disabled={task.status}
              />
            )}

            <InfoLine
              icon="book"
              label="Срок выполнения"
              text="Без срока"
              disabled={task.status}
              onPress={() => setDateModalVisible(!dateModalVisible)}
            />
          </View>
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

      <ModalView
        visible={dateModalVisible}
        onClose={() => setDateModalVisible(!dateModalVisible)}>
        <View
          style={{
            paddingHorizontal: 24,
            paddingTop: 16,
            marginBottom: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Календарь</Text>
          <View style={{ flexDirection: 'row' }}>
            <IconButton
              icon="archive"
              color="#c7c7c7"
              buttonStyle={{ width: 32, height: 32 }}
              containerStyle={{ marginRight: 10 }}
            />
            <IconButton
              icon="archive"
              color="#c7c7c7"
              buttonStyle={{ width: 32, height: 32 }}
            />
          </View>
        </View>
        <Calendar
          date={new Date(date)}
          style={{ marginHorizontal: 24, marginBottom: 16 }}
        />
      </ModalView>

      <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
        {!task.deleted && (
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row' }}>
              {task.status && (
                <IconButton
                  icon="trash"
                  color={COLORS.dangerF26969}
                  containerStyle={{ marginRight: 10 }}
                  onPress={handleDeletePermanent}
                />
              )}
              {!task.status && (
                <IconButton
                  icon="info"
                  color={
                    task.priority ? COLORS.primary5A9EEE : COLORS.darkC7C7C7
                  }
                  containerStyle={{ marginRight: 10 }}
                  onPress={handleChangePriority}
                />
              )}
              {!task.status && (
                <IconButton
                  icon="archive"
                  color={COLORS.darkC7C7C7}
                  onPress={handleDelete}
                />
              )}
            </View>
            <IconButton
              icon="checkLine"
              color={task.status ? '#FFF' : COLORS.darkC7C7C7}
              background={
                task.status ? COLORS.primary5A9EEE : COLORS.lightFAFAFA
              }
              label={task.status ? 'Завершена' : 'Не завершена'}
              onPress={handleCompleteTask}
            />
          </View>
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
    paddingBottom: 24,
    flexGrow: 1,
  },
});
