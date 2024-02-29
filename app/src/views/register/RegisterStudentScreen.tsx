import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { CreateUserName } from '../../api/models/userModel';
import { Button } from '../../components/Button';
import { Field } from '../../components/Field';
import { Header } from '../../components/Header';
import { RootParamList } from '../../components/navigation/Navigator';

type RegisterScreenProps = NativeStackScreenProps<
  RootParamList,
  'RegisterStudent'
>;

export const RegisterStudentScreen = ({
  route,
  navigation,
}: RegisterScreenProps) => {
  const { author, group } = route.params;

  const { control, handleSubmit } = useForm<CreateUserName>();

  const onSubmit = (data: CreateUserName) => {
    navigation.navigate('RegisterCredentials', {
      name: data.name,
      group,
    });
  };

  return (
    <SafeAreaView style={styles.root}>
      <Header
        title="Добро пожаловать!"
        onBack={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.form}>
        <Text style={styles.info}>
          <Text style={styles.bold}>{author} </Text>
          <Text>хочет пригласить вас в учебную группу</Text>
          <Text style={styles.bold}> {group}</Text>
          <Text>. чтобы принять приглашение, введите свое имя</Text>
        </Text>

        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Field placeholder="Ваше имя" {...field} />}
        />

        <Button
          text="Присоединиться"
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
});
