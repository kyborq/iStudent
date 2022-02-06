import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { COLORS } from '../../../colors';

type Props = {
  value: number;
  max: number;
  color?: string;
};

export const ProgressBar = ({ value, color, max }: Props) => {
  const progress = `${(value / max) * 100}%`;
  const out = value > max;

  const progressStyle: StyleProp<ViewStyle> = {
    width: progress,
    backgroundColor: out ? COLORS.dangerF26969 : color,
  };

  return (
    <View style={styles.container}>
      <View style={[styles.progress, progressStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 4,
    borderRadius: 4,
    backgroundColor: '#f2f2f2',
    width: 100,
    overflow: 'hidden',
  },
  progress: {
    height: 16,
  },
});
