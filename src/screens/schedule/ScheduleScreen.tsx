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
  const [currentDate, setCurrentDate] = useState(
    moment().format('DD.MM.YYYY HH:mm'),
  );

  useInterval(() => {
    setCurrentDate(moment().format('DD.MM.YYYY HH:mm'));
  }, 1000);

  const navigation = useNavigation();

  const theme = useAppSelector((state) => state.settings.theme);
  const todayTasks = useAppSelector((state) =>
    state.tasks.tasks.filter((t) => t.deadline === date.format('DD.MM.YYYY')),
  );
  const events = useAppSelector((state) =>
    state.schedule.schedule.filter(
      (event) =>
        event.date === date.format('DD.MM.YYYY') ||
        event.repeat === 1 ||
        (event.repeat === 2 &&
          date.isoWeekday() % moment(event.date, 'DD.MM.YYYY').isoWeekday() ===
            0) ||
        (event.repeat === 3 &&
          date.week() % moment(event.date, 'DD.MM.YYYY').week() === 2 &&
          moment(event.date, 'DD.MM.YYYY').isoWeekday() % date.isoWeekday() ===
            0),
    ),
  );
  const todayEvents = sortEvents(events);

  const handleAddEvent = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'EditEvent',
        params: {
          date: date.format('DD.MM.YYYY'),
        },
      }),
    );
  };

  const handleShowEvent = (id: string) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'ViewEvent',
        params: { id: id },
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
  // console.log(date.isoWeekday());

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
          {todayEvents.map((event) => {
            return (
              <ScheduleCard
                key={uuid4()}
                event={event}
                current={
                  currentDate >= `${event.date} ${event.time.start}` &&
                  currentDate <= `${event.date} ${event.time.end}`
                }
                past={currentDate > `${event.date} ${event.time.end}`}
                color={theme}
                onPress={handleShowEvent}
              />
            );
          })}
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
