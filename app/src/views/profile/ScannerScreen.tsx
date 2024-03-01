import { SafeAreaView, StyleSheet } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Header } from '../../components/Header';
import { AppParamList } from '../../components/navigation/Navigator';
import { Scanner } from '../../components/Scanner';
import { useScanCode } from './hooks/useScanCode';

type ScreenProps = NativeStackScreenProps<AppParamList>;

export const ScannerScreen = ({ navigation }: ScreenProps) => {
  const saveQrCode = useScanCode();

  const handleScannedCode = (data: string) => {
    const [client] = data.split(':');
    saveQrCode(client);
    navigation.pop();
  };

  return (
    <SafeAreaView style={styles.root}>
      <Header title="Пригласить по QR" onBack={() => navigation.pop()} />
      <Scanner onScan={handleScannedCode} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 32,
    flexGrow: 1,
    gap: 24,
  },
});
