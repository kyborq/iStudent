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
  const activeLabelStyle = {
    color: active ? COLORS.primary5A9EEE : COLORS.darkC7C7C7,
  };

  return (
    <TouchableNativeFeedback
      onPress={onPress}
      background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, 0.2)', true)}>
      <View style={styles.container}>
        <Icon
          icon={icon}
          color={active ? COLORS.primary5A9EEE : COLORS.darkC7C7C7}
        />
        {!!label && (
          <Text style={[styles.label, activeLabelStyle]}>{label}</Text>
        )}
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#c7c7c7',
    marginTop: 4,
  },
});
