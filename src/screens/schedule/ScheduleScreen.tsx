import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { FloatingButton } from '../../components/FloatingButton';

import { Header } from '../../components/Header';
import { DateSelect } from './components/DateSelect';
import { ScheduleList } from './components/ScheduleList';
import { WeekSelect } from './components/WeekSelect';

export const ScheduleScreen = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const navigation = useNavigation();

  const handleSelectDate = () => {
    // ...
  };

  const handleSelectDay = (newDate: number | Date) => {
    setSelectedDate(new Date(newDate));
  };

  const handleAddSchedule = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'EditEvent',
        params: {
          date: selectedDate.valueOf(),
        },
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Расписание"
        rightIcon="calendar"
        onRight={handleSelectDate}
      />
      <WeekSelect
        date={selectedDate}
        currentDate={date}
        onSelect={handleSelectDay}
      />
      <DateSelect date={selectedDate} onSelect={handleSelectDay} />
      <ScrollView contentContainerStyle={styles.content}>
        <ScheduleList date={selectedDate} />
      </ScrollView>
      <FloatingButton icon="add" onPress={handleAddSchedule} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  content: {
    // paddingHorizontal: 24,
    flexGrow: 1,
    paddingTop: 16,
    position: 'relative',
  },
});
