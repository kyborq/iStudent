import {
  RouteProp,
  CommonActions,
  NavigationAction,
  useNavigation,
  useRoute,
} from '@react-navigation/core';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from '../../components/Header';
import { InfoLine } from '../../components/InfoLine';
import { Button } from '../../components/inputs/Button';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { RootStackParamList } from '../../components/navigation/Navigation';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { TSubject } from '../../redux/subjectsSlice';
import {
  addTask,
  deleteTask,
  editTask,
  EPriority,
  TTask,
} from '../../redux/tasksSlice';
import { uuid4 } from '../../utils';

export const EditTask = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'EditTask'>>();
  const dispatch = useAppDispatch();

  const id = route?.params?.id;
  const tasks: TTask[] = useAppSelector((state) => state.tasks.tasks);
  const subjects: TSubject[] = useAppSelector(
    (state) => state.subjects.subjects,
  );
  const task = id && tasks?.filter((t) => t.id === id)[0];

  const [taskDraft, setTaskDraft] = useState<TTask>(
    task || {
      id: uuid4(),
      title: '',
      completed: false,
    },
  );

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSave = () => {
    if (!id) {
      dispatch(addTask(taskDraft));
      navigation.goBack();
    }

    if (id) {
      dispatch(editTask(taskDraft));
      navigation.goBack();
    }
  };

  const handleDelete = () => {
    dispatch(deleteTask(id));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header
        label={id ? 'Изменить задачу' : 'Новая задача'}
        onBack={handleBack}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Input
          label="Задача"
          placeholder="Приготовить еду"
          multiline
          value={taskDraft.title}
          onChange={(value) => setTaskDraft({ ...taskDraft, title: value })}
        />
        <Select
          label="Предмет"
          placeholder="Не выбран"
          value={subjects.find((s) => s.id === taskDraft.subject)?.title}
          items={subjects.map((subject) => {
            return { title: subject.title, value: subject.id };
          })}
          onSelect={(value) => setTaskDraft({ ...taskDraft, subject: value })}
        />
        <View style={{ flex: 1 }} />
        <View style={{ flexDirection: 'row' }}>
          <Button
            label={id ? 'Изменить' : 'Сохранить'}
            onPress={handleSave}
            style={{ flex: 1 }}
            primary
          />
          {id && (
            <Button
              icon="archive"
              onPress={handleDelete}
              style={{ marginLeft: 16 }}
              primary
            />
          )}
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
    paddingHorizontal: 24,
    paddingBottom: 24,
    flexGrow: 1,
  },
});
