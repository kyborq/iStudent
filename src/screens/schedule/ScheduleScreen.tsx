import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Header } from '../../components/Header';
import { DateSelect } from './components/DateSelect';
import { ScheduleCard } from './components/ScheduleCard';
import { WeekSelect } from './components/WeekSelect';

export const ScheduleScreen = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSelectDate = () => {
    // ...
  };

  const handleSelectDay = (newDate: number | Date) => {
    setSelectedDate(new Date(newDate));
  };

  return (
    <View style={styles.container}>
      <Header
        title="Расписание"
        rightIcon="calendar"
        onRight={handleSelectDate}
      />
      <WeekSelect
        date={selectedDate}
        currentDate={date}
        onSelect={handleSelectDay}
      />
      <DateSelect date={selectedDate} />
      <ScrollView contentContainerStyle={styles.content}>
        <ScheduleCard
          title="Объектно-ориентированное программирование"
          start="09:45"
          end="11:20"
        />
        <ScheduleCard title="История россии" start="11:30" end="13:05" />
        {/* <ScheduleCard title="Старостат" start="13:05" end="13:30" /> */}
        <ScheduleCard title="Иностранный язык" start="13:30" end="15:05" />
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
