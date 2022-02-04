import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from '../../components/Header';
import { RootStackParamList } from '../../components/navigation/Navigation';
import useInterval from '../../hooks/useInterval';
import { useAppDispatch, useAppSelector } from '../../redux/store';

export const TimerScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Timer'>>();
  const id = route?.params?.id;

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const task = useAppSelector((state) =>
    state.tasks.tasks.find((task) => task.id === id),
  );

  useInterval(() => {
    // ...
  }, 1000);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSetEstimate = (seconds: number) => {
    // ...
  };

  const handleSetSpended = (seconds: number) => {
    // ...
  };

  const handleStartTimer = () => {
    // ...
  };

  return (
    <View style={styles.container}>
      <Header label="Таймер" onBack={handleBack} />
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
