import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../colors';
import { Icon, TIcon } from './Icon';
import { IconButton } from './inputs/IconButton';

type Props = {
  text: string;
  onReturn?: () => void;
  onDelete?: () => void;
  icon?: TIcon;
};

export const Empty = ({ text, icon, onReturn, onDelete }: Props) => {
  return (
    <View style={styles.container}>
      {icon && (
        <Icon icon={icon} color="#c7c7c7" containerStyle={styles.icon} />
      )}
      <Text style={styles.text}>{text}</Text>
      {(onReturn || onDelete) && (
        <View style={styles.actions}>
          {onReturn && (
            <IconButton
              icon="addSquare"
              color={COLORS.primary5A9EEE}
              containerStyle={styles.leftButton}
              onPress={onReturn}
            />
          )}
          {onDelete && (
            <IconButton
              icon="trash"
              color={COLORS.dangerF26969}
              onPress={onDelete}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 48,
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    color: '#c7c7c7',
    marginBottom: 32,
  },
  icon: {
    marginBottom: 32,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  leftButton: {
    marginRight: 16,
  },
});
