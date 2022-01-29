import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { TTask } from '../../../redux/tasksSlice';
import { uuid4 } from '../../../utils';
import { ScheduleTaskCard } from './ScheduleTaskCard';

type Props = {
  tasks: TTask[];
  onPress?: (id: string) => void;
};

export const ScheduleTasks = ({ tasks, onPress }: Props) => {
  const taskList = tasks.map((task, index) => (
    <ScheduleTaskCard
      key={uuid4()}
      label={task.label}
      style={{ marginRight: tasks.length - 1 === index ? 0 : 12 }}
      onPress={() => onPress && onPress(task.id)}
    />
  ));

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Задачи</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ overflow: 'visible' }}
        contentContainerStyle={styles.scroll}>
        {taskList}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    overflow: 'visible',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 24,
    marginBottom: 8,
    color: '#c7c7c7',
  },
  scroll: {
    paddingHorizontal: 24,
    overflow: 'visible',
    paddingBottom: 24,
    marginBottom: -24,
    paddingTop: 12,
    marginTop: -12,
  },
});
