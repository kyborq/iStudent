import { format, parse } from 'date-fns';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { uuid4 } from '../../utils';
import { CalendarDay } from './CalendarDay';

type Props = {
  week: string[];
  monthDate?: Date | number;
  currentDate?: string;
  selectedDate?: string;
  style?: StyleProp<ViewStyle>;
  onSelect?: (date: string) => void;
};

export const CalendarWeek = ({
  week,
  style,
  monthDate,
  currentDate,
  selectedDate,
  onSelect,
}: Props) => {
  const weekList = week.map((date) => {
    const parsedDate = parse(date, 'dd.MM.yyyy', new Date());

    const day = format(parsedDate, 'dd');
    const currentDay = format(new Date(), 'dd.MM.yyyy');

    const month = format(parsedDate, 'MM');
    const selectedMonth = format(monthDate as Date | number, 'MM');

    return (
      <CalendarDay
        key={uuid4()}
        day={day}
        onPress={() => onSelect && onSelect(date)}
        current={currentDay === date}
        selected={selectedDate === date}
        month={month === selectedMonth}
      />
    );
  });

  return <View style={[styles.container, style]}>{weekList}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
