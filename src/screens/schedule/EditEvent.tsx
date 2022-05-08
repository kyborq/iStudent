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
import {
  addEvent,
  editEvent,
  TSchedule,
  WeekDays,
} from '../../redux/scheduleSlice';
import { uuid4 } from '../../utils/uuid4';
import { getISODay } from 'date-fns';
import { addToTime, getCurrentTime } from './scheduleUtils';
import { Input } from '../../components/inputs/Input';
import { strings } from '../../localizations/localization';

const weekdays = [
  { title: strings.week.monday, value: '1' },
  { title: strings.week.tuesday, value: '2' },
  { title: strings.week.wednesday, value: '3' },
  { title: strings.week.thursday, value: '4' },
  { title: strings.week.friday, value: '5' },
  { title: strings.week.saturday, value: '6' },
  { title: strings.week.sunday, value: '7' },
];

const repeating = [
  { title: strings.repeating.onceAtWeek, value: '1' },
  { title: strings.repeating.onBlueWeek, value: '2' },
  { title: strings.repeating.onRedWeek, value: '3' },
];

export const EditEvent = () => {
  const [startPicker, setStartPicker] = useState(false);
  const [endPicker, setEndPicker] = useState(false);

  const route = useRoute<RouteProp<RootStackParamList, 'EditEvent'>>();
  const id = route?.params?.id;
  const date = route?.params?.date;

  const event = useAppSelector((state) =>
    state.schedule.schedule.find((s) => s.id === id),
  );

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const subjects = useAppSelector((s) =>
    s.subjects.subjects.filter((s) => !s.archived),
  );

  const [eventDraft, setEventDraft] = useState<TSchedule>(
    event || {
      id: uuid4(),
      subject: `${subjects[0]?.id || ''}`,
      repeats: {
        index: getISODay(date || new Date()),
        period: 1,
        time: {
          start: getCurrentTime(new Date()),
          end: addToTime(getCurrentTime(new Date()), '01:35'),
        },
      },
    },
  );

  const handleBack = () => {
    navigation.goBack();
  };

  const title = !!id ? strings.editEvent : strings.newEvent;

  const handleAddEvent = () => {
    (event && dispatch(editEvent(eventDraft))) ||
      dispatch(addEvent(eventDraft));
    handleBack();
  };

  return (
    <View style={styles.container}>
      <Header title={title} leftIcon="back" onLeft={handleBack} />
      <ScrollView contentContainerStyle={styles.content}>
        {!!subjects.length && (
          <Select
            icon="book"
            items={subjects.map((s) => ({ title: s.title, value: s.id }))}
            label={strings.subject}
            value={subjects.find((s) => s.id === eventDraft.subject)?.title}
            onSelect={(item) => {
              setEventDraft({ ...eventDraft, subject: item as string });
            }}
          />
        )}
        {!subjects.length && (
          <Input
            icon="book"
            label={strings.name}
            value={eventDraft.subject}
            onChange={(value) =>
              setEventDraft({ ...eventDraft, subject: value })
            }
            style={{ marginHorizontal: 24 }}
          />
        )}

        <Input
          icon="book"
          label={strings.classRoom}
          value={eventDraft.room}
          onChange={(value) => setEventDraft({ ...eventDraft, room: value })}
          style={{ marginHorizontal: 24 }}
        />

        <Select
          icon="calendar"
          items={repeating}
          label={strings.repeats}
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
          label={strings.dayOfWeek}
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
          <Picker
            icon="time"
            label={strings.startTime}
            value={eventDraft.repeats?.time?.start}
            visible={startPicker}
            handleShow={() => setStartPicker(true)}
            handleHide={() => setStartPicker(false)}>
            <TimePicker
              value={eventDraft.repeats?.time?.start}
              onSubmit={(time) => {
                setStartPicker(false);
                setEventDraft({
                  ...eventDraft,
                  repeats: {
                    ...eventDraft.repeats,
                    time: {
                      start: time || '',
                      end: addToTime(time || '', '01:35'),
                    },
                  },
                });
              }}
            />
          </Picker>
          <Picker
            icon="time"
            label={strings.endTime}
            value={eventDraft.repeats?.time?.end}
            visible={endPicker}
            handleShow={() => setEndPicker(true)}
            handleHide={() => setEndPicker(false)}>
            <TimePicker
              value={eventDraft.repeats?.time?.end}
              onSubmit={(time) => {
                setEndPicker(false);
                setEventDraft({
                  ...eventDraft,
                  repeats: {
                    ...eventDraft.repeats,
                    time: {
                      start: eventDraft.repeats?.time?.start || '',
                      end: time || '',
                    },
                  },
                });
              }}
            />
          </Picker>
        </View>
      </ScrollView>
      <View style={{ paddingHorizontal: 24, paddingBottom: 24 }}>
        <Button label={strings.save} primary onPress={handleAddEvent} />
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
