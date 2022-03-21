import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TIcon } from './Icon';
import { IconButton } from './inputs/IconButton';

type Props = {
  title?: string;
  text?: string;
  leftIcon?: TIcon;
  rightIcon?: TIcon;
  onLeft?: () => void;
  onRight?: () => void;
};

export const Header = ({
  title,
  text,
  leftIcon,
  rightIcon,
  onLeft,
  onRight,
}: Props) => {
  return (
    <View style={styles.container}>
      {leftIcon && <IconButton icon={leftIcon} onPress={onLeft} />}

      <View style={styles.header}>
        {!!title && <Text style={styles.label}>{title}</Text>}
        {!!text && <Text style={styles.text}>{text}</Text>}
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
    padding: 24,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 21,
  },
  text: {
    fontSize: 12,
    color: '#c7c7c7',
  },
  iconBack: {
    marginRight: 12,
  },
  header: {
    flex: 1,
    paddingRight: 24,
  },
});
