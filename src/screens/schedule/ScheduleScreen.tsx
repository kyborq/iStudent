import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Empty } from '../../components/Empty';
import { Header } from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import { ScheduleWeek } from './components/ScheduleWeek';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { DateSelect } from './components/DateSelect';
import moment from 'moment';
import { ScheduleTasks } from './components/ScheduleTasks';

export const ScheduleScreen = () => {
  const [date, setDate] = useState(moment());

  const navigation = useNavigation();

  const theme = useAppSelector((state) => state.settings.theme);
  const todayTasks = useAppSelector((state) =>
    state.tasks.tasks.filter((t) => t.deadline === date.format('DD.MM.YYYY')),
  );

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
      <Header label="Мое расписание" onAction={() => {}} />
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
