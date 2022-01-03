import React from 'react';
import { StyleSheet, TouchableNativeFeedback, View } from 'react-native';
import { COLORS } from '../../colors';

type Props = {
  checked?: boolean;
  onPress?: () => void;
};

export const Check = ({ checked, onPress }: Props) => {
  return (
    <View style={styles.overflow}>
      <TouchableNativeFeedback onPress={onPress}>
        <View
          style={[
            styles.container,
            checked && { backgroundColor: COLORS.primary5A9EEE },
          ]}>
          {checked && <View style={styles.checkmark} />}
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  overflow: {
    borderRadius: 6,
    overflow: 'hidden',
    alignSelf: 'baseline',
  },
  container: {
    width: 24,
    height: 24,
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
  },
  checkmark: {
    marginHorizontal: 5,
    marginVertical: 8,
    width: 14,
    height: 6,
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
    borderLeftColor: '#fff',
    borderLeftWidth: 2,
    transform: [{ rotateZ: '-45deg' }],
  },
});