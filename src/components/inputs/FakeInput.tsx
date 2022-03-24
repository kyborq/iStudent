import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { useAppSelector } from '../../redux/store';

type Props = {
  label: string;
  placeholder?: string;
  value?: string;
  active?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export const FakeInput = ({
  label,
  placeholder,
  value,
  active,
  onPress,
  style,
}: Props) => {
  const color = '#f2f2f2';
  return (
    <View style={[styles.container, style]}>
      {!!label && <Text style={styles.label}>{label}</Text>}
      <Pressable onPress={onPress}>
        <View
          style={[
            styles.inputContainer,
            active && { borderColor: color + 'AA' },
          ]}>
          <View style={styles.input}>
            <Text style={styles.inputValue}>{value || placeholder}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#c7c7c7',
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    borderColor: '#f2f2f2',
    borderWidth: 1,
    borderRadius: 10,
    flex: 1,
  },
  input: {
    padding: 14,
    flex: 1,
  },
  inputValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
