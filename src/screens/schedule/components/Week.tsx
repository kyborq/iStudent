import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { uuid4 } from '../../../utils';
import {
  compareDates,
  getWeekArray,
  getWeekType,
  isEqualDates,
} from '../../../utils/dateTime';
import { WeekDay } from './WeekDay';

type Props = {
  date: number | Date;
  currentDate: number | Date;
};

export const Week = ({ date, currentDate }: Props) => {
  const weekArray = getWeekArray(date);

  const week = weekArray.map((day, index) => {
    return (
      <WeekDay
        key={uuid4()}
        number={day.day}
        week={day.week}
        past={compareDates(day.date, new Date(currentDate)) === -1}
        current={isEqualDates(day.date, new Date(currentDate))}
        color={getWeekType(day.date)}
        last={index === 6}
      />
    );
  });

  return <View style={styles.container}>{week}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
});
