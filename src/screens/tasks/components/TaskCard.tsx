import React from 'react';
import { StyleSheet } from 'react-native';
import { CardBase } from '../../../components/CardBase';

type Props = {
  onPress?: () => void;
};

export const TaskCard = ({ onPress }: Props) => {
  return <CardBase onPress={onPress}>{/* ... */}</CardBase>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkbox: {
    marginRight: 10,
  },
});
