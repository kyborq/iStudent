import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from '../components/Header';
import { useAppDispatch } from '../redux/store';

export const TimerScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handleBack = () => {
    navigation.goBack();
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
  content: {
    paddingHorizontal: 24,
    flexGrow: 1,
  },
});
