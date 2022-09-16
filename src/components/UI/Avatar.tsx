import React from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { TOUCHABLE_COLOR } from '../../colors';
import { Icon } from '../Icon';

type Props = {
  letters?: string;
  onPress?: () => void;
  color?: string;
};

export const Avatar: React.FC<Props> = ({ letters, onPress, color }) => {
  const backgroundColor = `${color}22`;

  return (
    <View style={styles.container}>
      <TouchableNativeFeedback onPress={onPress} background={TOUCHABLE_COLOR}>
        <View style={[styles.avatar, !!backgroundColor && { backgroundColor }]}>
          {!!letters ? (
            <Text style={[styles.label, !!color && { color }]}>{letters}</Text>
          ) : (
            <Icon icon="user" color={color} />
          )}
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  avatar: {
    width: 100,
    height: 100,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 21,
    fontWeight: 'bold',
  },
});
