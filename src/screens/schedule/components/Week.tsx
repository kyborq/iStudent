import React from 'react';
import { StyleSheet, View } from 'react-native';
import { uuid4 } from '../../../utils';
import { compareDates, getWeekArray } from '../../../utils/dateTime';
import { Day } from './Day';

type Props = {};

export const Week = ({}: Props) => {
  const currentDate = new Date();

  const weekArray = getWeekArray(currentDate);
  const week = weekArray.map((day) => {
    return (
      <Day
        key={uuid4()}
        number={day.day}
        week={day.week}
        past={compareDates(day.date, currentDate) === -1}
        current={compareDates(day.date, currentDate) === 0}
        color="red"
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
