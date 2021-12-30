import React from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { COLORS } from '../../colors';

type Props = {
  label: string;
  onPress?: () => void;
};

export const Button = ({ label, onPress }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableNativeFeedback onPress={onPress}>
        <View style={styles.button}>
          <Text style={styles.label}>{label}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 10,
  },
  button: {
    overflow: 'hidden',
    borderRadius: 10,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary5A9EEE,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
