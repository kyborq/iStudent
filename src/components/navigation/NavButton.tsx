import React from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { COLORS } from '../../colors';
import { Icon, TIcon } from './../Icon';

type Props = {
  icon: TIcon;
  label?: string;
  active?: boolean;
  onPress?: () => void;
};

export const NavButton = ({ icon, label, active, onPress }: Props) => {
  return (
    <TouchableNativeFeedback
      style={{ overflow: 'visible' }}
      onPress={onPress}
      background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, 0.05)', true)}>
      <View style={styles.container}>
        <Icon
          icon={icon}
          color={active ? COLORS.primary5A9EEE : COLORS.darkC7C7C7}
        />
        {!!label && (
          <Text
            style={[styles.label, active && { color: COLORS.primary5A9EEE }]}>
            {label}
          </Text>
        )}
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 64,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  label: {
    fontSize: 10,
    color: '#c7c7c7',
    marginTop: 4,
    fontWeight: 'bold',
  },
});
