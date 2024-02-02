import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { Header } from '../components/Header';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootParamList } from '../components/Navigator';
import { Button } from '../components/Button';

type RegisterScreenProps = NativeStackScreenProps<RootParamList, 'Register'>;

export const RegisterScreen = ({ route }: RegisterScreenProps) => {
  const { params } = route;

  return (
    <SafeAreaView style={styles.root}>
      <Header title="Добро пожаловать!" />
      <View style={styles.form}>
        {params && (
          <Text style={styles.info}>
            <Text style={styles.bold}>{params.author} </Text>
            <Text>хочет пригласить вас в учебную группу</Text>
            <Text style={styles.bold}> {params.group}</Text>
            <Text>. чтобы принять приглашение, введите свое имя</Text>
          </Text>
        )}
        <Button text="Присоединиться" isPrimary isCompact />
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
  form: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    paddingHorizontal: 25,
    paddingVertical: 20,
    shadowColor: '#dee2e6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 16,
    gap: 16,
  },
  info: {
    color: '#000000',
    fontFamily: 'Golos-Regular',
    lineHeight: 20,
  },
  bold: {
    fontFamily: 'Golos-Bold',
  },
});
