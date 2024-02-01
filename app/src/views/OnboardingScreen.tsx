import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { AppParamList } from '../components/Navigator';

type OnboardingScreenProps = NativeStackScreenProps<AppParamList>;

export const OnboardingScreen = ({ navigation }: OnboardingScreenProps) => {
  return (
    <SafeAreaView style={styles.root}>
      <Header title="iStudent" />
      <View style={styles.card}>
        <Text style={styles.text}>
          Передайте этот код старосте, чтобы вас пригласили в учебную группу
        </Text>
      </View>
      <View style={styles.footer}>
        <Button
          text="Войти"
          isPrimary
          onPress={() => navigation.navigate('Protected')}
        />
        <Button text="Создать группу" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 20,
    paddingVertical: 32,
    flexGrow: 1,
    gap: 24,
  },
  card: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 32,
    shadowColor: '#dee2e6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 16,
    alignContent: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Golos-Regular',
    color: '#ced4da',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    gap: 8,
  },
});
