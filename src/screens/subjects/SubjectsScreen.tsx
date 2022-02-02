import { CommonActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Empty } from '../../components/Empty';
import { Header } from '../../components/Header';
import { Input } from '../../components/inputs/Input';
import { useAppSelector } from '../../redux/store';
import { uuid4 } from '../../utils';
import { SubjectCard } from './components/SubjectCard';

export const SubjectsScreen = () => {
  const navigation = useNavigation();

  const subjects = useAppSelector((state) => state.subjects.subjects);

  const handleAddSubject = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'EditSubject',
      }),
    );
  };

  const subjectList = subjects.map((subject) => (
    <SubjectCard key={uuid4()} subject={subject} />
  ));

  return (
    <View style={styles.container}>
      <Header label="Мои предметы" onAction={handleAddSubject} />
      <ScrollView contentContainerStyle={styles.content}>
        <Input
          icon="search"
          placeholder="Поиск"
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
