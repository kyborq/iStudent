import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../colors';
import { Header } from '../../components/Header';
import { Button } from '../../components/button/Button';
import { Input } from '../../components/inputs/Input';
import { RootStackParamList } from '../../components/navigation/Navigation';
import { strings } from '../../localizations/localization';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { addSubject, editSubject, TSubject } from '../../redux/subjectsSlice';
import {
  getSubjectOrDefault,
  isSubjectExists,
  teacherExists,
  toWordUppercase,
} from './subjectUtils';

export const EditSubject = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<RootStackParamList, 'EditTask'>>();

  const id = route?.params?.id;

  const { subjects } = useAppSelector((state) => state.subjects);

  const [subjectDraft, setSubjectraft] = useState<TSubject>(
    getSubjectOrDefault(subjects, id),
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

  const duplicateSubject =
    subjectDraft.title !== '' && isSubjectExists(subjectDraft.title, subjects);
  const subjectTeacher =
    subjectDraft.teacher && teacherExists(subjectDraft.teacher, subjects);

  const isValid = () => {
    if (subjectDraft.title === '') {
      return false;
    }

    return true;
  };

  return (
    <View style={styles.container}>
      <Header
        title={id ? strings.editSubject : strings.newSubject}
        rightIcon="clear"
        onRight={handleBack}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Input
          label={strings.subject}
          placeholder={strings.subjectPlaceholder}
          icon="book"
          value={subjectDraft.title}
          onChange={(value) =>
            setSubjectraft({ ...subjectDraft, title: value })
          }
          clearInput
        />
        {!!duplicateSubject && !id && (
          <Text
            style={{
              color: COLORS.mediumF2BB69,
              fontSize: 12,
              marginBottom: 8,
            }}>
            <Text style={{ fontWeight: 'bold' }}>{duplicateSubject}</Text> уже
            есть в списках
          </Text>
        )}
        <Input
          label={strings.teacher}
          placeholder={strings.teacherPlaceholder}
          icon="user"
          value={toWordUppercase(subjectDraft.teacher)}
          onType={(value) =>
            setSubjectraft({ ...subjectDraft, teacher: value })
          }
          onChange={() => {
            !!subjectTeacher &&
              !id &&
              setSubjectraft({ ...subjectDraft, teacher: subjectTeacher });
          }}
          clearInput
        />
        {!!subjectTeacher && !id && subjectDraft.teacher !== subjectTeacher && (
          <Text
            style={{
              color: COLORS.normal72D393,
              fontSize: 12,
              marginBottom: 8,
            }}>
            <Text style={{ fontWeight: 'bold' }}>{subjectTeacher}</Text> уже
            существует, нажмите куда-нибудь чтобы заменить
          </Text>
        )}

        <View style={{ flex: 1 }} />
        <View style={{ flexDirection: 'row' }}>
          <Button
            label={id ? strings.edit : strings.save}
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
    paddingHorizontal: 20,
    paddingBottom: 24,
    flexGrow: 1,
  },
});
