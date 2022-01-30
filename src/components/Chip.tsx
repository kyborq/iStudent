import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  label: string;
  color?: string;
  background?: string;
};

export const Chip = ({ label, color, background }: Props) => {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.label, { color: color || '#C7C7C7' }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 8,
    // paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  label: {
    fontSize: 12,
  },
});
