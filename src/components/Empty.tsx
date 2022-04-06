import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon, TIcon } from './Icon';

type Props = {
  text: string;
  icon?: TIcon;
};

export const Empty = ({ text, icon }: Props) => {
  return (
    <View style={styles.container}>
      {icon && (
        <Icon icon={icon} color="#c7c7c7" containerStyle={styles.icon} />
      )}
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 48,
  },
  text: {
    textAlign: 'center',
    fontSize: 12,
    color: '#c7c7c7',
    marginBottom: 32,
  },
  icon: {
    marginBottom: 32,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  leftButton: {
    marginRight: 16,
  },
});
