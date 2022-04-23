import React from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { COLORS, TOUCHABLE_COLOR } from '../../../colors';

type Props = {
  title: string;
  start: string;
  teacher?: string;
  end: string;
  room?: string;
  status?: 'going' | 'wait' | 'ended';
  onPress?: () => void;
};

export const ScheduleCard = ({
  title,
  start,
  teacher,
  room,
  end,
  status = 'wait',
  onPress,
}: Props) => {
  const indicatorStyles = {
    going: {
      backgroundColor: COLORS.primary5A9EEE,
    },
    wait: {
      backgroundColor: '#f2f2f2',
    },
    ended: {
      backgroundColor: '#fafafa',
    },
  };

  const textStyles = {
    going: {
      color: '#000',
    },
    wait: {
      color: '#000',
    },
    ended: {
      color: '#c7c7c7',
      textDecorationLine: 'line-through',
    },
  };

  return (
    <View style={styles.ripple}>
      <TouchableNativeFeedback background={TOUCHABLE_COLOR} onPress={onPress}>
        <View style={styles.card}>
          <View style={styles.indicatorContainer}>
            <View style={[styles.indicator, indicatorStyles[status]]} />
          </View>
          <View style={styles.cardContainer}>
            <Text style={styles.time}>{`${start} - ${end}`}</Text>
            <Text style={[styles.title, textStyles[status]]}>{title}</Text>
            <View style={{ marginTop: 4, flexDirection: 'row' }}>
              {!!room && <Text style={styles.text}>{room}</Text>}
              {!!teacher && <Text style={styles.text}>{teacher}</Text>}
            </View>
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
  text: {
    fontSize: 13,
    color: '#c7c7c7',
    marginRight: 12,
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
    color: '#000',
  },
  classroom: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
