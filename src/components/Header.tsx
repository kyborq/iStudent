import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { TIcon } from './Icon';
import { IconButton } from './inputs/IconButton';

type Props = {
  title?: string;
  text?: string;
  leftIcon?: TIcon;
  rightIcon?: TIcon;
  onLeft?: () => void;
  onRight?: () => void;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  textStyle?: TextStyle;
};

export const Header = ({
  title,
  text,
  leftIcon,
  rightIcon,
  onLeft,
  onRight,
  style,
  labelStyle,
  textStyle,
}: Props) => {
  return (
    <View style={[styles.container, !!leftIcon && { paddingLeft: 10 }, style]}>
      {leftIcon && <IconButton icon={leftIcon} onPress={onLeft} />}

      <View style={[styles.header, !!leftIcon && { marginLeft: 16 }]}>
        {!!title && (
          <Text style={[styles.label, labelStyle]} numberOfLines={1}>
            {title}
          </Text>
        )}
        {!!text && <Text style={[styles.text, textStyle]}>{text}</Text>}
      </View>

      {rightIcon && <IconButton icon={rightIcon} onPress={onRight} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 84,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 21,
  },
  text: {
    fontSize: 12,
    color: '#c7c7c7',
  },
  header: {
    flex: 1,
    paddingRight: 24,
  },
});
