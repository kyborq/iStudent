import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableNativeFeedback,
} from 'react-native';
import { TOUCHABLE_COLOR } from '../../../colors';
import { useAppSelector } from '../../../redux/store';
import { ProgressBar } from '../../timer/components/ProgressBar';

type Props = {
  label: string;
  progress: number;
  estimate: number;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export const ScheduleTaskCard = ({
  label,
  style,
  progress,
  estimate,
  onPress,
}: Props) => {
  const theme = useAppSelector((s) => s.settings.theme);

  return (
    <View style={[styles.container, style]}>
      <TouchableNativeFeedback background={TOUCHABLE_COLOR} onPress={onPress}>
        <View style={styles.button}>
          <Text style={styles.label}>{label}</Text>
          {progress > 0 && (
            <ProgressBar value={progress} max={estimate} color={theme} />
          )}
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 1,

    shadowColor: '#aaa',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  button: {
    width: 140,
    height: 100,
    padding: 12,
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
