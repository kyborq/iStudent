import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableNativeFeedback,
} from 'react-native';

type Props = {
  label: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export const ScheduleTaskCard = ({ label, style, onPress }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, 0.05)', true)}
        onPress={onPress}>
        <View style={styles.button}>
          <Text style={styles.label}>{label}</Text>
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

    elevation: 5,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  button: {
    width: 140,
    height: 100,
    padding: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
