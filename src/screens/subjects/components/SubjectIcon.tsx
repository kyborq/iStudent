import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getTextLetters } from '../../../utils';

type Props = {
  label: string;
  color?: string;
};

export const SubjectIcon = ({ label, color }: Props) => {
  const text = getTextLetters(label);

  return (
    <View style={[styles.container, !!color && { backgroundColor: color }]}>
      <Text style={[styles.text, { fontSize: text.length > 2 ? 12 : 18 }]}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
