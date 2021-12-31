import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CardBase } from '../../../components/CardBase';
import { Check } from '../../../components/inputs/Check';

type Props = {
  label?: string;
  onPress?: () => void;
};

export const TaskCard = ({ label, onPress }: Props) => {
  return (
    <CardBase onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.checkbox}>
          <Check checked={true} />
        </View>
        <View>
          <Text style={styles.label}>{label}</Text>
        </View>
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
