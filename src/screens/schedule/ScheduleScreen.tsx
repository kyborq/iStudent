import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { FloatingButton } from '../../components/FloatingButton';

import { Header } from '../../components/Header';
import { strings } from '../../locales';
import { DateSelect } from './components/DateSelect';
import { ScheduleList } from './components/ScheduleList';
import { WeekScroller } from './components/WeekScroller';
import { WeekSelect } from './components/WeekSelect';

export const ScheduleScreen = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const handleSelectDate = () => {
    // ...
    setModalVisible(true);
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
        title={strings.schedule}
        rightIcon="calendar"
        onRight={handleSelectDate}
      />
      <WeekScroller selectedDate={selectedDate} onChange={handleSelectDay} />
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
