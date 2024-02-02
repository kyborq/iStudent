import { forwardRef } from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';

type Props = {
  placeholder?: string;
  value?: string;
  onBlur?: () => void;
  onChange?: (text: string) => void;
};

export const Field = forwardRef<TextInput, Props>(
  ({ value, placeholder, onBlur, onChange }, ref) => {
    return (
      <View>
        <TextInput
          ref={ref}
          style={styles.input}
          placeholderTextColor="#C4CAD2"
          placeholder={placeholder}
          value={value}
          onBlur={onBlur}
          onChangeText={onChange}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#F0F3F6',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 24,
  },
});
