import { SafeAreaView, StyleSheet } from 'react-native';

import { Header } from '../../components/Header';
import { ScreenProps } from '../../components/navigation/Navigator';
import { Scanner } from '../../components/Scanner';
import { useScanCode } from './hooks/useScanCode';

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
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 20,
    paddingVertical: 32,
    flexGrow: 1,
    gap: 24,
  },
});
