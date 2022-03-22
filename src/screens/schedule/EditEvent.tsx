import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import DateTimePicker, {
  DateTimePickerResult,
} from '@react-native-community/datetimepicker';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from '../../components/Header';
import { Input } from '../../components/inputs/Input';
import { Select } from '../../components/inputs/Select';
import { addEvent, editEvent, TEvent } from '../../redux/scheduleSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { TSubject } from '../../redux/subjectsSlice';
import { uuid4 } from '../../utils';
import { FakeInput } from '../../components/inputs/FakeInput';
import { Button } from '../../components/inputs/Button';
import { RootStackParamList } from '../../components/navigation/Navigation';

const repeats = ['Каждый день', 'Каждую неделю', 'Каждые две недели'];

export const EditEvent = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'EditEvent'>>();
  const id = route?.params?.id;
  const date = route?.params?.date;

  const event = useAppSelector((s) =>
    s.schedule.schedule.find((e) => e.id === id),
  );

  const [eventDraft, setEventDraft] = useState<TEvent>();
  const [startPickerVisible, setStartPickerVisible] = useState(false);
  const [endPickerVisible, setEndPickerVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const subjects = useAppSelector((state) =>
    state.subjects.subjects.filter((s) => !s.archived),
  );

  const onShowEndTime = () => {
    setEndPickerVisible(true);
  };

  const onShowStartTime = () => {
    setStartPickerVisible(true);
  };

  const onShowDate = () => {
    setDatePickerVisible(true);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header title="Главная" onRight={handleBack} />
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
  },
  scroll: {
    paddingHorizontal: 24,
    overflow: 'visible',
    paddingBottom: 8,
    marginBottom: -16,
    paddingTop: 12,
    marginTop: -12,
  },
});
