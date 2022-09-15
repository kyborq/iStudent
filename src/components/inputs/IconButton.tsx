import React from 'react';
import {
  TouchableNativeFeedback,
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native';

import { TOUCHABLE_COLOR } from '../../colors';
import { Icon, TIcon } from '../Icon';

type Props = {
  icon: TIcon;
  color?: string;
  style?: ViewStyle;
  onPress?: () => void;
  onLongPress?: () => void;
};

export const IconButton = ({
  icon,
  color,
  style,
  onPress,
  onLongPress,
}: Props) => {
  const iconStyle = color || '#C7C7C7';

  return (
    <View style={[styles.container, style]}>
      <TouchableNativeFeedback
        background={TOUCHABLE_COLOR}
        onPress={onPress}
        onLongPress={onLongPress}>
        <View style={styles.button}>
          <Icon icon={icon} color={iconStyle} />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    margin: -6,
  },
});
