import React from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { COLORS } from '../colors';
import { Icon, TIcon } from './Icon';

type Props = {
  label: string;
  text?: string;
  icon?: TIcon;
  alert?: boolean;
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
  alert,
  onPress,
}: Props) => {
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, 0.05)', false)}
      disabled={!onPress || disabled}
      onPress={onPress}>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>{label}</Text>
          <View style={styles.content}>
            <View style={styles.icon}>
              {icon && <Icon icon={icon} color="#c7c7c7" />}
            </View>
            {!!text && (
              <Text
                style={[
                  styles.text,
                  {
                    textDecorationLine: disabled ? 'line-through' : 'none',
                    color: disabled ? '#c7c7c7' : '#000',
                    paddingRight: 24,
                  },
                  alert && { color: COLORS.redF26969 },
                ]}>
                {text}
              </Text>
            )}
            {children && (
              <View
                style={{
                  marginTop: 8,
                  flex: 1,
                  flexDirection: 'row',
                }}>
                {children}
              </View>
            )}
          </View>
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
  label: {
    fontSize: 12,
    color: '#c7c7c7',
    marginBottom: 8,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginBottom: 8,
    flexDirection: 'row',
  },
  icon: {
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    width: 24,
    height: 24,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  action: {
    paddingTop: 8,
  },
});
