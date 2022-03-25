import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CardBase } from '../../../components/CardBase';
import { useAppSelector } from '../../../redux/store';

type Props = {
  title: string;
  start: string;
  end: string;
};

export const ScheduleCard = ({ title, start, end }: Props) => {
  return (
    <View style={styles.card}>
      <View style={styles.indicatorContainer}>
        <View style={styles.indicator} />
      </View>
      <View style={styles.cardContainer}>
        <Text style={styles.time}>{`${start} - ${end}`}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
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
