import { format } from 'date-fns';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { uuid4 } from '../../utils';
import { getMonth } from './calendarUtils';
import { CalendarWeek } from './CalendarWeek';

type Props = {
  date: Date | number;
  selectedDate: string;
  style?: StyleProp<ViewStyle>;
  onSelect?: (date: string) => void;
};

export const Calendar = ({ date, selectedDate, style, onSelect }: Props) => {
  const currentDate = format(date, 'DD.MM.YYYY');
  const month = getMonth(date);

  const monthList = month.map((week, index) => {
    return (
      <CalendarWeek
        key={uuid4()}
        week={week}
        style={{ marginBottom: index === month.length - 1 ? 0 : 4 }}
        onSelect={onSelect}
        monthDate={date}
        currentDate={currentDate}
        selectedDate={selectedDate}
      />
    );
  });

  return <View style={[styles.container, style]}>{monthList}</View>;
};

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 16,
    // paddingVertical: 8,
  },
});
