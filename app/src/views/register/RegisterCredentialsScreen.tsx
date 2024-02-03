import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { Header } from '../../components/Header';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootParamList } from '../../components/Navigator';
import { Button } from '../../components/Button';
import { Controller, useForm } from 'react-hook-form';
import { CreateUserCredentials } from '../../api/models/userModel';
import { Field } from '../../components/Field';

type RegisterCredentialsScreenProps = NativeStackScreenProps<
  RootParamList,
  'RegisterCredentials'
>;

export const RegisterCredentialsScreen = ({
  navigation,
  route,
}: RegisterCredentialsScreenProps) => {
  const { name } = route.params;

  const { control, handleSubmit } = useForm<CreateUserCredentials>();

  const onSubmit = (data: CreateUserCredentials) => {
    // ...
  };

  return (
    <SafeAreaView style={styles.root}>
      <Header
        title="Почти закончили"
        onBack={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.form}>
        <Text style={styles.info}>
          Привет, <Text style={styles.bold}>{name}</Text>! Чтобы получить доступ
          к группе позднее, придумайте логин и пароль
        </Text>

        <View style={styles.fields}>
          <Controller
            control={control}
            rules={{ required: true }}
            name="login"
            render={({ field }) => <Field placeholder="Логин" {...field} />}
          />
          <Controller
            control={control}
            rules={{ required: true }}
            name="password"
            render={({ field }) => <Field placeholder="Пароль" {...field} />}
          />
        </View>

        <Button
          text="Зарегистрироваться"
          isPrimary
          isCompact
          onPress={handleSubmit(onSubmit)}
        />
      </View>
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
  form: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    paddingHorizontal: 25,
    paddingVertical: 20,
    shadowColor: '#dee2e6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 16,
    gap: 16,
  },
  info: {
    color: '#000000',
    fontFamily: 'Golos-Regular',
    lineHeight: 20,
  },
  bold: {
    fontFamily: 'Golos-Bold',
  },
  fields: {
    gap: 4,
  },
});
