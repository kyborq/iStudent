import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { COLORS } from '../../colors';
import { Icon, TIcon } from '../Icon';

type Props = {
  label?: string;
  icon?: TIcon;
  background?: string;
  color?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export const Button = ({
  label,
  icon,
  background,
  color,
  onPress,
  style,
}: Props) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(
          'rgba(0, 0, 0, 0.05)',
          false,
        )}
        onPress={onPress}>
        <View
          style={[
            styles.button,
            { backgroundColor: background || COLORS.primary5A9EEE },
          ]}>
          {icon && (
            <Icon
              icon={icon}
              color={color}
              containerStyle={[styles.icon, { marginRight: !!label ? 10 : 0 }]}
            />
          )}
          {!!label && (
            <Text style={[styles.label, { color: color || '#fff' }]}>
              {label}
            </Text>
          )}
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 10,
  },
  button: {
    overflow: 'hidden',
    borderRadius: 10,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary5A9EEE,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  icon: {},
});
