import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Header } from '../../components/Header';
import useInterval from '../../hooks/useInterval';
import { strings } from '../../localization';
import { useAppSelector } from '../../redux/store';
import { CurrentLesson } from './components/CurrentLesson';
import { StatsCard } from './components/StatsCard';

export const HomeScreen = () => {
  const [date, setDate] = useState(new Date());

  useInterval(() => {
    setDate(new Date());
  }, 1000);

  const today = format(date, 'HH:mm');

  const tasksCount = useAppSelector((state) =>
    state.tasks.tasks.filter((t) => !t.completed && !t.archived),
  ).length;
  const subjectsCount = useAppSelector(
    (state) => state.subjects.subjects,
  ).length;

  return (
    <View style={styles.container}>
      <Header title={strings.home} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={{ marginBottom: 16 }}>
          <Text style={styles.label}>Сейчас</Text>
          <Text style={styles.text}>{today}</Text>
        </View>

        <View style={{ flexDirection: 'row', marginBottom: 24 }}>
          <StatsCard
            label={strings.tasks}
            number={tasksCount}
            style={{ marginRight: 10 }}
          />
          {/* <StatsCard
            label={strings.subjects}
            number={4}
            style={{ marginRight: 10 }}
          /> */}
          <StatsCard label={strings.subjects} number={subjectsCount} />
        </View>

        <Text style={styles.label}>Расписание</Text>
        <CurrentLesson />

        <Text style={[styles.label, { marginTop: 24 }]}>Задачи</Text>
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
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  label: {
    fontSize: 12,
    color: '#c7c7c7',
    marginBottom: 4,
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});
