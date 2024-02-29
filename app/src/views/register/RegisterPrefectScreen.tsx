import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { CreateUser } from '../../api/models/userModel';
import { Button } from '../../components/Button';
import { Field } from '../../components/Field';
import { Form } from '../../components/Form';
import { Header } from '../../components/Header';
import { RootParamList } from '../../components/navigation/Navigator';
import { useRegisterPrefect } from './hooks/useRegisterPrefect';

type CreateUserScreenProps = NativeStackScreenProps<
  RootParamList,
  'RegisterPrefect'
>;

export const RegisterPrefectScreen = ({
  navigation,
  route,
}: CreateUserScreenProps) => {
  const { group } = route.params;

  const { control, handleSubmit } = useForm<CreateUser>({
    values: {
      group,
      name: '',
      login: '',
      password: '',
    },
  });

  const { registerPrefect } = useRegisterPrefect();

  const onSubmit = (data: CreateUser) => {
    registerPrefect(data);
  };

  return (
    <SafeAreaView style={styles.root}>
      <Header title="Регистрация старосты" onBack={() => navigation.goBack()} />
      <Form>
        <Text style={styles.text}>
          Теперь, нужно создать профиль старосты, чтобы получить доступ к группе
          <Text style={styles.bold}> {group}</Text>
        </Text>
        <View style={styles.fields}>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Field placeholder="Имя" {...field} />}
            name="name"
          />
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Field placeholder="Логин" {...field} />}
            name="login"
          />
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Field placeholder="Пароль" {...field} />}
            name="password"
          />
        </View>
        <Button
          text="Зарегистрироваться"
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
  bold: {
    fontFamily: 'Golos-Bold',
  },
  fields: {
    gap: 4,
  },
});
