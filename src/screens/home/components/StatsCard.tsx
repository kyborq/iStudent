import React, { FC } from 'react';
import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { TOUCHABLE_COLOR } from '../../../colors';

type Props = {
  number: number;
  label: string;
  style?: ViewStyle;
  onPress?: () => void;
};

export const StatsCard: FC<Props> = ({ number, label, style, onPress }) => {
  return (
    <View style={[styles.touchable, style]}>
      <TouchableNativeFeedback onPress={onPress} background={TOUCHABLE_COLOR}>
        <View style={styles.container}>
          <Text style={styles.number}>{number}</Text>
          <Text style={styles.label}>{label}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: '#fafafa',
  },
  touchable: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  number: {
    fontSize: 24,
    marginBottom: 2,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 12,
    color: '#c7c7c7',
  },
});
