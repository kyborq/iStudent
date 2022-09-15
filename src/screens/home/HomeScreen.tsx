import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../../components/Header';
import { strings } from '../../locales';

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header title={strings.home} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
});
