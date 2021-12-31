import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../colors';
import { Icon, TIcon } from './Icon';
import { IconButton } from './inputs/IconButton';

type Props = {
  label: string;
  text?: string;
  icon?: TIcon;
  disabled?: boolean;
  actionIcon?: TIcon;
  children?: React.ReactNode;
  onAction?: () => void;
};

export const InfoLine = ({
  icon,
  text,
  label,
  actionIcon,
  onAction,
  disabled,
  children,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        {icon && <Icon icon={icon} color="#c7c7c7" />}
        {!icon && <View style={styles.emptyIcon} />}
      </View>
      <View style={styles.content}>
        <Text
          style={[
            styles.label,
            { textDecorationLine: disabled ? 'line-through' : 'none' },
          ]}>
          {label}
        </Text>
        {!!text && (
          <Text
            style={[
              styles.text,
              {
                textDecorationLine: disabled ? 'line-through' : 'none',
                color: disabled ? '#c7c7c7' : '#000',
              },
            ]}>
            {text}
          </Text>
        )}
        {children && <View style={{ marginTop: 8 }}>{children}</View>}
      </View>
      {actionIcon && !disabled && (
        <View style={styles.action}>
          <IconButton
            icon={actionIcon}
            color={COLORS.primary5A9EEE}
            background="#fff"
            onPress={onAction}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: '#c7c7c7',
    marginBottom: 4,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    marginBottom: 16,
    flexDirection: 'row',
  },
  icon: {
    marginRight: 10,
  },
  emptyIcon: {
    width: 24,
    height: 24,
  },
  content: {
    flex: 1,
  },
  action: {
    // justifyContent: 'center',
    paddingTop: 8,
    marginLeft: 16,
  },
});
