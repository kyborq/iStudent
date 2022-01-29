import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { COLORS } from '../../../colors';

type Props = {
  number: string;
  day: string;
  style?: StyleProp<ViewStyle>;
  current?: boolean;
  selected?: boolean;
  onPress?: () => void;
};

export const WeekDay = ({
  number,
  day,
  style,
  current,
  selected,
  onPress,
}: Props) => {
  return (
    <View
      style={[
        styles.ripple,
        style,
        current && { borderColor: COLORS.primary5A9EEE },
        selected && {
          borderColor: COLORS.primary5A9EEE,
          backgroundColor: COLORS.primary5A9EEE,
        },
      ]}>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, 0.05)', true)}
        onPress={onPress}>
        <View style={styles.container}>
          <Text style={[styles.label, selected && { color: '#fff' }]}>
            {day}
          </Text>
          <Text
            style={[
              styles.text,
              current && { color: COLORS.primary5A9EEE },
              selected && { color: '#fff' },
            ]}>
            {number}
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export const styles = StyleSheet.create({
  ripple: {
    borderRadius: 10,
    borderColor: '#f2f2f2',
    borderWidth: 1,
    overflow: 'hidden',
  },
  container: {
    width: 70,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#c7c7c7',
  },
  text: {
    fontSize: 21,
    fontWeight: 'bold',
  },
});
