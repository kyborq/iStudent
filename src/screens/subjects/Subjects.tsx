import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from '../../components/UI/Header';

export const Subjects = () => {
  return (
    <View style={styles.container}>
      <Header
        title="Предметы"
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
