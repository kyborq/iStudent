import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Credentials } from '../../api/models/authModel';
import { Button } from '../../components/Button';
import { Field } from '../../components/Field';
import { Header } from '../../components/Header';
import { RootParamList } from '../../components/Navigator';
import { useLogin } from './hooks/useLogin';

type RegisterScreenProps = NativeStackScreenProps<RootParamList, 'Login'>;

export const LoginScreen = ({ route, navigation }: RegisterScreenProps) => {
  const { control, handleSubmit } = useForm<Credentials>();
  const { loginUser, error } = useLogin();

  const onSubmit = (data: Credentials) => {
    loginUser(data);
  };

  return (
    <SafeAreaView style={styles.root}>
      <Header
        title="Войти"
        onBack={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.form}>
        <Text style={styles.info}>
          Войдите в профиль, чтобы получить доступ к учебной группе
        </Text>

        {!!error && <Text>{error.message}</Text>}

        <View style={styles.fields}>
          <Controller
            name="login"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Field placeholder="Логин" {...field} />}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Field placeholder="Пароль" {...field} />}
          />
        </View>

        <Button
          text="Войти"
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
