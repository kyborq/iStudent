import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from '../../components/Header';
import { CommonActions, useNavigation } from '@react-navigation/native';

export const ScheduleScreen = () => {
  const navigation = useNavigation();

  const handleAddEvent = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'EditEvent',
      }),
    );
  };

  const handleShowEvent = (id: string) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'ViewEvent',
        params: { id: id },
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Мое расписание" onRight={handleAddEvent} />
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
    paddingTop: 16,
  },
});
