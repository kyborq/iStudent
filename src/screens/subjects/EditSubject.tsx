import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from '../../components/Header';
import { Button } from '../../components/inputs/Button';
import { Input } from '../../components/inputs/Input';
import { RootStackParamList } from '../../components/navigation/Navigation';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { addSubject, editSubject, TSubject } from '../../redux/subjectsSlice';
import { uuid4 } from '../../utils';

export const EditSubject = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<RootStackParamList, 'EditTask'>>();

  const id = route?.params?.id;

  const subjects: TSubject[] = useAppSelector(
    (state) => state.subjects.subjects,
  );
  const subject = id && subjects?.filter((s) => s.id === id)[0];

  const [subjectDraft, setSubjectraft] = useState<TSubject>(
    subject || {
      id: uuid4(),
      title: '',
      teacher: '',
      link: '',
    },
  );

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSave = () => {
    if (!id) {
      dispatch(addSubject(subjectDraft));
      navigation.goBack();
    }

    if (id) {
      dispatch(editSubject(subjectDraft));
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Header
        label={id ? 'Редактировать предмет' : 'Новый предмет'}
        onBack={handleBack}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Input
          label="Дисциплина"
          placeholder="Математика"
          value={subjectDraft.title}
          onChange={(value) =>
            setSubjectraft({ ...subjectDraft, title: value })
          }
        />
        <Input
          label="Преподаватель"
          placeholder="Иванов Иван Иванович"
          value={subjectDraft.teacher}
          onChange={(value) =>
            setSubjectraft({ ...subjectDraft, teacher: value })
          }
        />
        <Input
          label="Ссылка на сайт"
          placeholder="https://example.com/"
          value={subjectDraft.link}
          onChange={(value) => setSubjectraft({ ...subjectDraft, link: value })}
        />
        <View style={{ flex: 1 }} />
        <View style={{ flexDirection: 'row' }}>
          <Button
            label={id ? 'Изменить' : 'Сохранить'}
            onPress={handleSave}
            style={{ flex: 1 }}
            primary
          />
        </View>
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
    paddingBottom: 24,
    flexGrow: 1,
  },
});
