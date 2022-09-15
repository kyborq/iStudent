import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../../components/UI/Header';

export const Schedule = () => {
  return (
    <View style={styles.container}>
      <Header
        title="Расписание"
        primaryActionIcon="addSquare"
        primaryAction={() => {}}
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
