import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Empty } from '../../components/Empty';
import { Header } from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import { ScheduleWeek } from './components/ScheduleWeek';

export const ScheduleScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header label="Мое расписание" onAction={() => {}} />
      <ScheduleWeek date={new Date().valueOf()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Empty text="На сегодня ничего нет" icon="calendar" />
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
