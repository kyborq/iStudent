import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from '../inputs/IconButton';
import { Calendar } from './Calendar';
import { getMonthName } from './calendarUtils';

type Props = {
  selectedDate?: Date;
  currentDate: Date;
  onSelectDate?: (date: Date) => void;
};

export const CalendarForm = ({
  selectedDate,
  currentDate,
  onSelectDate,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.calendarHeader}>
        <Text style={styles.monthLabel}>
          {getMonthName(selectedDate || currentDate)}
        </Text>
        <View style={styles.calendarButtons}>
          <IconButton
            icon="chevronLeft"
            color="#c7c7c7"
            background="#fff"
            buttonStyle={styles.buttonStyle}
            containerStyle={{ marginRight: 10 }}
          />
          <IconButton
            icon="chevronRight"
            color="#c7c7c7"
            background="#fff"
            buttonStyle={styles.buttonStyle}
          />
        </View>
      </View>
      <Calendar
        date={currentDate}
        style={styles.calendarStyle}
        onSelect={onSelectDate}
        selected={selectedDate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  monthLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  calendarButtons: {
    flexDirection: 'row',
  },
  calendarStyle: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
  buttonStyle: {
    width: 24,
    height: 24,
    alignSelf: 'center',
  },
});
