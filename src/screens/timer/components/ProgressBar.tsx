import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { COLORS } from '../../../colors';

type Props = {
  value: number;
  max: number;
};

export const ProgressBar = ({ value, max }: Props) => {
  const progress = `${(value / max) * 100}%`;
  const out = value > max;

  const progressStyle: StyleProp<ViewStyle> = {
    width: progress,
    backgroundColor: out ? COLORS.dangerF26969 : COLORS.primary5A9EEE,
  };

  return (
    <View style={styles.container}>
      <View style={[styles.progress, progressStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 16,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    width: '100%',
    overflow: 'hidden',
  },
  progress: {
    height: 16,
  },
});
