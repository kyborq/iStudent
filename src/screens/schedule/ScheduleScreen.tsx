import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Empty } from '../../components/Empty';
import { Header } from '../../components/Header';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { ScheduleWeek } from './components/ScheduleWeek';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { DateSelect } from './components/DateSelect';
import moment from 'moment';
import { ScheduleTasks } from './components/ScheduleTasks';
import { ScheduleCard } from './components/ScheduleCard';
import { uuid4 } from '../../utils';
import { sortEvents } from './scheduleUtils';
import useInterval from '../../hooks/useInterval';

export const ScheduleScreen = () => {
  const [date, setDate] = useState(moment());
  const [currentDate, setCurrentDate] = useState(moment().format('HH:mm'));

  useInterval(() => {
    setCurrentDate(moment().format('HH:mm'));
  }, 1000);

  const navigation = useNavigation();

  const theme = useAppSelector((state) => state.settings.theme);
  const todayTasks = useAppSelector((state) =>
    state.tasks.tasks.filter((t) => t.deadline === date.format('DD.MM.YYYY')),
  );
  const events = useAppSelector((state) =>
    state.schedule.schedule.filter(
      (event) => event.date === date.format('DD.MM.YYYY'),
    ),
  );
  const todayEvents = sortEvents(events);

  const handleAddEvent = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'EditEvent',
      }),
    );
  };

  const handleSetDate = (date: string) => {
    const newDate = moment(date, 'DD.MM.YYYY');
    setDate(newDate);
  };

  const nextDay = () => {
    setDate(date.clone().add(1, 'd'));
  };

  const prevDay = () => {
    setDate(date.clone().subtract(1, 'd'));
  };

  return (
    <View style={styles.container}>
      <Header label="Мое расписание" onAction={handleAddEvent} />
      <ScheduleWeek
        date={date.format('DD.MM.YYYY')}
        color={theme}
        onSelectDate={handleSetDate}
      />
      <DateSelect
        date={date.format('DD.MM.YYYY')}
        onPrev={prevDay}
        onNext={nextDay}
      />
      {todayTasks.length > 0 && <ScheduleTasks tasks={todayTasks} />}
      <ScrollView contentContainerStyle={styles.content}>
        <View>
          {todayEvents.map((event) => (
            <ScheduleCard
              key={uuid4()}
              event={event}
              current={
                currentDate > event.time.start && currentDate < event.time.end
              }
              past={currentDate > event.time.end}
            />
          ))}
        </View>
        {/* <Empty text="Событий на сегодня нет" icon="calendar" /> */}
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
    paddingTop: 16,
  },
});
