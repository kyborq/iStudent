import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { CreateSubject } from '../../api/models/subjectModel';
import { Button } from '../../components/Button';
import { Field } from '../../components/Field';
import { Form } from '../../components/Form';
import { Header } from '../../components/Header';
import { AppParamList } from '../../components/navigation/Navigator';
import { useCreateSubject } from './hooks/useCreateSubject';

type ScreenProps = NativeStackScreenProps<AppParamList>;

export const NewSubjectScreen = ({ navigation }: ScreenProps) => {
  const { control, handleSubmit } = useForm<CreateSubject>();
  const createSubject = useCreateSubject();

  const onSubmit = (data: CreateSubject) => {
    createSubject(data);
    navigation.pop();
  };

  return (
    <SafeAreaView style={styles.root}>
      <Header title="Новый предмет" onBack={() => navigation.pop()} />

      <ScrollView contentContainerStyle={{ gap: 12, flexGrow: 1 }}>
        <Form>
          <Text style={styles.title}>Общая информация</Text>
          <View style={styles.fields}>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Field placeholder="Название" {...field} />
              )}
            />
            <Controller
              control={control}
              name="teacher"
              render={({ field }) => (
                <Field placeholder="Имя преподавателя" {...field} />
              )}
            />
          </View>
        </Form>
      </ScrollView>

      <Button text="Сохранить" isPrimary onPress={handleSubmit(onSubmit)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 20,
    paddingVertical: 32,
    flexGrow: 1,
    gap: 24,
  },
  title: {
    color: '#212529',
    fontFamily: 'Golos-Bold',
    lineHeight: 20,
  },
  fields: {
    gap: 4,
  },
});
