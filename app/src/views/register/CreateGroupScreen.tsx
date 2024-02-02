import { SafeAreaView, StyleSheet, Text } from 'react-native';

import { Header } from '../../components/Header';
import { Form } from '../../components/Form';
import { Button } from '../../components/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootParamList } from '../../components/Navigator';
import { Field } from '../../components/Field';
import { Controller, useForm } from 'react-hook-form';
import { CreateGroup } from '../../api/models/groupModel';

type CreateGroupScreenProps = NativeStackScreenProps<
  RootParamList,
  'CreateGroup'
>;

export const CreateGroupScreen = ({ navigation }: CreateGroupScreenProps) => {
  const { control, handleSubmit } = useForm<CreateGroup>();

  const onSubmit = (data: CreateGroup) => {
    navigation.navigate('CreateUser', {
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
