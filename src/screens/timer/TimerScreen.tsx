import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from '../../components/Header';
import { InfoLine } from '../../components/InfoLine';
import { Button } from '../../components/inputs/Button';
import { ModalView } from '../../components/modals/ModalView';
import { RootStackParamList } from '../../components/navigation/Navigation';
import useInterval from '../../hooks/useInterval';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { editTask, TTask } from '../../redux/tasksSlice';
import { ProgressBar } from './components/ProgressBar';
import { TimerForm } from './components/TimerForm';
import { getTimeString, toTime } from './timerUtils';

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

  // const outOftime = (task.estimate && spendedTime > task.estimate) || false;
  const estimateTime = (task.estimate && task.estimate - spendedTime) || 0;
  const spendEstimatedTime =
    (task.estimate && spendedTime - task.estimate) || 0;

  const estTime = getTimeString(task.estimate || 0, '');
  const time = getTimeString(estimateTime, 'Осталось');
  const outTime = getTimeString(spendEstimatedTime, 'Просрочено на');

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

  const handleStartTimer = () => {
    if (task.estimate !== 0) setTimerStart(!timerStart);
    if (task.estimate === 0) setTimerModal(true);
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
        text={estTime}
        onPress={() => setTimerModal(true)}
      />
      {task.estimate !== 0 && (
        <InfoLine
          label="Прогресс"
          text={spendedTime > (task.estimate || 0) ? outTime : time}>
          <ProgressBar value={spendedTime} max={task.estimate || 0} />
        </InfoLine>
      )}

      <View style={styles.footer}>
        <Button
          label={timerStart ? 'Остановить' : 'Запуск'}
          onPress={handleStartTimer}
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
