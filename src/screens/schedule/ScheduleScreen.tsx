import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Header } from '../../components/Header';
import { Week } from './components/Week';

export const ScheduleScreen = () => {
  const [date, setDate] = useState(new Date());

  const handleSelectDate = () => {
    // ...
  };

  return (
    <View style={styles.container}>
      <Header
        title="Расписание"
        rightIcon="calendar"
        onRight={handleSelectDate}
      />
      <Week date={date} currentDate={date} />
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
    paddingTop: 16,
  },
});
