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
import { getDate } from './calendarUtils';

type Props = {
  date: number;
  style?: StyleProp<ViewStyle>;
  current?: boolean;
  selected?: boolean;
  month?: boolean;
  onPress?: (date: number) => void;
};

export const CalendarDay = ({
  date,
  style,
  current,
  selected,
  month,
  onPress,
}: Props) => {
  const day = getDate(date, 'day');

  const handleSelect = () => {
    onPress && onPress(date);
  };

  return (
    <View style={[styles.ripple, style]}>
      <TouchableNativeFeedback onPress={handleSelect}>
        <View
          style={[
            styles.day,
            month && { borderColor: COLORS.grayF2F2F2 },
            current && { borderColor: COLORS.primary5A9EEE },
            selected && {
              borderColor: COLORS.primary5A9EEE,
              backgroundColor: COLORS.primary5A9EEE,
            },
          ]}>
          <Text
            style={[
              styles.dayLabel,
              !month && { color: '#e2e2e2' },
              current && { color: COLORS.primary5A9EEE },
              selected && { color: '#fff' },
            ]}>
            {day}
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
    width: 44,
    height: 44,
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
