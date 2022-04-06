import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from '../../components/Header';
import { Button } from '../../components/inputs/Button';
import { Input } from '../../components/inputs/Input';
import { RootStackParamList } from '../../components/navigation/Navigation';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { addSubject, editSubject, TSubject } from '../../redux/subjectsSlice';
import { uuid4 } from '../../utils';
import { toWordUppercase } from './subjectUtils';

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
  const [valid, setValid] = useState<boolean>(false);

  useEffect(() => {
    setValid(isValid());
  }, [subjectDraft]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSave = () => {
    if (!id && valid) {
      dispatch(addSubject(subjectDraft));
      navigation.goBack();
    }

    if (id && valid) {
      dispatch(editSubject(subjectDraft));
      navigation.goBack();
    }
  };

  const isValid = () => {
    if (subjectDraft.title === '') {
      return false;
    }

    return true;
  };

  return (
    <View style={styles.container}>
      <Header
        title={id ? 'Редактировать предмет' : 'Новый предмет'}
        leftIcon="clear"
        onLeft={handleBack}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Input
          label="Дисциплина"
          placeholder="Математика"
          icon="book"
          value={subjectDraft.title}
          onChange={(value) =>
            setSubjectraft({ ...subjectDraft, title: value })
          }
          clearInput
        />
        <Input
          label="Преподаватель"
          placeholder="Иванов Иван Иванович"
          icon="user"
          value={toWordUppercase(subjectDraft.teacher)}
          onType={(value) =>
            setSubjectraft({ ...subjectDraft, teacher: value })
          }
          clearInput
        />
        <View style={{ flex: 1 }} />
        <View style={{ flexDirection: 'row' }}>
          <Button
            label={id ? 'Изменить' : 'Сохранить'}
            onPress={handleSave}
            style={{ flex: 1 }}
            primary
            disabled={!valid}
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
