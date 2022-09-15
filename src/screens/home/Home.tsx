import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../../components/UI/Header';

export const Home = () => {
  return (
    <View style={styles.container}>
      <Header
        title="iStudent"
        leftActionIcon="logo"
        primaryActionIcon="search"
        primaryAction={() => {}}
        secondaryActionIcon="settings"
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
