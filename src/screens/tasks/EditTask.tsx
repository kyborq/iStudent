import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from '../../components/Header';
import { Button } from '../../components/inputs/Button';
import { Input } from '../../components/inputs/Input';
import { RootStackParamList } from '../../components/navigation/Navigation';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { addTask, TTask } from '../../redux/tasksSlice';
import { uuid4 } from '../../utils';

export const EditTask = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'EditTask'>>();
  const dispatch = useAppDispatch();

  const id = route?.params?.id;
  const tasks: TTask[] = useAppSelector((state) => state.tasks.tasks);
  const task = id && tasks?.filter((t) => t.id === id)[0];

  const [taskDraft, setTaskDraft] = useState<TTask>(
    task || {
      id: uuid4(),
      label: '',
      status: false,
    },
  );

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSave = () => {
    !id && dispatch(addTask(taskDraft));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header label="Новая задача" onBack={handleBack} />
      <ScrollView contentContainerStyle={styles.content}>
        <Input
          placeholder="Название"
          value={taskDraft.label}
          onChange={(value) => setTaskDraft({ ...taskDraft, label: value })}
        />
        <Input
          placeholder="Описание"
          multiline
          value={taskDraft.description}
          onChange={(value) =>
            setTaskDraft({ ...taskDraft, description: value })
          }
        />
        <View style={{ flex: 1 }} />
        <Button label="Сохранить" onPress={handleSave} />
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
