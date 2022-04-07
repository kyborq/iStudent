import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Empty } from '../../components/Empty';
import { FloatingButton } from '../../components/FloatingButton';
import { Header } from '../../components/Header';
import { Input } from '../../components/inputs/Input';
import { useAppSelector } from '../../redux/store';
import { search, uuid4 } from '../../utils';
import { SubjectCard } from './components/SubjectCard';
import { SubjectList } from './components/SubjectList';
import { SubjectsPanel } from './components/SubjectsPanel';
import { filterSubjects, sortSubjects } from './subjectUtils';

export const SubjectsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('ALL');

  const navigation = useNavigation();

  const subjects = useAppSelector((state) =>
    state.subjects.subjects.filter((s) => search(searchQuery, s.title)),
  );
  const recentSubjects = useAppSelector((state) =>
    sortSubjects(state.subjects.subjects, 'viewed', true).filter(
      (s, i) => i < 5 && !s.archived && s,
    ),
  );

  const filteredSubjects = sortSubjects(
    subjects.filter((s) => filterSubjects(s, filter)),
    'title',
  );

  const allSubjects = subjects.filter((s) => !s.archived).length;
  const archivedSubjects = subjects.filter((s) => s.archived).length;

  const handleAddSubject = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'EditSubject',
      }),
    );
  };

  const handleViewSubject = (id: string) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'ViewSubject',
        params: { id },
      }),
    );
  };

  const subjectList = filteredSubjects.map((subject) => {
    if (subject.title.toLowerCase().includes(searchQuery.toLowerCase()))
      return (
        <SubjectCard
          key={uuid4()}
          subject={subject}
          onPress={() => handleViewSubject(subject.id)}
        />
      );
  });

  return (
    <View style={styles.container}>
      <Header title="Предметы" rightIcon="search" />
      <ScrollView contentContainerStyle={styles.content}>
        <SubjectList />
      </ScrollView>
      <FloatingButton icon="add" onPress={handleAddSubject} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  scroll: {
    paddingHorizontal: 24,
    overflow: 'visible',
    paddingBottom: 8,
    marginBottom: -16,
    paddingTop: 12,
    marginTop: -12,
  },
});
