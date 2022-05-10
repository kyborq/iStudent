import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import { Header } from '../components/Header';
import { Button } from '../components/button/Button';
import { useAppDispatch } from '../redux/store';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { hideWelcomeScreen } from '../redux/commonSlice';

export const WelcomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const goToMain = () => {
    dispatch(hideWelcomeScreen());
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Index',
      }),
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/studying.jpg')}
        style={styles.image}
        imageStyle={{ opacity: 0.75 }}>
        <Header
          style={styles.header}
          title="iStudent"
          text="v0.6"
          labelStyle={styles.label}
          textStyle={{ color: '#ffffffaa' }}
        />
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.footer}>
            <Text style={styles.greetings}>Привет!</Text>
            <Text style={styles.text}>
              Давайте начнем улучшать вашу студенческую жизнь :)
            </Text>
            <Button primary label="Вперед" onPress={goToMain} />
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  image: {
    paddingTop: 24,
    flex: 1,
  },
  label: {
    color: '#fff',
    fontSize: 32,
  },
  header: {
    backgroundColor: '#FFFFFF00',
    paddingTop: 24,
  },
  greetings: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 22,
    marginBottom: 48,
  },
});
