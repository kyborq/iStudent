import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../../components/UI/Header';

export const Contacts = () => {
  return (
    <View style={styles.container}>
      <Header
        title="Контакты"
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
