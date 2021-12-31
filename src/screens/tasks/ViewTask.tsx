import {
  CommonActions,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../colors';
import { Header } from '../../components/Header';
import { Icon } from '../../components/Icon';
import { IconButton } from '../../components/IconButton';
import { InfoLine } from '../../components/InfoLine';
import { RootStackParamList } from '../../components/navigation/Navigation';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  completeTask,
  deleteTask,
  permanentDeleteTask,
  TTask,
} from '../../redux/tasksSlice';

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

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    !task.deleted && navigation.goBack();
  };

  const handleDeletePermanent = () => {
    dispatch(permanentDeleteTask(task.id));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header
        label={task.label || 'Просмотр задачи'}
        onAction={task.status ? handleDelete : handleEditTask}
        onBack={handleBack}
        actionIcon={task.status ? 'archive' : 'edit'}
        hideAction={task.deleted}
      />
      <View style={styles.content}>
        {!task.deleted && (
          <>
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
              <InfoLine
                label="Описание задачи"
                text={task.description}
                disabled={task.status}
              />
            )}
          </>
        )}
        {task.deleted && (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Icon
              icon="archive"
              color="#c7c7c7"
              containerStyle={{ marginBottom: 32 }}
            />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                color: '#c7c7c7',
                marginBottom: 32,
              }}>
              Эта задача архивирована, вы можете ее вернуть или удалить навсегда
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <IconButton
                icon="addSquare"
                color={COLORS.primary5A9EEE}
                containerStyle={{ marginRight: 16 }}
                onPress={handleDelete}
              />
              <IconButton
                icon="trash"
                color={COLORS.dangerF26969}
                onPress={handleDeletePermanent}
              />
            </View>
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
    paddingHorizontal: 24,
    flex: 1,
  },
});
