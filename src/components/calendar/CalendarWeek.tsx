import moment from 'moment';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { uuid4 } from '../../utils';
import { CalendarDay } from './CalendarDay';

type Props = {
  week: string[];
  monthDate?: string;
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
  const weekList = week.map((date) => (
    <CalendarDay
      key={uuid4()}
      day={moment(date, 'DD.MM.YYYY').format('DD')}
      month={
        moment(date, 'DD.MM.YYYY').format('MM') ===
        moment(monthDate, 'DD.MM.YYYY').format('MM')
      }
      onPress={() => onSelect && onSelect(date)}
      current={currentDate === date}
      selected={selectedDate === date}
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
