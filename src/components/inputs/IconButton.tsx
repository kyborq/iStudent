import React from 'react';
import { TouchableNativeFeedback, View, StyleSheet } from 'react-native';

import { TOUCHABLE_COLOR } from '../../colors';
import { Icon, TIcon } from '../Icon';

type Props = {
  icon: TIcon;
  color?: string;
  background?: string;
  onPress?: () => void;
  onLongPress?: () => void;
};

export const IconButton = ({
  icon,
  background,
  color,
  onPress,
  onLongPress,
}: Props) => {
  const buttonStyle = { backgroundColor: background || '#FFFFFF' };
  const iconStyle = color || '#C7C7C7';

  return (
    <View style={styles.container}>
      <TouchableNativeFeedback
        background={TOUCHABLE_COLOR}
        onPress={onPress}
        onLongPress={onLongPress}>
        <View style={[styles.button, buttonStyle]}>
          <Icon icon={icon} color={iconStyle} />
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
  },
});
