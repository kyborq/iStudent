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
import { deleteEvent } from '../../redux/scheduleSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

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
      <Header
        title={event?.subject || 'Событие'}
        rightIcon={'edit'}
        leftIcon={'back'}
        onLeft={handleBack}
        onRight={handleEdit}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <InfoLine icon="calendar" label="Дата" text={event?.date} />
        <InfoLine
          icon="time"
          label="Время"
          text={`${event?.repeats?.time?.start}-${event?.repeats?.time?.start}`}
        />
        <InfoLine
          icon="book"
          label="Предмет"
          text={subject?.title || ''}
          onPress={handleViewSubject}
        />
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          padding: 24,
          justifyContent: 'flex-end',
        }}>
        <IconButton icon="trash" onPress={handleDeleteEvent} />
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
