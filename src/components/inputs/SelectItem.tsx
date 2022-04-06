import React from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { COLORS, TOUCHABLE_COLOR } from '../../colors';
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
  const activeStyles = {
    button: {
      backgroundColor: COLORS.primary5A9EEE + '12',
    },
    text: {
      marginLeft: 8,
      color: COLORS.primary5A9EEE,
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
          {active && <Icon icon="checkLine" color={COLORS.primary5A9EEE} />}
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
