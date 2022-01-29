import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { uuid4 } from '../../utils';
import { CalendarDay } from './CalendarDay';
import { getDate } from './calendarUtils';

type Props = {
  week: number[];
  selectedDate: number;
  style?: StyleProp<ViewStyle>;
  onSelect?: (date: number) => void;
};

export const CalendarWeek = ({
  week,
  style,
  selectedDate,
  onSelect,
}: Props) => {
  const currentDate = new Date().valueOf();

  const weekList = week.map((date) => (
    <CalendarDay
      key={uuid4()}
      date={date}
      onPress={onSelect}
      current={getDate(date) === getDate(currentDate)}
      selected={getDate(selectedDate) === getDate(date)}
      month={true}
    />
  ));

  return <View style={[styles.container, style]}>{weekList}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
