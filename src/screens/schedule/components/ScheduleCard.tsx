import moment from 'moment';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CardBase } from '../../../components/CardBase';
import { TEvent } from '../../../redux/scheduleSlice';
import { useAppSelector } from '../../../redux/store';

type Props = {
  event: TEvent;
  current?: boolean;
  past?: boolean;
  color?: string;
  onPress?: (id: string) => void;
};

export const ScheduleCard = ({
  event,
  current,
  past,
  color,
  onPress,
}: Props) => {
  const overdue = moment(`${event.date} ${event.time.end}`, 'DD.MM.YYYY HH:mm')
    .endOf('minute')
    .fromNow();

  const currentStyle = {
    base: { borderColor: color },
    text: { color: color },
  };

  const pastStyle = {
    base: { borderColor: color },
    text: { color: '#c7c7c7', textDecorationLine: 'line-through' },
  };

  const handlePress = () => onPress && onPress(event.id);

  return (
    <CardBase
      containerStyle={current && currentStyle.base}
      onPress={handlePress}>
      <View style={styles.schedule}>
        <View style={styles.time}>
          <Text style={[styles.timeText, past && { color: '#c7c7c7' }]}>
            {event.time.start}
          </Text>
          <View
            style={[styles.divider, past && { backgroundColor: '#f2f2f2' }]}
          />
          <Text style={[styles.timeText, past && { color: '#c7c7c7' }]}>
            {event.time.end}
          </Text>
        </View>
        <View style={styles.info}>
          <Text
            style={[
              styles.title,
              current && currentStyle.text,
              past && pastStyle.text,
            ]}>
            {event.title}
          </Text>
          <Text style={[styles.date, past && { color: '#c7c7c7' }]}>{`${
            current ? 'закончится ' : past ? 'закончилось ' : ''
          }${overdue}`}</Text>
        </View>
      </View>
    </CardBase>
  );
};

const styles = StyleSheet.create({
  schedule: {
    flexDirection: 'row',
  },
  time: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  divider: {
    width: 16,
    marginVertical: 4,
    height: 3,
    borderRadius: 3,
    backgroundColor: '#e2e2e2',
  },
  timeText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  info: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    marginTop: 4,
    color: '#c7c7c7',
  },
});
