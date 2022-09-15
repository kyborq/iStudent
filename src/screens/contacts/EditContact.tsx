import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '../../components/button/Button';
import { Input } from '../../components/inputs/Input';
import { RootStackParamList } from '../../components/navigation/Navigation';
import { Avatar } from '../../components/UI/Avatar';

import { Header } from '../../components/UI/Header';

export const EditContact = () => {
  const navigation = useNavigation();

  const route = useRoute<RouteProp<RootStackParamList, 'EditContact'>>();
  const id = route?.params?.id;

  const title = !!id ? 'Изменить контакт' : 'Новый контакт';

  const handleBack = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <Header title={title} leftActionIcon="back" leftAction={handleBack} />
      <View style={styles.content}>
        <View style={styles.centered}>
          <Avatar />
        </View>
        <Input icon="user" placeholder="ФИО" style={styles.input} />
        <Input icon="user" placeholder="Телефон" style={styles.input} />
        <Input icon="user" placeholder="Сайт" style={styles.input} />
        <Input icon="user" placeholder="Почта" style={styles.input} />
      </View>
      <View style={styles.footer}>
        <Button primary label="Сохранить" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    flex: 1,
  },
  input: {
    marginBottom: 16,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  footer: {
    paddingHorizontal: 32,
    paddingBottom: 32,
  },
});
