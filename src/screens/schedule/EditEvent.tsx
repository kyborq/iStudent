import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from '../../components/Header';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { RootStackParamList } from '../../components/navigation/Navigation';
import { Select } from '../../components/inputs/Select';
import { Picker } from '../../components/inputs/Picker';
import { Button } from '../../components/inputs/Button';
import { TimePicker } from '../../components/TImePicker';
import { TSchedule, WeekDays } from '../../redux/scheduleSlice';
import { uuid4 } from '../../utils/uuid4';
import { getISODay } from 'date-fns';

const weekdays = [
  { title: 'Понедельник', value: '1' },
  { title: 'Вторник', value: '2' },
  { title: 'Среда', value: '3' },
  { title: 'Четверг', value: '4' },
  { title: 'Пятница', value: '5' },
  { title: 'Суббота', value: '6' },
  { title: 'Воскресенье', value: '7' },
];

const repeating = [
  { title: 'Раз в неделю', value: '1' },
  { title: 'По синим неделям', value: '2' },
  { title: 'По красным неделям', value: '3' },
];

export const EditEvent = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'EditEvent'>>();
  const id = route?.params?.id;
  const date = route?.params?.date;

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const subjects = useAppSelector((s) =>
    s.subjects.subjects.filter((s) => !s.archived),
  );

  const [eventDraft, setEventDraft] = useState<TSchedule>({
    id: uuid4(),
    subject: `${subjects[0]?.id}`,
    repeats: {
      index: getISODay(date || new Date()),
      period: 1,
    },
  });

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
          items={subjects.map((s) => ({ title: s.title, value: s.id }))}
          label="Выберите предмет"
          value={subjects.find((s) => s.id === eventDraft.subject)?.title}
          onSelect={(item) => {
            setEventDraft({ ...eventDraft, subject: item as string });
          }}
        />

        <Select
          icon="calendar"
          items={repeating}
          label="Повторения"
          value={
            repeating.find((r) => r.value === `${eventDraft.repeats?.period}`)
              ?.title
          }
          onSelect={(value) => {
            setEventDraft({
              ...eventDraft,
              repeats: {
                ...eventDraft.repeats,
                period: parseInt(value as string) as 1 | 2 | 3,
              },
            });
          }}
        />

        <Select
          icon="calendar"
          items={weekdays}
          label="День недели"
          value={
            weekdays.find((w) => w.value === `${eventDraft.repeats?.index}`)
              ?.title
          }
          onSelect={(value) => {
            setEventDraft({
              ...eventDraft,
              repeats: {
                ...eventDraft.repeats,
                index: parseInt(value as string),
              },
            });
          }}
        />

        <View style={{ flexDirection: 'row' }}>
          <Picker icon="time" label="Время начала" value="08:00">
            <TimePicker
              onSubmit={(time) => {
                console.log(time);
              }}
            />
          </Picker>
          <Picker icon="time" label="Время конца" value="09:35">
            <TimePicker />
          </Picker>
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
