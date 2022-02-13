import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from '../../components/Header';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { useAppSelector } from '../../redux/store';
import { TSubject } from '../../redux/subjectsSlice';

export const EditEvent = () => {
  const navigation = useNavigation();

  const subjects = useAppSelector((state) =>
    state.subjects.subjects.filter((s) => !s.archived),
  );

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header label="Добавить занятие" onBack={handleBack} />
      <ScrollView contentContainerStyle={styles.content}>
        <Input
          label="Название занятия"
          placeholder="Пара по информатике"
          value={''}
        />
        {/* <Input label="Предмет" placeholder="Иванов Иван Иванович" value={''} /> */}
        <Select
          label="Предмет"
          items={subjects.map((subject) => {
            return { title: subject.title, value: subject.id };
          })}
          placeholder={'Не выбрано'}
          value={subjects.find((s) => s.id === 'taskDraft.subject')?.title}
        />
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
  scroll: {
    paddingHorizontal: 24,
    overflow: 'visible',
    paddingBottom: 8,
    marginBottom: -16,
    paddingTop: 12,
    marginTop: -12,
  },
});
