import { current } from '@reduxjs/toolkit';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { COLORS } from '../../colors';
import { styleee } from '../../utils';
import { getDate } from './calendarUtils';

type Props = {
  date: Date;
  active?: boolean;
  current?: boolean;
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: (date: Date) => void;
};

export const CalendarDay = ({
  date,
  style,
  current,
  selected,
  active,
  onPress,
}: Props) => {
  const handleSelect = () => {
    onPress && onPress(date);
  };

  return (
    <View style={[styles.ripple, style]}>
      <TouchableNativeFeedback onPress={handleSelect}>
        <View
          style={[
            styles.day,

            styleee(active, { borderColor: '#f2f2f2' }),
            styleee(current, { borderColor: COLORS.primary5A9EEE }),
            styleee(selected, {
              borderColor: COLORS.primary5A9EEE,
              backgroundColor: COLORS.primary5A9EEE,
            }),
          ]}>
          <Text
            style={[
              styles.dayLabel,
              styleee(current, { color: COLORS.primary5A9EEE }),
              styleee(selected, { color: '#fff' }),
            ]}>
            {getDate(date, 'day')}
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  ripple: {
    overflow: 'hidden',
    borderRadius: 8,
  },
  day: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
  },
  dayLabel: {
    fontSize: 12,
    color: '#c7c7c7',
  },
});
