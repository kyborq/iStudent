import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from '../../components/UI/Header';

export const ViewEvent = () => {
  return (
    <View style={styles.container}>
      <Header leftIcon="back" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
});
