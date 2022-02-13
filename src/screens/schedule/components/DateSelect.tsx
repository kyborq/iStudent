import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getDate } from '../../../components/calendar/calendarUtils';
import { IconButton } from '../../../components/inputs/IconButton';

type Props = {
  date: string;
  onPrev?: () => void;
  onNext?: () => void;
};

export const DateSelect = ({ date, onPrev, onNext }: Props) => {
  return (
    <View style={styles.container}>
      <IconButton icon="chevronLeft" onPress={onPrev} />
      <Text style={styles.label}>{date}</Text>
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
