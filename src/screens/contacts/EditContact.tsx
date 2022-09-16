import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '../../components/button/Button';
import { Input } from '../../components/inputs/Input';
import { RootStackParamList } from '../../components/navigation/Navigation';
import { Avatar } from '../../components/UI/Avatar';

import { Header } from '../../components/UI/Header';
import { addContact, TContact } from '../../redux/contactsSlice';
import { useAppDispatch } from '../../redux/store';
import { randomColor } from '../../utils/randomColor';
import { uuid4 } from '../../utils/uuid4';

export const EditContact = () => {
  const [contact, setContact] = useState<TContact>({
    id: uuid4(),
    name: '',
    link: '',
    mail: '',
    phone: '',
    color: randomColor(),
  });

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const route = useRoute<RouteProp<RootStackParamList, 'EditContact'>>();
  const id = route?.params?.id;

  const title = !!id ? 'Изменить контакт' : 'Новый контакт';

  const contactNameLetters = contact.name
    .split(' ')
    .map((item, index) => (!!item && index < 2 ? item[0].toUpperCase() : ''))
    .join('');

  const handleBack = () => navigation.goBack();
  const getColor = () => setContact({ ...contact, color: randomColor() });

  const handleSave = () => {
    dispatch(addContact(contact));
    handleBack();
  };

  return (
    <View style={styles.container}>
      <Header title={title} leftActionIcon="back" leftAction={handleBack} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.centered}>
          <Avatar
            letters={contactNameLetters}
            onPress={getColor}
            color={contact.color}
          />
        </View>

        <Input
          icon="user"
          placeholder="Имя"
          style={styles.input}
          value={contact.name}
          onChange={(name) => setContact({ ...contact, name })}
        />
        <Input
          icon="user"
          placeholder="Телефон"
          style={styles.input}
          value={contact.phone}
          onChange={(phone) => setContact({ ...contact, phone })}
        />
        <Input
          icon="user"
          placeholder="Сайт"
          style={styles.input}
          value={contact.link}
          onChange={(link) => setContact({ ...contact, link })}
        />
        <Input
          icon="user"
          placeholder="Почта"
          style={styles.input}
          value={contact.mail}
          onChange={(mail) => setContact({ ...contact, mail })}
        />
      </ScrollView>

      <View style={styles.footer}>
        <Button primary label="Сохранить" onPress={handleSave} />
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
    paddingHorizontal: 32,
    flexGrow: 1,
  },
  input: {
    marginBottom: 16,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 48,
    marginTop: 16,
  },
  footer: {
    paddingHorizontal: 32,
    paddingBottom: 32,
    paddingTop: 32,
    backgroundColor: '#fff',
  },
});
