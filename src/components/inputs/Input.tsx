import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

type Props = {
  label?: string;
  placeholder?: string;
  multiline?: boolean;
  value?: string;
  onChange?: (value: string) => void;
};

export const Input = ({
  label,
  placeholder,
  multiline,
  value,
  onChange,
}: Props) => {
  return (
    <View style={styles.container}>
      {!!label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          multiline={multiline}
          value={value}
          onChangeText={onChange}
        />
      </View>
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
    backgroundColor: '#fafafa',
    borderColor: '#fafafa',
    borderRadius: 10,
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 14,
    flex: 1,
  },
});
