import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const Avatar = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>ИИ</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 16,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 21,
    fontWeight: 'bold',
  },
});
