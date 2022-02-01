import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../../../colors';
import { Button } from '../../../components/inputs/Button';
import { IconButton } from '../../../components/inputs/IconButton';
import { useAppSelector } from '../../../redux/store';
import { TTask } from '../../../redux/tasksSlice';

type Props = {
  task: TTask;
  onComplete?: () => void;
};

export const TaskFooter = ({ task, onComplete }: Props) => {
  return (
    <View style={styles.container}>
      <IconButton
        icon="checkLine"
        primary={task.completed}
        label={task.completed ? 'Завершена' : 'Завершить'}
        size={54}
        onPress={onComplete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttons: {
    flexDirection: 'row',
  },
});
