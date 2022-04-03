import React from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { TOUCHABLE_COLOR } from '../../../colors';

type Props = {
  title: string;
  start: string;
  end: string;
};

export const ScheduleCard = ({ title, start, end }: Props) => {
  return (
    <View style={styles.ripple}>
      <TouchableNativeFeedback background={TOUCHABLE_COLOR}>
        <View style={styles.card}>
          <View style={styles.indicatorContainer}>
            <View style={styles.indicator} />
          </View>
          <View style={styles.cardContainer}>
            <Text style={styles.time}>{`${start} - ${end}`}</Text>
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  ripple: {
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  indicatorContainer: {
    marginRight: 16,
  },
  indicator: {
    width: 6,
    flex: 1,
    backgroundColor: '#f2f2f2',
    borderRadius: 3,
  },
  cardContainer: {
    flex: 1,
  },
  time: {
    fontSize: 12,
    color: '#c7c7c7',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  classroom: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
