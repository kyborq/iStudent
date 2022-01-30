import React from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { Icon, TIcon } from './Icon';

type Props = {
  label: string;
  text?: string;
  icon?: TIcon;
  disabled?: boolean;
  children?: React.ReactNode;
  onPress?: () => void;
};

export const InfoLine = ({
  icon,
  text,
  label,
  disabled,
  children,
  onPress,
}: Props) => {
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, 0.05)', false)}
      disabled={!onPress || disabled}
      onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.icon}>
          {icon && <Icon icon={icon} color="#c7c7c7" />}
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>{label}</Text>
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
        {!disabled && onPress && (
          <View style={{ justifyContent: 'center' }}>
            <Icon icon="chevronRight" color="#c7c7c7" />
          </View>
        )}
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 16,
  },
  label: {
    fontSize: 14,
    color: '#c7c7c7',
    marginBottom: 4,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  container: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    flexDirection: 'row',
    marginBottom: 6,
  },
  icon: {
    marginRight: 10,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    width: 24,
    height: 24,
  },
  content: {
    flex: 1,
  },
  action: {
    paddingTop: 8,
    marginLeft: 16,
  },
});
