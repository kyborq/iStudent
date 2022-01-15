import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { uuid4 } from '../../utils';
import { getMonthArray } from './calendarUtils';
import { CalendarWeek } from './CalendarWeek';

type Props = {
  date: Date;
  style?: StyleProp<ViewStyle>;
};

export const Calendar = ({ date, style }: Props) => {
  const month = getMonthArray(date);
  const monthList = month.map((week, index) => {
    return (
      <CalendarWeek
        key={uuid4()}
        date={date}
        week={week}
        style={{ marginBottom: index === month.length - 1 ? 0 : 8 }}
      />
    );
  });

  return <View style={[styles.container, style]}>{monthList}</View>;
};

const styles = StyleSheet.create({
  container: {},
});
