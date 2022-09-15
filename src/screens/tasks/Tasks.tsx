import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from '../../components/UI/Header';

export const Tasks = () => {
  return (
    <View style={styles.container}>
      <Header
        title="Задачи"
        primaryActionIcon="search"
        primaryAction={() => {}}
        secondaryActionIcon="addSquare"
        secondaryAction={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
    flex: 1,
  },
});
