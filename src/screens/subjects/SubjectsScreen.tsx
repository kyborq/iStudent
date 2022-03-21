import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Empty } from '../../components/Empty';
import { Header } from '../../components/Header';
import { Input } from '../../components/inputs/Input';
import { useAppSelector } from '../../redux/store';
import { search, uuid4 } from '../../utils';
import { ScheduleTaskCard } from '../schedule/components/ScheduleTaskCard';
import { SubjectCard } from './components/SubjectCard';
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
      <Header title="Мои предметы" onRight={handleAddSubject} />
      <ScrollView contentContainerStyle={styles.content}>
        <Input
          icon="search"
          placeholder="Поиск"
          value={searchQuery}
          onType={setSearchQuery}
          clearInput
          style={{ marginBottom: 16, marginHorizontal: 24 }}
        />
        <SubjectsPanel
          all={allSubjects}
          archived={archivedSubjects}
          filter={filter}
          onSetFilter={setFilter}
        />
        {!searchQuery && filter !== 'ARCHIVED' && recentSubjects.length > 0 && (
          <View style={{ marginBottom: 24, marginTop: 10 }}>
            <Text
              style={{
                fontWeight: 'bold',
                marginHorizontal: 24,
                marginBottom: 8,
                color: '#c7c7c7',
              }}>
              Важные
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ overflow: 'visible' }}
              contentContainerStyle={styles.scroll}>
              {recentSubjects.map((subject, index) => (
                <ScheduleTaskCard
                  key={uuid4()}
                  label={subject.title}
                  style={{
                    marginRight: recentSubjects.length - 1 === index ? 0 : 12,
                  }}
                  onPress={() => handleViewSubject(subject.id)}
                />
              ))}
            </ScrollView>
          </View>
        )}

        {filteredSubjects.length > 0 ? (
          <View style={{ paddingHorizontal: 24, marginTop: 8 }}>
            {subjectList}
          </View>
        ) : (
          <Empty icon="book" text="Список предметов пуст" />
        )}
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
