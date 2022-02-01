import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Empty } from '../../components/Empty';
import { Header } from '../../components/Header';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { ScheduleWeek } from './components/ScheduleWeek';
import { ScheduleTasks } from './components/ScheduleTasks';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { addDateDays, getDate } from '../../components/calendar/calendarUtils';
import { DateSelect } from './components/DateSelect';

export const ScheduleScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const date = new Date().valueOf();
  const tasks = useAppSelector((state) =>
    state.tasks.tasks.filter(
      (task) =>
        getDate(task.date || 0) === getDate(date) &&
        !task.deleted &&
        !task.status,
    ),
  );

  const setDate = (date: number) => {
    // dispatch(setMainDate({ date }));
  };

  const showTask = (id: string) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'ViewTask',
        params: { id },
      }),
    );
  };

  const nextDay = () => {
    const currentDate = new Date(date);
    const newDate = addDateDays(currentDate, 1);
    // dispatch(setMainDate({ date: newDate.valueOf() }));
  };

  const prevDay = () => {
    const currentDate = new Date(date);
    const newDate = addDateDays(currentDate, -1);
    // dispatch(setMainDate({ date: newDate.valueOf() }));
  };

  return (
    <View style={styles.container}>
      <Header label="Мое расписание" onAction={() => {}} />
      <ScheduleWeek date={date} onSelect={setDate} />
      <DateSelect date={date} onPrev={prevDay} onNext={nextDay} />
      {tasks.length > 0 && <ScheduleTasks tasks={tasks} onPress={showTask} />}
      <ScrollView contentContainerStyle={styles.content}>
        <Empty text="Событий на сегодня нет" icon="calendar" />
      </ScrollView>
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
});
