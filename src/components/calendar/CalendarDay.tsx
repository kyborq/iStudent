import { current } from '@reduxjs/toolkit';
import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { COLORS } from '../../colors';
import { styleee } from '../../utils';

type Props = {
  label: string;
  active?: boolean;
  current?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const CalendarDay = ({ label, style, current, active }: Props) => {
  const dynStyle = {
    active: {
      borderColor: '#f2f2f2',
    },
    current: {
      borderColor: COLORS.primary5A9EEE,
    },
  };

  return (
    <View
      style={[
        styles.day,
        style,
        styleee(active, { borderColor: '#f2f2f2' }),
        styleee(current, { borderColor: COLORS.primary5A9EEE }),
      ]}>
      <Text
        style={[
          styles.dayLabel,
          styleee(current, { color: COLORS.primary5A9EEE }),
        ]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  day: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
  },
  dayLabel: {
    fontSize: 12,
    color: '#c7c7c7',
  },
});
