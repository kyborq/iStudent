import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, ToastAndroid, View } from 'react-native';
import { Header } from '../../components/Header';
import { Icon } from '../../components/Icon';
import { InfoLine } from '../../components/InfoLine';
import { IconButton } from '../../components/inputs/IconButton';
import { Input } from '../../components/inputs/Input';
import { Toggle } from '../../components/inputs/Toggle';
import { ISettingsSlice, updateSettings } from '../../redux/settingsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getOrDefault } from '../../utils';
import { ColorSelect } from './components/ColorSelect';

export const SettingsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings);

  const goBack = () => {
    navigation.goBack();
  };

  const setTheme = (theme: string) => {
    const newSettings = {
      ...settings,
      theme,
    };
    showToast();
    dispatch(updateSettings(newSettings));
  };

  const setName = (name: string) => {
    const newSettings = {
      ...settings,
      name: getOrDefault(name, 'Гость'),
    };
    showToast();
    dispatch(updateSettings(newSettings));
  };

  const setLabelsShown = () => {
    const newSettings = {
      ...settings,
      labels: !settings.labels,
    };
    showToast();
    dispatch(updateSettings(newSettings));
  };

  const showToast = () => {
    ToastAndroid.show('Настройки сохранены!', ToastAndroid.SHORT);
  };

  return (
    <View style={styles.container}>
      <Header label="Настройки" onBack={goBack} />
      <ScrollView contentContainerStyle={styles.content}>
        <InfoLine icon="user" label="Имя">
          <Input
            value={settings.name}
            placeholder="Гость"
            onChange={setName}
            style={{ marginBottom: 0 }}
            clearInput
          />
        </InfoLine>
        <InfoLine icon="settings" label="Цветовая тема">
          <ColorSelect color={settings.theme} onSelect={setTheme} />
        </InfoLine>
        <InfoLine label="Подписи к навигации">
          <Toggle toggled={settings.labels} onPress={setLabelsShown} />
        </InfoLine>
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
    flexGrow: 1,
  },
});