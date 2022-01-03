import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CardBase } from '../../../components/CardBase';
import { Check } from '../../../components/inputs/Check';

type Props = {
  title: string;
  status?: boolean;
  onPress?: () => void;
  onComplete?: () => void;
};

export const TaskCard = ({ title, status, onPress, onComplete }: Props) => {
  return (
    <CardBase onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.checkbox}>
          <Check checked={status} onPress={onComplete} />
        </View>
        <Text style={styles.label}>{title}</Text>
      </View>
    </CardBase>
  );
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
