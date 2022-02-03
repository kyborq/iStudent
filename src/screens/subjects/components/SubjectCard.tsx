import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CardBase } from '../../../components/CardBase';
import { TSubject } from '../../../redux/subjectsSlice';
import { SubjectIcon } from './SubjectIcon';

type Props = {
  subject: TSubject;
  onPress?: () => void;
};

export const SubjectCard = ({ subject, onPress }: Props) => {
  return (
    <CardBase onPress={onPress}>
      <View style={styles.container}>
        <SubjectIcon label={subject.title} color={subject.color} />
        <View style={styles.info}>
          <Text style={styles.label}>{subject.title}</Text>
          {!!subject.teacher && (
            <Text style={styles.teacher}>{subject.teacher}</Text>
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
