import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

type Props = {
  onScanned?: (data: string) => void;
};

export const Scanner = ({ onScanned }: Props) => {
  const [doScanCode, setDoScanCode] = useState(true);

  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      setDoScanCode(false);

      const [current] = codes;

      if (current.value && onScanned) {
        onScanned(current.value);
      }

      return;
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
        isActive={doScanCode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scanner: {
    flex: 1,
    borderRadius: 24,
    overflow: 'hidden',
  },
});
