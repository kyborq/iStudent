import React from 'react';
import { StyleProp, Text, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { TouchableNativeFeedback, View } from 'react-native';
import { COLORS } from '../../colors';
import { Icon, TIcon } from '../Icon';

type Props = {
  icon: TIcon;
  label?: string;
  color?: string;
  background?: string;
  containerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export const IconButton = ({
  icon,
  color,
  containerStyle,
  buttonStyle,
  label,
  background,
  onPress,
}: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(
          'rgba(0, 0, 0, 0.05)',
          false,
        )}
        onPress={onPress}>
        <View
          style={[
            styles.button,
            buttonStyle,
            {
              backgroundColor: background || '#fafafa',
              width: label ? 'auto' : 48,
              paddingHorizontal: label ? 16 : 0,
            },
          ]}>
          <Icon icon={icon} color={color} />
          {!!label && (
            <Text
              style={{
                fontSize: 12,
                color: color,
                marginLeft: 6,
                fontWeight: 'bold',
              }}>
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
    borderRadius: 48,
    overflow: 'hidden',
  },
  button: {
    flexDirection: 'row',
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightFAFAFA,
  },
});
