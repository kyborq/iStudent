import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

type Props = {
  label?: string;
  placeholder?: string;
};

export const Input = ({ label, placeholder }: Props) => {
  return (
    <View style={styles.container}>
      {!!label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <TextInput placeholder={placeholder} style={styles.input} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  label: {},
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
