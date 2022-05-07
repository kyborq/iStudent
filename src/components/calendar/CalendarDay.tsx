import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { COLORS, TOUCHABLE_COLOR } from '../../colors';

type Props = {
  day: string;
  style?: StyleProp<ViewStyle>;
  current?: boolean;
  selected?: boolean;
  month?: boolean;
  onPress?: () => void;
};

export const CalendarDay = ({
  day,
  style,
  current,
  selected,
  month,
  onPress,
}: Props) => {
  const theme = COLORS.primary5A9EEE;

  const handleSelect = () => {
    onPress && onPress();
  };

  return (
    <View style={[styles.ripple, style]}>
      <TouchableNativeFeedback
        background={TOUCHABLE_COLOR}
        onPress={handleSelect}>
        <View
          style={[
            styles.day,
            month && { borderColor: COLORS.grayF2F2F2 },
            current && { borderColor: theme },
            selected && {
              borderColor: theme,
              backgroundColor: theme,
            },
          ]}>
          <Text
            style={[
              styles.dayLabel,
              !month && { color: '#e2e2e2' },
              current && { color: theme },
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
