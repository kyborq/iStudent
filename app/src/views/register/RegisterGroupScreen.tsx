import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { CreateGroup } from '../../api/models/groupModel';
import { Button } from '../../components/Button';
import { Field } from '../../components/Field';
import { Form } from '../../components/Form';
import { Header } from '../../components/Header';
import { RootParamList } from '../../components/navigation/types';

type CreateGroupScreenProps = NativeStackScreenProps<
  RootParamList,
  'RegisterGroup'
>;

export const RegisterGroupScreen = ({ navigation }: CreateGroupScreenProps) => {
  const { control, handleSubmit } = useForm<CreateGroup>();

  const onSubmit = (data: CreateGroup) => {
    navigation.navigate('RegisterPrefect', {
      group: data.name,
    });
  };

  return (
    <SafeAreaView style={styles.root}>
      <Header title="Новая группа" onBack={() => navigation.goBack()} />
      <Form>
        <Text style={styles.text}>Введите название учебной группы</Text>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Field placeholder="Название" {...field} />}
          name="name"
        />
        <Button
          text="Создать"
          isCompact
          isPrimary
          onPress={handleSubmit(onSubmit)}
        />
      </Form>
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
  text: {
    fontFamily: 'Golos-Regular',
    color: '#000000',
    lineHeight: 20,
  },
});
