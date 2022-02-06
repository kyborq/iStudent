import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CardBase } from '../../../components/CardBase';
import { Icon } from '../../../components/Icon';
import { Check } from '../../../components/inputs/Check';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { editTask, TTask } from '../../../redux/tasksSlice';
import { getTextLetters } from '../../../utils';
import { getTimeOfTime } from '../../timer/timerUtils';

type Props = {
  task: TTask;
  short?: boolean;
  onPress?: () => void;
  onComplete?: () => void;
  last?: boolean;
};

export const TaskCard = ({ task, onPress, short, onComplete, last }: Props) => {
  const dispatch = useAppDispatch();
  const subject = useAppSelector((state) =>
    state.subjects.subjects.find((s) => s.id === task.subject),
  );

  const handleComplete = () => {
    const newTask: TTask = { ...task, completed: !task.completed };
    dispatch(editTask(newTask));
  };

  return (
    <CardBase style={last && { marginBottom: 0 }} onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.checkbox}>
          {!task.archived && (
            <Check checked={task.completed} onPress={handleComplete} />
          )}
          {task.archived && <Icon icon="archive" color="#e2e2e2" />}
        </View>
        <View>
          <Text
            style={[
              styles.label,
              (task.completed || task.archived) && styles.completedStyle,
            ]}>
            {task.title}
          </Text>
          {!short &&
            !task.archived &&
            !task.completed &&
            (!!subject?.title ||
              !!task.deadline ||
              (!!task.spended && !!task.estimate)) && (
              <View style={styles.footer}>
                {!!subject?.title && (
                  <Text
                    style={[
                      styles.footerText,
                      styles.chip,
                      { backgroundColor: subject.color, color: '#fff' },
                    ]}>
                    {getTextLetters(subject.title)}
                  </Text>
                )}
                {!!task.deadline && (
                  <Text style={[styles.footerText, styles.chip]}>
                    {task.deadline}
                  </Text>
                )}
                {!!task.spended && !!task.estimate && (
                  <Text style={[styles.footerText, styles.chip]}>
                    {getTimeOfTime(task.spended, task.estimate)}
                  </Text>
                )}
              </View>
            )}
        </View>
      </View>
    </CardBase>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 24,
    flex: 1,
  },
  checkbox: {
    marginRight: 10,
  },
  infoText: {
    fontSize: 14,
    marginTop: 6,
    color: '#c7c7c7',
  },
  completedStyle: {
    color: '#c7c7c7',
    textDecorationLine: 'line-through',
  },
  footerText: {
    fontSize: 12,
    color: '#c7c7c7',
  },
  chip: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    color: '#c7c7c7',
    backgroundColor: '#fafafa',
    marginRight: 8,
  },
  footer: {
    marginTop: 4,
    flexDirection: 'row',
  },
});
