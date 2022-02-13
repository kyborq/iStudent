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
        <IconButton
          icon="trash"
          buttonStyle={styles.buttonStyle}
          containerStyle={{ marginRight: 10 }}
          onPress={onClearDate}
        />
        <IconButton
          icon="chevronLeft"
          buttonStyle={styles.buttonStyle}
          containerStyle={{ marginRight: 10 }}
          onPress={onPrevMonth}
        />
        <IconButton
          icon="chevronRight"
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
    textTransform: 'capitalize',
  },
  calendarButtons: {
    flexDirection: 'row',
  },
  buttonStyle: {},
});
