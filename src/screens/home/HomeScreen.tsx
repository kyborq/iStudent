import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from '../../components/Header';

export const HomeScreen = () => {
  const goToSettings = () => {
    // ...
  };

  return (
    <View style={styles.container}>
      <Header label="Главная" onAction={goToSettings} actionIcon="settings" />
      <ScrollView contentContainerStyle={styles.content}></ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    flexGrow: 1,
  },
});
