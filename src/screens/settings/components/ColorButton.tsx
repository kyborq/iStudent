import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableNativeFeedback,
  View,
  ViewStyle,
} from 'react-native';

type Props = {
  color: string;
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export const ColorButton = ({ color, selected, style, onPress }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableNativeFeedback onPress={onPress}>
        <View
          style={[
            styles.button,
            { borderColor: selected ? color : '#F2F2F2' },
          ]}>
          <View
            style={[styles.indicator, !!color && { backgroundColor: color }]}
          />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: 24,
    borderWidth: 2,
    padding: 4,
  },
  indicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});
