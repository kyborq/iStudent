import React from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { TOUCHABLE_COLOR } from '../../colors';

type Props = {
  label?: string;
  value?: string;
};

export const Select = ({ label, value }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.touchable}>
        <TouchableNativeFeedback background={TOUCHABLE_COLOR}>
          <View style={styles.input}>
            <Text style={styles.value}>{value || 'Нет данных'}</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  label: {
    fontSize: 14,
    color: '#c7c7c7',
    marginBottom: 6,
  },
  input: {
    flexDirection: 'row',
    backgroundColor: '#fafafa',
    borderColor: '#fafafa',
    borderRadius: 10,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 14,
  },
});
