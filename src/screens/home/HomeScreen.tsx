import { CommonActions, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Header } from '../../components/Header';
import { useAppSelector } from '../../redux/store';

export const HomeScreen = () => {
  const date = moment();

  const navigation = useNavigation();
  const name = useAppSelector((state) => state.settings.name);

  const goToSettings = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Settings',
      }),
    );
  };

  const today = `${date.format('D MMMM')}, ${date.format('dddd')}`;

  return (
    <View style={styles.container}>
      <Header
        label={`Привет, ${name}!`}
        onAction={goToSettings}
        actionIcon="settings"
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={{ fontSize: 14, color: '#c7c7c7' }}>Сегодня</Text>
        <Text style={{ fontSize: 26, fontWeight: 'bold', marginTop: 8 }}>
          {today}
        </Text>
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
    paddingHorizontal: 24,
    flexGrow: 1,
  },
});
