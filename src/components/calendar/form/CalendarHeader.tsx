import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from '../../inputs/IconButton';

type Props = {
  month: string;
  onNextMonth?: () => void;
  onPrevMonth?: () => void;
  onClearDate?: () => void;
};

export const CalendarHeader = ({
  month,
  onNextMonth,
  onPrevMonth,
  onClearDate,
}: Props) => {
  return (
    <View style={styles.calendarHeader}>
      <Text style={styles.monthLabel}>{month}</Text>
      <View style={styles.calendarButtons}>
        <IconButton icon="trash" onPress={onClearDate} />
        <IconButton icon="chevronLeft" onPress={onPrevMonth} />
        <IconButton icon="chevronRight" onPress={onNextMonth} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingLeft: 20,
    paddingTop: 8,
    marginBottom: 16,
    // paddingRight: -4,
    alignItems: 'center',
  },
  monthLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  calendarButtons: {
    flexDirection: 'row',
  },
  buttonStyle: {},
});
