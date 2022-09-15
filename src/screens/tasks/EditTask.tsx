import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import { add, format, parse, setDate, sub } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Calendar } from '../../components/calendar/Calendar';
import { CalendarHeader } from '../../components/calendar/form/CalendarHeader';
import { Header } from '../../components/Header';
import { Button } from '../../components/button/Button';
import { Input } from '../../components/inputs/Input';
import { Picker } from '../../components/inputs/Picker';
import { Select } from '../../components/inputs/Select';
import { RootStackParamList } from '../../components/navigation/Navigation';
import { strings } from '../../locales';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { TSubject } from '../../redux/subjectsSlice';
import { addTask, deleteTask, editTask, TTask } from '../../redux/tasksSlice';
import { uuid4 } from '../../utils';
import { ILocaleIterator } from '../schedule/components/DateSelect';

export const EditTask = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'EditTask'>>();
  const dispatch = useAppDispatch();

  const id = route?.params?.id;

  const subject = route?.params?.subject;
  const tasks: TTask[] = useAppSelector((state) => state.tasks.tasks);
  const subjects: TSubject[] = useAppSelector((state) =>
    state.subjects.subjects.filter((s) => !s.archived),
  );
  const task = id && tasks?.filter((t) => t.id === id)[0];

  const [taskDraft, setTaskDraft] = useState<TTask>(
    task || {
      id: uuid4(),
      title: '',
      completed: false,
      subject: subject,
    },
  );

  const [valid, setValid] = useState<boolean>(false);
  const [datePicker, setDatePicker] = useState<boolean>(false);

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setValid(isValid());
  }, [taskDraft]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSave = () => {
    if (!id && valid) {
      dispatch(addTask(taskDraft));
      navigation.goBack();
    }

    if (id && valid) {
      dispatch(editTask(taskDraft));
      navigation.goBack();
    }
  };

  const handleDelete = () => {
    dispatch(deleteTask(id));
    navigation.goBack();
  };

  const isValid = () => {
    if (taskDraft.title === '') {
      return false;
    }

    return true;
  };

  const locale: ILocaleIterator = {
    en_US: enUS,
    ru_RU: ru,
  };

  return (
    <View style={styles.container}>
      <Header
        title={id ? strings.editTask : strings.newTask}
        onLeft={handleBack}
        leftIcon="back"
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Input
          label={strings.task}
          placeholder={strings.taskPlaceholder}
          icon="info"
          style={{ paddingHorizontal: 24 }}
          multiline
          clearInput
          value={taskDraft.title}
          onChange={(value) => setTaskDraft({ ...taskDraft, title: value })}
        />
        <Select
          icon="book"
          label={strings.subject}
          placeholder={strings.notSelect}
          value={subjects.find((s) => s.id === taskDraft.subject)?.title}
          items={subjects.map((subject) => {
            return { title: subject.title, value: subject.id };
          })}
          onSelect={(value) => setTaskDraft({ ...taskDraft, subject: value })}
        />
        <Picker
          icon="calendar"
          label={strings.deadline}
          visible={datePicker}
          handleShow={() => setDatePicker(true)}
          handleHide={() => setDatePicker(false)}
          disableLabel
          value={!!taskDraft.deadline ? taskDraft.deadline : strings.notSelect}>
          <CalendarHeader
            month={format(date, 'MMMM', {
              locale: locale[strings.getLanguage()],
            })}
            onNextMonth={() => setDate(add(date, { months: 1 }))}
            onPrevMonth={() => setDate(sub(date, { months: 1 }))}
            onClearDate={() => {
              setTaskDraft({ ...taskDraft, deadline: undefined });
              setDatePicker(false);
            }}
          />
          <Calendar
            date={date}
            selectedDate={
              taskDraft.deadline
                ? parse(taskDraft.deadline, 'dd.MM.yyyy', new Date())
                : date
            }
            onSelect={(date) => {
              setTaskDraft({ ...taskDraft, deadline: date });
              setDatePicker(false);
            }}
          />
        </Picker>
        <View style={{ flex: 1 }} />
        <View style={{ flexDirection: 'row', paddingHorizontal: 24 }}>
          <Button
            label={id ? strings.edit : strings.save}
            onPress={handleSave}
            style={{ flex: 1 }}
            primary
            disabled={!valid}
          />
        </View>
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
    // paddingHorizontal: 24,
    paddingBottom: 24,
    flexGrow: 1,
  },
});
