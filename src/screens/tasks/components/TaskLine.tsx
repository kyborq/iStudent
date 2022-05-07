import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Check } from '../../../components/inputs/Check';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { editTask, TTask } from '../../../redux/tasksSlice';

type Props = {
  title: string;
  taskId: string;
  last?: boolean;
};

export const TaskLine: FC<Props> = ({ title, taskId, last }) => {
  const dispatch = useAppDispatch();
  const task = useAppSelector((s) =>
    s.tasks.tasks.find((t) => t.id === taskId),
  );

  const handleComplete = () => {
    if (task) {
      const newTask: TTask = { ...task, completed: !task.completed };
      dispatch(editTask(newTask));
    }
  };

  return (
    <View style={[styles.container, last && { marginBottom: 0 }]}>
      <Check onPress={handleComplete} checked={task?.completed} />
      <Text
        style={[
          styles.title,
          task?.completed && {
            textDecorationLine: 'line-through',
            color: '#c7c7c7',
          },
        ]}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontWeight: 'bold',
    marginLeft: 12,
  },
});
