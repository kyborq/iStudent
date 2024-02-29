import { useEffect } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useGetCode } from '../api/hooks/useGetCode';
import { initializeSocketConnection } from '../api/services/socketService';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { RootParamList } from '../components/navigation/Navigator';

type OnboardingScreenProps = NativeStackScreenProps<RootParamList>;

export const OnboardingScreen = ({ navigation }: OnboardingScreenProps) => {
  const { code, getCode } = useGetCode();

  useEffect(() => {
    initializeSocketConnection(
      id => {
        getCode(id);
      },
      data => {
        navigation.navigate('RegisterStudent', {
          author: data.author,
          group: data.group,
          groupId: data.groupId,
        });
      },
    );
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <Header title="iStudent" />
      <View style={styles.card}>
        {!!code && (
          <Image
            style={{
              width: 256,
              height: 256,
            }}
            src={code.qr}
          />
        )}
        {!!code && <Text style={styles.code}>{code.code}</Text>}
        <Text style={styles.text}>
          Передайте этот код старосте, чтобы вас пригласили в учебную группу
        </Text>
      </View>
      <View style={styles.footer}>
        <Button
          text="Войти"
          isPrimary
          onPress={() => navigation.navigate('Login')}
        />
        <Button
          text="Создать группу"
          onPress={() => navigation.navigate('RegisterGroup')}
        />
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
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
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
  code: {
    textAlign: 'center',
    fontSize: 18,
    color: '#1774FF',
    fontFamily: 'Golos-Bold',
  },
});
