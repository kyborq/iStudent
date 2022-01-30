import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getDate } from '../../../components/calendar/calendarUtils';
import { IconButton } from '../../../components/inputs/IconButton';

type Props = {
  date: number;
  onPrev?: () => void;
  onNext?: () => void;
};

export const DateSelect = ({ date, onPrev, onNext }: Props) => {
  const dateString = getDate(date);

  return (
    <View style={styles.container}>
      <IconButton icon="chevronLeft" onPress={onPrev} />
      <Text style={styles.label}>{dateString}</Text>
      <IconButton icon="chevronRight" onPress={onNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
