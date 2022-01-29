import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { uuid4 } from '../../utils';
import { getMonthArray } from './calendarUtils';
import { CalendarWeek } from './CalendarWeek';

type Props = {
  date: number;
  selectedDate: number;
  style?: StyleProp<ViewStyle>;
  onSelect?: (date: number) => void;
};

export const Calendar = ({ date, selectedDate, style, onSelect }: Props) => {
  const month = getMonthArray(date);

  const monthList = month.map((week, index) => {
    return (
      <CalendarWeek
        key={uuid4()}
        week={week}
        selectedDate={selectedDate}
        style={{ marginBottom: index === month.length - 1 ? 0 : 4 }}
        onSelect={onSelect}
      />
    );
  });

  return <View style={style}>{monthList}</View>;
};
