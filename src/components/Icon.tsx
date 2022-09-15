import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { icons } from '../icons';

export type TIcon = keyof typeof icons;

type Props = {
  icon: TIcon;
  containerStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  color?: string;
  fill?: string;
};

export const Icon = ({ icon, color, containerStyle, iconStyle }: Props) => {
  const IconComponent = icons[icon];
  return (
    <View style={containerStyle}>
      <IconComponent stroke={color} style={iconStyle} />
    </View>
  );
};
