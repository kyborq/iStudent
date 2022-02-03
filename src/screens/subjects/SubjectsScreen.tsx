import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Empty } from '../../components/Empty';
import { Header } from '../../components/Header';
import { Input } from '../../components/inputs/Input';
import { useAppSelector } from '../../redux/store';
import { uuid4 } from '../../utils';
import { SubjectCard } from './components/SubjectCard';

export const SubjectsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const subjects = useAppSelector((state) => state.subjects.subjects);

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

  const subjectList = subjects.map((subject) => {
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
      <Header label="Мои предметы" onAction={handleAddSubject} />
      <ScrollView contentContainerStyle={styles.content}>
        <Input
          icon="search"
          placeholder="Поиск"
          value={searchQuery}
          onChange={setSearchQuery}
          clearInput
          style={{ marginBottom: 24 }}
        />
        {/* <Empty text="Список предметов пуст" icon="book" /> */}
        {subjectList}
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
    paddingHorizontal: 24,
    flexGrow: 1,
  },
});
