import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

export const Scanner = () => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      const [current] = codes;
      // TODO: Get current qr value and register it
    },
  });

  useEffect(() => {
    !hasPermission && requestPermission();
  }, [hasPermission]);

  if (!device || !hasPermission) return null;

  return (
    <View style={styles.scanner}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        codeScanner={codeScanner}
        isActive
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scanner: {
    flex: 1,
  },
});
