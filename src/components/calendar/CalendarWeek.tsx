import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { uuid4 } from '../../utils';
import { CalendarDay } from './CalendarDay';
import { getDate } from './calendarUtils';

type Props = {
  week: Date[];
  date: Date;
  selected?: Date;
  style?: StyleProp<ViewStyle>;
  onSelect?: (date: Date) => void;
};

export const CalendarWeek = ({
  week,
  style,
  date,
  selected,
  onSelect,
}: Props) => {
  const weekList = week.map((d) => (
    <CalendarDay
      key={uuid4()}
      date={d}
      active={getDate(date, 'month') === getDate(d, 'month')}
      current={getDate(new Date()) === getDate(d)}
      selected={getDate(selected || date) === getDate(d)}
      onPress={onSelect}
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
