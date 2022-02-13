import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from '../Calendar';
import { CalendarHeader } from './CalendarHeader';

type Props = {
  date: string;
  onSelectDate?: (date: string) => void;
};

export const CalendarForm = ({ date, onSelectDate }: Props) => {
  const [currentDate, setCurrentDate] = useState(moment(date, 'DD.MM.YYYY'));
  const month = currentDate.format('MMMM');

  const nextMonth = () => {
    const newDate = currentDate.clone().add(1, 'M');
    setCurrentDate(newDate);
  };

  const prevMonth = () => {
    const newDate = currentDate.clone().subtract(1, 'M');
    setCurrentDate(newDate);
  };

  const clearDate = () => {
    onSelectDate && onSelectDate('');
  };

  const setDate = (date: string) => {
    onSelectDate && onSelectDate(date);
  };

  return (
    <View style={styles.container}>
      <CalendarHeader
        month={month}
        onPrevMonth={prevMonth}
        onNextMonth={nextMonth}
        onClearDate={clearDate}
      />
      <Calendar
        date={currentDate.format('DD.MM.YYYY')}
        selectedDate={date}
        style={styles.calendarStyle}
        onSelect={setDate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
  },
  calendarStyle: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
});
