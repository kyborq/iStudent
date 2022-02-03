import React from 'react';
import { StyleProp, Text, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { TouchableNativeFeedback, View } from 'react-native';
import { COLORS, TOUCHABLE_COLOR } from '../../colors';
import { useAppSelector } from '../../redux/store';
import { Icon, TIcon } from '../Icon';

type Props = {
  icon: TIcon;
  label?: string;
  size?: number;
  primary?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  background?: boolean;
  onPress?: () => void;
};

export const IconButton = ({
  icon,
  label,
  size = 48,
  primary,
  containerStyle,
  buttonStyle,
  background,
  onPress,
}: Props) => {
  const color = useAppSelector((state) => state.settings.theme);

  const primaryTheme = {
    text: {
      color: '#FFF',
    },
    container: {
      backgroundColor: background ? '#fff' : color,
    },
  };

  const defaultTheme = {
    text: {
      color: color,
    },
    container: {
      backgroundColor: background ? '#fff' : COLORS.lightFAFAFA,
    },
  };

  const styleWithLabel: StyleProp<ViewStyle> = {
    paddingHorizontal: 16,
  };

  return (
    <View
      style={[
        styles.container,
        containerStyle,
        { borderRadius: Math.round(size / 2) },
      ]}>
      <TouchableNativeFeedback background={TOUCHABLE_COLOR} onPress={onPress}>
        <View
          style={[
            styles.button,
            buttonStyle,
            primary ? primaryTheme.container : defaultTheme.container,
            !!label && styleWithLabel,
          ]}>
          <Icon icon={icon} color={!primary ? color : '#FFF'} />
          {!!label && (
            <Text
              style={[
                styles.label,
                primary ? primaryTheme.text : defaultTheme.text,
              ]}>
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
    minWidth: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightFAFAFA,
  },
  label: {
    fontSize: 12,
    marginLeft: 6,
    marginRight: 6,
    fontWeight: 'bold',
  },
});
