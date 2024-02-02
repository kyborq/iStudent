import { SafeAreaView, StyleSheet } from 'react-native';

import { Header } from '../components/Header';
import { Scanner } from '../components/Scanner';
import { useState } from 'react';
import { saveQrCode } from '../api/services/codesService';

export const ProfileScreen = () => {
  const [scanned, setScanned] = useState(false);

  return (
    <SafeAreaView style={styles.root}>
      <Header title="Профиль" />
      {!scanned && (
        <Scanner
          onScanned={async data => {
            const [client] = data.split(':');
            await saveQrCode(client);
            setScanned(true);
          }}
        />
      )}
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
