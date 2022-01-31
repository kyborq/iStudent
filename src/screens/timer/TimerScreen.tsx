import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../colors';
import { Header } from '../../components/Header';
import { InfoLine } from '../../components/InfoLine';
import { Button } from '../../components/inputs/Button';
import { IconButton } from '../../components/inputs/IconButton';
import { Input } from '../../components/inputs/Input';
import { ModalView } from '../../components/modals/ModalView';
import { RootStackParamList } from '../../components/navigation/Navigation';
import useInterval from '../../hooks/useInterval';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { editTask, TTask } from '../../redux/tasksSlice';
import { TimerForm } from './components/TimerForm';
import { getTime, toTime } from './timerUtils';

export const TimerScreen = () => {
  const [timerModal, setTimerModal] = useState(false);
  const [timerStart, setTimerStart] = useState(false);

  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<RootStackParamList, 'Timer'>>();
  const id = route?.params?.id;

  useInterval(() => {
    timerStart && setSpended(spendedTime + 1);
  }, 1000);

  const task = useAppSelector(
    (state) => state.tasks.tasks.filter((task) => task.id === id)[0],
  );
  const [spendedTime, setSpended] = useState(task.spend || 0);

  useEffect(() => {
    handleSetSpended(spendedTime);
  }, [spendedTime]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSetEstimate = (seconds: number) => {
    const newTask: TTask = {
      ...task,
      estimate: seconds,
    };
    dispatch(editTask(newTask));
    setTimerModal(false);
  };

  const handleSetSpended = (seconds: number) => {
    const newTask: TTask = {
      ...task,
      spend: seconds,
    };
    dispatch(editTask(newTask));
  };

  return (
    <View style={styles.container}>
      <Header label="Таймер" onBack={handleBack} />
      <View style={styles.timerContainer}>
        <Text style={styles.timer}>{`${toTime(spendedTime, true)}`}</Text>
      </View>
      <InfoLine icon="checkLine" label="Название задачи" text={task.label} />
      <InfoLine
        icon="time"
        label="Время выполнения"
        text={toTime(task.estimate || 0)}
        onPress={() => setTimerModal(true)}
      />
      <InfoLine
        label="Прогресс"
        text={
          spendedTime > (task.estimate || 0)
            ? `Просрочено на ${
                getTime(spendedTime - (task.estimate || 0)).hours
              }ч. ${getTime(spendedTime - (task.estimate || 0)).minutes}м. и ${
                getTime(spendedTime - (task.estimate || 0)).seconds
              }с.`
            : `Осталось ${
                getTime((task.estimate || 0) - spendedTime).hours
              } ч. и ${getTime((task.estimate || 0) - spendedTime).minutes} м`
        }>
        <View
          style={{
            height: 16,
            borderRadius: 8,
            backgroundColor: '#f2f2f2',
            width: '100%',
            overflow: 'hidden',
          }}>
          <View
            style={{
              width: `${(spendedTime / (task.estimate || 0)) * 100}%`,
              backgroundColor:
                spendedTime > (task.estimate || 0)
                  ? COLORS.dangerF26969
                  : COLORS.primary5A9EEE,
              height: 16,
            }}
          />
        </View>
      </InfoLine>

      <View style={styles.footer}>
        <Button
          label={timerStart ? 'Остановить' : 'Запуск'}
          onPress={() => setTimerStart(!timerStart)}
        />
      </View>

      <ModalView
        onClose={() => setTimerModal(false)}
        visible={timerModal}
        title="Выберите время">
        <TimerForm onSubmit={handleSetEstimate} />
      </ModalView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  timerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  content: {
    paddingHorizontal: 24,
    flexGrow: 1,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    marginTop: 32,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
  },
});
