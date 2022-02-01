import { CommonActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from '../../components/Header';
import { useAppSelector } from '../../redux/store';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const name = useAppSelector((state) => state.settings.name);

  const goToSettings = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Settings',
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Header
        label={`Привет, ${name}!`}
        onAction={goToSettings}
        actionIcon="settings"
      />
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
});
