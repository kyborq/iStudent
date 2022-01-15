import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { uuid4 } from '../../utils';
import { CalendarDay } from './CalendarDay';
import { getDate } from './calendarUtils';

type Props = {
  week: Date[];
  date: Date;
  style?: StyleProp<ViewStyle>;
};

export const CalendarWeek = ({ week, style, date }: Props) => {
  const weekList = week.map((d) => (
    <CalendarDay
      key={uuid4()}
      label={getDate(d, 'day')}
      active={getDate(date, 'month') === getDate(d, 'month')}
      current={getDate(date) === getDate(d)}
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
