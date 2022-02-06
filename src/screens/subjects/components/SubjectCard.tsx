import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CardBase } from '../../../components/CardBase';
import { Icon } from '../../../components/Icon';
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
  const tasksCount = tasks.filter((task) => !task.archived).length;
  const completedTasksCount = tasks.filter(
    (task) => task.completed && !task.archived,
  ).length;

  return (
    <CardBase onPress={onPress}>
      <View style={styles.container}>
        <SubjectIcon
          label={subject.title}
          background={subject.archived ? '#fafafa' : subject.color}
          color={subject.archived ? '#c7c7c7' : '#fff'}
        />
        <View style={styles.info}>
          <Text
            style={[
              styles.label,
              subject.archived && {
                textDecorationLine: 'line-through',
                color: '#c7c7c7',
              },
            ]}>
            {subject.title}
          </Text>
          {!!subject.teacher && (
            <Text style={styles.teacher}>{subject.teacher}</Text>
          )}
        </View>
      </View>
      {(completedTasksCount > 0 || tasksCount > 0) && !subject.archived && (
        <View style={{ marginTop: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon icon="check" color="#e2e2e2" />
            <Text
              style={{
                fontSize: 12,
                color: '#e2e2e2',
                fontWeight: 'bold',
                marginLeft: 8,
              }}>
              {`${completedTasksCount} / ${tasksCount}`}
            </Text>
          </View>
        </View>
      )}
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
