import React from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { TOUCHABLE_COLOR } from '../../colors';
import { useAppSelector } from '../../redux/store';
import { Icon } from '../Icon';

export type TItem = {
  title: string;
  value: string;
};

type Props = {
  title?: string;
  value?: string;
  active?: boolean;
  onSelect?: (value?: string) => void;
};

export const SelectItem = ({ title, value, active, onSelect }: Props) => {
  const color = '#f2f2f2';

  const activeStyles = {
    button: {
      backgroundColor: color + '12',
    },
    text: {
      marginLeft: 8,
      color: color,
    },
  };

  const handleSelect = () => {
    onSelect && onSelect(value);
  };

  return (
    <View style={styles.container}>
      <TouchableNativeFeedback
        background={TOUCHABLE_COLOR}
        onPress={handleSelect}>
        <View style={[styles.button, active && activeStyles.button]}>
          {active && <Icon icon="checkLine" color={color} />}
          <Text style={[styles.title, active && activeStyles.text]}>
            {title}
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  button: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  title: {
    marginLeft: 32,
    fontWeight: 'bold',
    color: '#c7c7c7',
  },
  withIcon: {},
});
