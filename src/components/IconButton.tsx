import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { TouchableNativeFeedback, View } from 'react-native';
import { COLORS } from '../colors';
import { Icon, TIcon } from './Icon';

type Props = {
  icon: TIcon;
  color?: string;
  background?: string;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export const IconButton = ({
  icon,
  color,
  containerStyle,
  background,
  onPress,
}: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableNativeFeedback onPress={onPress}>
        <View
          style={[styles.button, { backgroundColor: background || '#fafafa' }]}>
          <Icon icon={icon} color={color} />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 48,
    overflow: 'hidden',
  },
  button: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightFAFAFA,
  },
});
