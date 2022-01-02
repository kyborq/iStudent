import React from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { IconButton } from '../inputs/IconButton';
import { SortButton } from './SortButton';

export const SortPanel = () => {
  return (
    <View style={styles.container}>
      <SortButton />
      <View style={{ flexDirection: 'row' }}>
        <IconButton
          icon="check"
          label="228"
          color="#c7c7c7"
          background="#fff"
        />
        <IconButton
          icon="archive"
          label="10"
          color="#c7c7c7"
          background="#fff"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
