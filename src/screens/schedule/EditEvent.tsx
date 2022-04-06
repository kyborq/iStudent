import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from '../../components/Header';
import { useAppDispatch } from '../../redux/store';
import { RootStackParamList } from '../../components/navigation/Navigation';
import { Select } from '../../components/inputs/Select';
import { Picker } from '../../components/inputs/Picker';
import { Button } from '../../components/inputs/Button';

export const EditEvent = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'EditEvent'>>();
  const id = route?.params?.id;
  const date = route?.params?.date;

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handleBack = () => {
    navigation.goBack();
  };

  const title = !!id ? 'Изменить расписание' : 'Добавить в расписание';

  return (
    <View style={styles.container}>
      <Header title={title} leftIcon="clear" onLeft={handleBack} />
      <ScrollView contentContainerStyle={styles.content}>
        <Select
          icon="book"
          items={[
            { title: 'Математика', value: '123' },
            { title: 'Русский', value: '123' },
          ]}
          label="Выберите предмет"
          value="Математика"
        />

        <Select
          icon="calendar"
          items={[
            { title: 'Раз в неделю', value: '1' },
            { title: 'По синим неделям', value: '2' },
            { title: 'По красным неделям', value: '3' },
          ]}
          label="Повторения"
          value="Раз в неделю"
        />

        <Select
          icon="edit"
          items={[
            { title: 'Лекция', value: '123' },
            { title: 'Практика', value: '123' },
            { title: 'Лабораторная работа', value: '123' },
            { title: 'Факультатив', value: '123' },
          ]}
          label="Тип занятия"
          value="Лекция"
        />

        <View style={{ flexDirection: 'row' }}>
          <Picker icon="time" label="Время начала" value="08:00"></Picker>
          <Picker icon="time" label="Время конца" value="09:35"></Picker>
        </View>
      </ScrollView>
      <View style={{ paddingHorizontal: 24, paddingBottom: 24 }}>
        <Button label="Сохранить" primary />
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
    // paddingHorizontal: 24,
    flexGrow: 1,
  },
  scroll: {
    paddingHorizontal: 24,
    overflow: 'visible',
    paddingBottom: 8,
    marginBottom: -16,
    paddingTop: 12,
    marginTop: -12,
  },
});
