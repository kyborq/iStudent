import {
  CommonActions,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { COLORS } from '../../colors';
import { FloatingButton } from '../../components/FloatingButton';
import { Header } from '../../components/Header';
import { InfoLine } from '../../components/InfoLine';
import { RootStackParamList } from '../../components/navigation/Navigation';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { archiveSubject, deleteSubject } from '../../redux/subjectsSlice';

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

  const handleDelete = () => {
    dispatch(deleteSubject(id));
    handleBack();
  };

  const handleArchive = () => {
    dispatch(archiveSubject(id));
    handleBack();
  };

  const handleCreateTask = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'TasksScreen',
        // params: { subject: subject?.id },
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Просмотр предмета"
        rightIcon="clear"
        onRight={handleBack}
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
            text={'Нет задач'}
            onPress={handleCreateTask}></InfoLine>
        </View>
      </ScrollView>
      <FloatingButton icon="edit" onPress={handleEdit} />
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
