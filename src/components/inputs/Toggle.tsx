import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableNativeFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { COLORS } from '../../colors';
import { useAppSelector } from '../../redux/store';

type Props = {
  toggled?: boolean;
  onPress?: () => void;
};

export const Toggle = ({ toggled, onPress }: Props) => {
  const color = '#f2f2f2';

  const toggledStyle: StyleProp<ViewStyle> = {
    backgroundColor: toggled ? color : '#F2F2F2',
    alignItems: toggled ? 'flex-end' : 'flex-start',
  };

  const checkmarkStyle: StyleProp<ViewStyle> = {
    backgroundColor: toggled ? '#FFF' : color,
  };

  return (
    <View style={styles.overflow}>
      <TouchableNativeFeedback onPress={onPress}>
        <View style={[styles.container, toggledStyle]}>
          <View style={[styles.checkmark, checkmarkStyle]} />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  overflow: {
    borderRadius: 12,
    overflow: 'hidden',
    alignSelf: 'baseline',
  },
  container: {
    width: 48,
    height: 24,
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    justifyContent: 'center',
  },
  checkmark: {
    margin: 4,
    borderRadius: 8,
    width: 16,
    height: 16,
    backgroundColor: '#fff',
  },
});
