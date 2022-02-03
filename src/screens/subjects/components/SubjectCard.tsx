import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CardBase } from '../../../components/CardBase';
import { useAppSelector } from '../../../redux/store';
import { TSubject } from '../../../redux/subjectsSlice';
import { decline } from '../../../utils';
import { SubjectIcon } from './SubjectIcon';

type Props = {
  subject: TSubject;
  onPress?: () => void;
};

export const SubjectCard = ({ subject, onPress }: Props) => {
  const tasks = useAppSelector((state) =>
    state.tasks.tasks.filter((task) => task.subject === subject.id),
  );
  const tasksCount = tasks.filter((task) => !task.completed).length;

  return (
    <CardBase onPress={onPress}>
      <View style={styles.container}>
        <SubjectIcon label={subject.title} color={subject.color} />
        <View style={styles.info}>
          <Text style={styles.label}>{subject.title}</Text>
          {!!subject.teacher && (
            <Text style={styles.teacher}>{subject.teacher}</Text>
          )}
          {tasksCount > 0 && (
            <Text style={styles.teacher}>{`${decline(tasksCount, [
              'задача',
              'задачи',
              'задач',
            ])}`}</Text>
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
  info: {
    marginLeft: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  teacher: {
    fontSize: 12,
    marginTop: 4,
    color: '#c7c7c7',
  },
});
