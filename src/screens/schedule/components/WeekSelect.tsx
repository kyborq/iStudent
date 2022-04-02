import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { getWeekArray, isDateEven, isEqualDates } from '../../../utils/date';
import { uuid4 } from '../../../utils/uuid4';
import { WeekDay } from './WeekDay';

type Props = {
  date: number | Date;
  currentDate: number | Date;
  onSelect?: (date: number | Date) => void;
};

export const WeekSelect = ({ date, currentDate, onSelect }: Props) => {
  const { width } = Dimensions.get('window');
  const weekArray = getWeekArray(date);

  const week = weekArray.map((day, index) => {
    return (
      <WeekDay
        key={uuid4()}
        date={day.date}
        selected={isEqualDates(day.date, new Date(date))}
        current={isEqualDates(day.date, new Date(currentDate))}
        color={isDateEven(day.date, 'week') ? 'blue' : 'red'}
        onSelect={onSelect}
      />
    );
  });

  return <View style={[styles.container, { width }]}>{week}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
});
