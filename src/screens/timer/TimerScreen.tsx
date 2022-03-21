import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from '../../components/Header';
import { InfoLine } from '../../components/InfoLine';
import { IconButton } from '../../components/inputs/IconButton';
import { ModalView } from '../../components/modals/ModalView';
import { RootStackParamList } from '../../components/navigation/Navigation';
import useInterval from '../../hooks/useInterval';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setTimer } from '../../redux/tasksSlice';
import { ProgressBar } from './components/ProgressBar';
import { Timer } from './components/Timer';
import { TimerForm } from './components/TimerForm';
import { getTime, getTimes, getTimeString } from './timerUtils';

export const TimerScreen = () => {
  const [timerActive, setTimerActive] = useState(false);
  const [timerModal, setTimerModal] = useState(false);

  const route = useRoute<RouteProp<RootStackParamList, 'Timer'>>();
  const id = route?.params?.id;

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const task = useAppSelector((state) =>
    state.tasks.tasks.find((task) => task.id === id),
  );

  const [spendedTime, setSpendedTime] = useState(task?.spended || 0);
  const [estimatedTime, setEstimatedime] = useState(task?.estimate || 0);

  useInterval(() => {
    timerActive && setSpendedTime(spendedTime + 1);
  }, 1000);

  useEffect(() => {
    handleSaveTimer();
  }, [spendedTime, estimatedTime]);

  const setEstimate = (s: number) => {
    handleTimerModal();
    setEstimatedime(s);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleStartTimer = () => {
    setTimerActive(!timerActive);
  };

  const handleSaveTimer = () => {
    dispatch(
      setTimer({
        task: task?.id || id,
        spended: spendedTime,
        estimated: estimatedTime,
      }),
    );
  };

  const handleTimerModal = () => setTimerModal(!timerModal);

  const endTime = getTimes(estimatedTime);

  return (
    <View style={styles.container}>
      <Header title="Таймер" onLeft={handleBack} />
      <Timer
        active={timerActive}
        spended={spendedTime}
        estimate={estimatedTime}
        onStart={handleStartTimer}
        onReset={() => setSpendedTime(0)}
      />
      <View style={{ marginVertical: 10, marginHorizontal: 24 }}></View>
      <View style={styles.footer}>
        <InfoLine icon="check" label="Задача" text={task?.title} />
        <InfoLine
          icon="time"
          label="Время выполнения"
          text={`${endTime.hours}:${endTime.minutes}`}
          onPress={handleTimerModal}
        />
      </View>

      <ModalView
        title="Время выполнения"
        visible={timerModal}
        onClose={handleTimerModal}>
        <TimerForm onSubmit={setEstimate} />
      </ModalView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  footer: {
    paddingBottom: 24,
  },
});
