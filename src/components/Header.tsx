import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../colors';
import { TIcon } from './Icon';
import { IconButton } from './IconButton';

type Props = {
  label: string;
  actionIcon?: TIcon;
  onBack?: () => void;
  onAction?: () => void;
};

export const Header = ({ onBack, onAction, actionIcon, label }: Props) => {
  return (
    <View style={styles.container}>
      {onBack && (
        <IconButton
          icon="back"
          color={COLORS.primary5A9EEE}
          containerStyle={styles.iconBack}
          onPress={onBack}
        />
      )}
      <View style={styles.header}>
        <Text style={styles.label} numberOfLines={1}>
          {label}
        </Text>
      </View>
      {onAction && (
        <IconButton
          icon={actionIcon || 'add'}
          color={COLORS.primary5A9EEE}
          onPress={onAction}
        />
      )}
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
  iconBack: {
    marginRight: 12,
  },
  header: {
    flex: 1,
    paddingRight: 24,
  },
});
