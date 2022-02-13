import moment from 'moment';
import React from 'react';
import { View, ScrollView } from 'react-native';
import { uuid4 } from '../../../utils';
import { getWeek } from '../scheduleUtils';
import { WeekDay } from './WeekDay';

type Props = {
  date: string;
  color?: string;
  onSelectDate?: (date: string) => void;
};

export const ScheduleWeek = ({ date, color, onSelectDate }: Props) => {
  const currentDate = moment().format('DD.MM.YYYY');

  const week = getWeek(date);
  const weekList = week.map((day, index) => (
    <WeekDay
      key={uuid4()}
      style={{ marginRight: index === week.length - 1 ? 0 : 8 }}
      date={day}
      color={color}
      current={currentDate === day}
      selected={date === day}
      onPress={() => onSelectDate && onSelectDate(day)}
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
