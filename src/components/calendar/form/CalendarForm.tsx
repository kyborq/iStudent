import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from '../Calendar';
import { addDateMonth } from '../calendarUtils';
import { CalendarFormHeader } from './CalendarFormHeader';

type Props = {
  selectedDate?: Date;
  date: number;
  onSelectDate?: (date: number) => void;
};

export const CalendarForm = ({ date, onSelectDate }: Props) => {
  const [formDate, setFormDate] = useState(date);

  useEffect(() => {
    setFormDate(date);
  }, [date]);

  const nextMonth = () => {
    const currentDate = new Date(formDate);
    const newDate = addDateMonth(currentDate, 1);
    setFormDate(newDate.valueOf());
  };

  const prevMonth = () => {
    const currentDate = new Date(formDate);
    const newDate = addDateMonth(currentDate, -1);
    setFormDate(newDate.valueOf());
  };

  const clearDate = () => {
    onSelectDate && onSelectDate(0);
  };

  return (
    <View style={styles.container}>
      <CalendarFormHeader
        date={formDate}
        onPrevMonth={prevMonth}
        onNextMonth={nextMonth}
        onClearDate={clearDate}
      />
      <Calendar
        selectedDate={date}
        date={formDate}
        style={styles.calendarStyle}
        onSelect={onSelectDate}
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
