import moment from 'moment';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableNativeFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { COLORS } from '../../../colors';

type Props = {
  date: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
  current?: boolean;
  selected?: boolean;
  onPress?: () => void;
};

export const WeekDay = ({
  date,
  color,
  style,
  current,
  selected,
  onPress,
}: Props) => {
  const currentDate = moment(date, 'DD.MM.YYYY');
  const day = currentDate.format('dd');
  const number = currentDate.format('DD');

  const currentStyle = {
    container: {
      borderColor: color,
    },
    text: {
      color: color,
    },
  };

  const selectedStyle = {
    container: {
      borderColor: color,
      backgroundColor: color,
    },
    text: {
      color: '#fff',
    },
  };

  return (
    <View
      style={[
        styles.ripple,
        style,
        current && currentStyle.container,
        selected && selectedStyle.container,
      ]}>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, 0.05)', true)}
        onPress={onPress}>
        <View style={styles.container}>
          <Text
            style={[
              styles.label,
              current && currentStyle.text,
              selected && selectedStyle.text,
            ]}>
            {day}
          </Text>
          <Text
            style={[
              styles.text,
              current && currentStyle.text,
              selected && selectedStyle.text,
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
