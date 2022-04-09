import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {};

export const TaskSortPanel = ({}: Props) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  label: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
