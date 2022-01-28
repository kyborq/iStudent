import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { Empty } from '../components/Empty';
import { Header } from '../components/Header';
import { Input } from '../components/inputs/Input';
import { useAppSelector } from '../redux/store';
import { getDate } from '../components/calendar/calendarUtils';
import { uuid4 } from '../utils';
import { CommonActions, useNavigation } from '@react-navigation/native';

export const ScheduleScreen = () => {
  const navigation = useNavigation();
  const tasks = useAppSelector((state) =>
    state.tasks.tasks.filter(
      (task) =>
        task.date &&
        !task.status &&
        !task.deleted &&
        getDate(new Date(task.date)) === getDate(new Date(state.root.date)) &&
        task,
    ),
  );

  const handleViewTask = (id?: string) => {
    !!id &&
      navigation.dispatch(
        CommonActions.navigate({
          name: 'ViewTask',
          params: { id },
        }),
      );

    !id &&
      navigation.dispatch(
        CommonActions.navigate({
          name: 'TasksScreen',
        }),
      );
  };

  return (
    <View style={styles.container}>
      <Header label="Мое расписание" onAction={() => {}} />
      <View style={{ flexDirection: 'row' }}>
        {tasks.length > 0 && (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
            horizontal>
            {tasks.map((task, i) => (
              <View
                key={uuid4()}
                style={{
                  borderRadius: 12,
                  overflow: 'hidden',
                  marginRight: i === tasks.length - 1 ? 0 : 10,
                  borderColor: '#f2f2f2',
                  borderWidth: 1,
                }}>
                <TouchableNativeFeedback
                  onPress={() => handleViewTask(task.id)}>
                  <View style={[styles.taskCard]}>
                    <Text style={styles.taskCardTitle} numberOfLines={1}>
                      {task.label}
                    </Text>
                    <Text style={styles.taskCardText} numberOfLines={2}>
                      {task.description}
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
            ))}
            <View
              key={uuid4()}
              style={{
                borderRadius: 12,
                overflow: 'hidden',
                marginLeft: 10,
                borderColor: '#f2f2f2',
                borderWidth: 1,
              }}>
              <TouchableNativeFeedback onPress={() => handleViewTask()}>
                <View style={[styles.taskCard]}>
                  <Text style={styles.taskCardText} numberOfLines={2}>
                    Можно всех посмотреть
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </ScrollView>
        )}
      </View>
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
  taskCard: {
    width: 140,
    height: 90,

    borderRadius: 10,
    padding: 14,
  },
  taskCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskCardText: {
    fontSize: 12,
    color: '#c7c7c7',
    marginTop: 4,
  },
});
