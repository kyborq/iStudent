import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { Header } from '../../components/Header';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootParamList } from '../../components/Navigator';
import { Form } from '../../components/Form';
import { Button } from '../../components/Button';
import { Field } from '../../components/Field';

type CreateUserScreenProps = NativeStackScreenProps<
  RootParamList,
  'CreateUser'
>;

export const CreateUserScreen = ({
  navigation,
  route,
}: CreateUserScreenProps) => {
  const { group } = route.params;

  return (
    <SafeAreaView style={styles.root}>
      <Header title="Регистрация старосты" onBack={() => navigation.goBack()} />
      <Form>
        <Text style={styles.text}>
          Теперь, нужно создать профиль старосты, чтобы получить доступ к группе
          <Text style={styles.bold}> {group}</Text>
        </Text>
        <View style={styles.fields}>
          <Field placeholder="Имя Фамилия" />
          <Field placeholder="Логин" />
          <Field placeholder="Пароль" />
        </View>
        <Button text="Зарегистрироваться" isCompact isPrimary />
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
