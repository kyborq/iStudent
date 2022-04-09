import React from 'react';
import { StyleSheet, TouchableNativeFeedback, View } from 'react-native';
import { TOUCHABLE_COLOR } from '../../colors';

type Props = {
  color: string;
  margin?: boolean;
};

export const ColorSelect = ({ color, margin }: Props) => {
  return (
    <View style={[styles.ripple, !margin && { marginRight: 8 }]}>
      <TouchableNativeFeedback background={TOUCHABLE_COLOR}>
        <View style={[styles.container, { backgroundColor: color }]}>
          <View style={styles.check} />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  ripple: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    height: 32,
    borderRadius: 8,
  },
  check: {
    // ...
  },
});
