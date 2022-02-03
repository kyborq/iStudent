import {
  CommonActions,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import { Header } from '../../components/Header';
import { InfoLine } from '../../components/InfoLine';
import { IconButton } from '../../components/inputs/IconButton';
import { Dialogue } from '../../components/modals/Dialogue';
import { RootStackParamList } from '../../components/navigation/Navigation';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  deleteSubject,
  editSubject,
  TSubject,
} from '../../redux/subjectsSlice';
import { decline, uuid4 } from '../../utils';
import { TaskCard } from '../tasks/components/TaskCard';

export const ViewSubject = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'ViewSubject'>>();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [deleteModal, showDeleteModal] = useState(false);

  const id = route?.params?.id;

  const subject = useAppSelector((state) =>
    state.subjects.subjects.find((s) => s.id === id),
  );
  const tasks = useAppSelector((state) =>
    state.tasks.tasks.filter((task) => task.subject === subject?.id),
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

  const openWebURL = () => {
    const url = subject?.link || '';
    const supported = Linking.canOpenURL(url);
    supported
      .then(() => Linking.openURL(url))
      .catch(() =>
        ToastAndroid.show('Не удалось открыть ссылку :(', ToastAndroid.SHORT),
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

  const handleDeleteSubject = () => {
    dispatch(deleteSubject(subject?.id || ''));
    handleBack();
  };

  const handleShowDeleteModal = () => {
    showDeleteModal(!deleteModal);
  };

  const handleArchive = () => {
    const newSubject = { ...subject, archived: !subject?.archived } as TSubject;
    dispatch(editSubject(newSubject));
  };

  const taskCount = decline(tasks.length, ['задача', 'задачи', 'задач']);

  return (
    <View style={styles.container}>
      <Header
        label="Дисциплина"
        actionIcon={'edit'}
        onBack={handleBack}
        onAction={handleEdit}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <InfoLine
          icon="book"
          label="Название дисциплины"
          text={subject?.title}
        />
        {!!subject?.teacher && (
          <InfoLine icon="user" label="Преподаватель" text={subject?.teacher} />
        )}
        {!!subject?.link && (
          <InfoLine
            icon="link"
            label="Сайт"
            text={subject?.link}
            onPress={openWebURL}
          />
        )}
        <InfoLine
          icon="check"
          label="Задачи"
          text={tasks.length > 0 ? taskCount : 'Нет задач'}
          onPress={handleCreateTask}></InfoLine>

        <View style={styles.tasksView}>
          {tasks.map((task) => {
            if (!task.completed)
              return (
                <TaskCard
                  key={uuid4()}
                  task={task}
                  onPress={() => handleViewTask(task.id)}
                  short
                />
              );
          })}
        </View>
        <View style={styles.tasksView}>
          {tasks.map((task) => {
            if (task.completed)
              return (
                <TaskCard
                  key={uuid4()}
                  task={task}
                  onPress={() => handleViewTask(task.id)}
                  short
                />
              );
          })}
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          padding: 24,
          justifyContent: 'flex-end',
        }}>
        <IconButton
          icon="archive"
          onPress={handleArchive}
          containerStyle={{ marginRight: 12 }}
        />
        <IconButton icon="trash" onPress={handleShowDeleteModal} />
      </View>

      <Dialogue
        visible={deleteModal}
        title="Вы уверены?"
        message="Дисциплина будет удалена и ее больше не вернуть назад. Подумайте об этом..."
        onContinue={handleDeleteSubject}
        onCancel={handleShowDeleteModal}
      />
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
