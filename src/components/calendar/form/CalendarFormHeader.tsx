import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from '../../inputs/IconButton';
import { getMonthName } from '../calendarUtils';

type Props = {
  date: number;
  onNextMonth?: () => void;
  onPrevMonth?: () => void;
  onClearDate?: () => void;
};

export const CalendarFormHeader = ({
  date,
  onNextMonth,
  onPrevMonth,
  onClearDate,
}: Props) => {
  const month = getMonthName(date);

  return (
    <View style={styles.calendarHeader}>
      <Text style={styles.monthLabel}>{month}</Text>
      <View style={styles.calendarButtons}>
        <IconButton
          icon="trash"
          color="#c7c7c7"
          background="#fff"
          size={32}
          buttonStyle={styles.buttonStyle}
          containerStyle={{ marginRight: 10 }}
          onPress={onClearDate}
        />
        <IconButton
          icon="chevronLeft"
          color="#c7c7c7"
          background="#fff"
          size={32}
          buttonStyle={styles.buttonStyle}
          containerStyle={{ marginRight: 10 }}
          onPress={onPrevMonth}
        />
        <IconButton
          icon="chevronRight"
          color="#c7c7c7"
          background="#fff"
          size={32}
          buttonStyle={styles.buttonStyle}
          onPress={onNextMonth}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 16,
    alignItems: 'center',
  },
  monthLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  calendarButtons: {
    flexDirection: 'row',
  },
  buttonStyle: {},
});
