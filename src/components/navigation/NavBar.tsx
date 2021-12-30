import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavButton } from './NavButton';

export const NavBar = () => {
  return (
    <View style={styles.container}>
      <NavButton icon="book" label="Предметы" active={true} />
      <NavButton icon="check" label="Задачи" active={false} />
      <NavButton icon="calendar" label="Расписание" active={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
  },
});
