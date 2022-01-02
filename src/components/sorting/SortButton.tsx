import React from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { IconButton } from '../inputs/IconButton';

type Props = {
  items?: string[];
  current?: string;
  onSelect?: () => void;
};

export const SortButton = ({ items, current, onSelect }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableNativeFeedback onPress={() => {}}>
        <View style={styles.button}>
          <IconButton
            icon="down"
            containerStyle={styles.icon}
            buttonStyle={styles.iconButton}
            background="#ffffff00"
          />
          <Text style={styles.label}>{current}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 32,
    overflow: 'hidden',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
  },
  label: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    alignSelf: 'center',
  },
  iconButton: {
    backgroundColor: '#ffffff00',
  },
});
