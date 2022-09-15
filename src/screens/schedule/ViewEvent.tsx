import {
  CommonActions,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from '../../components/Header';
import { InfoLine } from '../../components/InfoLine';
import { IconButton } from '../../components/inputs/IconButton';
import { RootStackParamList } from '../../components/navigation/Navigation';
import { strings } from '../../locales';
import { deleteEvent } from '../../redux/scheduleSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getScheduleTiming, isScheduleToday } from './scheduleUtils';

export const ViewEvent = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<RootStackParamList, 'ViewEvent'>>();

  const id = route?.params?.id;

  const event = useAppSelector((state) =>
    state.schedule.schedule.find((event) => event.id === id),
  );

  const subject = useAppSelector((state) =>
    state.subjects.subjects.find((subject) => subject.id === event?.subject),
  );

  const handleBack = () => {
    navigation.goBack();
  };

  const handleEdit = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'EditEvent',
        params: { id: id },
      }),
    );
  };

  const handleViewSubject = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'ViewSubject',
        params: { id: event?.subject },
      }),
    );
  };

  const handleDeleteEvent = () => {
    dispatch(deleteEvent(id));
    handleBack();
  };

  return (
    <View style={styles.container}>
      <Header leftIcon="back" onLeft={handleBack} />

      <ScrollView contentContainerStyle={styles.content}>
        <InfoLine
          icon="book"
          label={strings.subject}
          text={subject?.title || ''}
          onPress={handleViewSubject}
        />
        {!!event?.room && (
          <InfoLine icon="time" label="Место" text={event?.room} />
        )}
        <InfoLine
          icon="time"
          label={strings.time}
          text={`${event?.repeats?.time?.start}-${event?.repeats?.time?.end}`}
        />
        <InfoLine
          icon="info"
          label={strings.status}
          text={`${
            (isScheduleToday(event) && getScheduleTiming(event)) ||
            strings.notStarted
          }`}
        />
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          padding: 24,
          justifyContent: 'space-between',
        }}>
        <IconButton icon="trash" onPress={handleDeleteEvent} />
        <IconButton icon="edit" onPress={handleEdit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  content: {
    paddingBottom: 24,
    flexGrow: 1,
  },
  tasksView: {
    paddingHorizontal: 24,
    marginTop: 16,
  },
});
