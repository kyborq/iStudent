import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { uuid4 } from '../../utils';
import { getMonthArray } from './calendarUtils';
import { CalendarWeek } from './CalendarWeek';

type Props = {
  date: Date;
  selected?: Date;
  style?: StyleProp<ViewStyle>;
  onSelect?: (date: Date) => void;
};

export const Calendar = ({ date, selected, style, onSelect }: Props) => {
  const month = getMonthArray(date);
  const monthList = month.map((week, index) => {
    return (
      <CalendarWeek
        key={uuid4()}
        date={date}
        week={week}
        style={{ marginBottom: index === month.length - 1 ? 0 : 8 }}
        onSelect={onSelect}
        selected={selected}
      />
    );
  });

  return <View style={[styles.container, style]}>{monthList}</View>;
};

const styles = StyleSheet.create({
  container: {},
});
