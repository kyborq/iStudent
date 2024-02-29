import { SafeAreaView, StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { saveQrCode } from '../../api/services/codesService';
import { Header } from '../../components/Header';
import { AppParamList } from '../../components/navigation/Navigator';
import { Scanner } from '../../components/Scanner';

type ProfileScreenProps = NativeStackScreenProps<AppParamList>;

export const ScannerScreen = ({ navigation }: ProfileScreenProps) => {
  return (
    <SafeAreaView style={styles.root}>
      <Header title="Пригласить по QR" onBack={() => navigation.goBack()} />
      <Scanner
        onScanned={async data => {
          const [client] = data.split(':');
          await saveQrCode(client);
          navigation.goBack();
        }}
      />
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
  menu: {
    flexDirection: 'row',
    flex: 1,
    gap: 8,
  },
  buttons: {
    gap: 8,
    flex: 1,
  },
});
