import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import DateTimePicker, {
  DateTimePickerResult,
} from '@react-native-community/datetimepicker';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from '../../components/Header';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { addEvent, TEvent } from '../../redux/scheduleSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { TSubject } from '../../redux/subjectsSlice';
import { uuid4 } from '../../utils';
import moment from 'moment';
import { FakeInput } from '../../components/inputs/FakeInput';
import { Button } from '../../components/inputs/Button';

const repeats = ['Каждый день', 'Каждую неделю', 'Каждые две недели'];

export const EditEvent = () => {
  const [eventDraft, setEventDraft] = useState<TEvent>({
    id: uuid4(),
    title: '',
    date: moment().format('DD.MM.YYYY'),
    time: {
      start: moment().format('HH:mm'),
      end: moment().add(1, 'hour').add(45, 'minute').format('HH:mm'),
    },
  });
  const [startPickerVisible, setStartPickerVisible] = useState(false);
  const [endPickerVisible, setEndPickerVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const subjects = useAppSelector((state) =>
    state.subjects.subjects.filter((s) => !s.archived),
  );

  const onStartTimeChange = (event: Event, selectedDate?: Date) => {
    const date = moment(selectedDate);
    const endDate = moment(selectedDate).add(1, 'hour').add(45, 'minute');

    const startHour = date.format('HH:mm');

    setEventDraft({
      ...eventDraft,
      time: {
        ...eventDraft.time,
        start: startHour,
        end: endDate.format('HH:mm'),
      },
    });

    setStartPickerVisible(false);
  };

  const onEndTimeChange = (event: Event, selectedDate?: Date) => {
    const date = moment(selectedDate);
    const endHour = date.format('HH:mm');

    setEventDraft({
      ...eventDraft,
      time: {
        ...eventDraft.time,
        end: endHour,
      },
    });

    setEndPickerVisible(false);
  };

  const onDateChange = (event: Event, selectedDate?: Date) => {
    const date = moment(selectedDate);
    const eventDate = date.format('DD.MM.YYYY');

    setEventDraft({
      ...eventDraft,
      date: eventDate,
    });

    setDatePickerVisible(false);
  };

  const onSubjectChange = (id?: string) => {
    const subjectName = subjects.find((s) => s.id === id)?.title;
    setEventDraft({
      ...eventDraft,
      title: (id && subjectName) || '',
      subject: id,
    });
  };

  const onShowEndTime = () => {
    setEndPickerVisible(true);
  };

  const onShowStartTime = () => {
    setStartPickerVisible(true);
  };

  const onShowDate = () => {
    setDatePickerVisible(true);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSave = () => {
    dispatch(addEvent(eventDraft));
    handleBack();
  };

  const onChangeRepeat = (id?: string) => {
    setEventDraft({
      ...eventDraft,
      repeat: (!!id && parseInt(id)) || undefined,
    });
  };

  return (
    <View style={styles.container}>
      <Header label="Добавить занятие" onBack={handleBack} />
      <ScrollView contentContainerStyle={styles.content}>
        {!eventDraft.subject && (
          <Input
            label="Название занятия"
            placeholder="Пара по информатике"
            value={eventDraft.title}
            onChange={(text) => setEventDraft({ ...eventDraft, title: text })}
            multiline
          />
        )}
        <Select
          label="Предмет"
          items={subjects.map((subject) => {
            return { title: subject.title, value: subject.id };
          })}
          placeholder={'Не выбрано'}
          value={subjects.find((s) => s.id === eventDraft.subject)?.title}
          onSelect={onSubjectChange}
        />

        <FakeInput
          label="Дата"
          placeholder={eventDraft.date}
          value={eventDraft.date}
          active={datePickerVisible}
          onPress={onShowDate}
        />
        <View style={{ flexDirection: 'row' }}>
          <FakeInput
            label="Начало"
            placeholder="00:00"
            value={eventDraft.time.start}
            style={{ flex: 1 }}
            active={startPickerVisible}
            onPress={onShowStartTime}
          />
          <FakeInput
            label="Конец"
            placeholder="00:00"
            active={endPickerVisible}
            value={eventDraft.time.end}
            style={{ flex: 1, marginLeft: 16 }}
            onPress={onShowEndTime}
          />
        </View>
        {/* <Select
          label="Повторять"
          items={repeats.map((r, i) => {
            return { title: r, value: `${i + 1}` };
          })}
          placeholder={'Не повторять'}
          value={repeats.find((s, i) => i + 1 === eventDraft.repeat && s)}
          onSelect={onChangeRepeat}
        /> */}
      </ScrollView>
      <View style={{ padding: 24 }}>
        <Button
          label="Сохранить"
          primary
          disabled={eventDraft.subject === ''}
          onPress={handleSave}
        />
      </View>

      {startPickerVisible && (
        <DateTimePicker
          style={{ padding: 20 }}
          value={moment(eventDraft.time.start, 'HH:mm').toDate()}
          mode="time"
          is24Hour
          display="default"
          onChange={onStartTimeChange}
          onTouchCancel={() => setStartPickerVisible(false)}
        />
      )}

      {endPickerVisible && (
        <DateTimePicker
          style={{ padding: 20 }}
          value={moment(eventDraft.time.end, 'HH:mm').toDate()}
          mode="time"
          is24Hour
          display="default"
          onChange={onEndTimeChange}
          onTouchCancel={() => setEndPickerVisible(false)}
        />
      )}

      {datePickerVisible && (
        <DateTimePicker
          style={{ padding: 20 }}
          value={moment(eventDraft.date, 'DD.MM.YYYY').toDate()}
          mode="date"
          display="default"
          onChange={onDateChange}
          onTouchCancel={() => setDatePickerVisible(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
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
