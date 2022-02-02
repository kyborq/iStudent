import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CardBase } from '../../../components/CardBase';
import { TSubject } from '../../../redux/subjectsSlice';
import { SubjectIcon } from './SubjectIcon';

type Props = {
  subject: TSubject;
};

export const SubjectCard = ({ subject }: Props) => {
  return (
    <CardBase>
      <View style={styles.container}>
        <SubjectIcon label={subject.title} color={subject.color} />
        <Text style={styles.label}>{subject.title}</Text>
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
    marginLeft: 8,
  },
});
