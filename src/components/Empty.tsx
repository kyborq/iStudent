import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../colors';

type Props = {
  text: string;
};

export const Empty = ({ text }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: COLORS.darkC7C7C7,
    fontSize: 12,
  },
});
