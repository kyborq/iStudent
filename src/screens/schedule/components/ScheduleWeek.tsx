import React from 'react';
import { View, ScrollView } from 'react-native';
import {
  getDate,
  getWeekArray,
  getWeekName,
} from '../../../components/calendar/calendarUtils';
import { uuid4 } from '../../../utils';
import { WeekDay } from './WeekDay';

type Props = {
  date: number;
  onSelect?: (date: number) => void;
};

export const ScheduleWeek = ({ date, onSelect }: Props) => {
  const currentDate = new Date().valueOf();

  const week = getWeekArray(date);
  const weekList = week.map((day, index) => (
    <WeekDay
      key={uuid4()}
      day={getWeekName(day)}
      number={getDate(day, 'day')}
      style={{ marginRight: index === week.length - 1 ? 0 : 8 }}
      current={getDate(currentDate) === getDate(day)}
      selected={getDate(day) === getDate(date)}
      onPress={() => onSelect && onSelect(day)}
    />
  ));

  return (
    <View>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24 }}
        showsHorizontalScrollIndicator={false}
        horizontal>
        {weekList}
      </ScrollView>
    </View>
  );
};
