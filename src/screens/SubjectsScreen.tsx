import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Empty } from '../components/Empty';
import { Header } from '../components/Header';
import { Input } from '../components/inputs/Input';

export const SubjectsScreen = () => {
  return (
    <View style={styles.container}>
      <Header label="Мои предметы" onAction={() => {}} />
      <ScrollView contentContainerStyle={styles.content}>
        <Input
          icon="search"
          placeholder="Поиск"
          clearInput
          style={{ marginBottom: 16 }}
        />
        <Empty text="Список предметов пуст" icon="book" />
      </ScrollView>
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
