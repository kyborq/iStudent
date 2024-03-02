import { forwardRef } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

type Props = {
  label?: string;
  placeholder?: string;
  value?: string;
  onBlur?: () => void;
  onChange?: (text: string) => void;
};

export const Field = forwardRef<TextInput, Props>(
  ({ label, value, placeholder, onBlur, onChange }, ref) => {
    return (
      <View style={styles.field}>
        {!!label && <Text style={styles.label}>{label}</Text>}
        <TextInput
          ref={ref}
          style={styles.input}
          placeholderTextColor="#ced4da"
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
  field: {
    gap: 4,
  },
  label: {
    fontFamily: 'Golos-Regular',
    color: '#ced4da',
    fontSize: 13,
    paddingHorizontal: 24,
  },
  input: {
    backgroundColor: '#F0F3F6',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 24,
    fontFamily: 'Golos-Regular',
    color: '#000000',
  },
});
