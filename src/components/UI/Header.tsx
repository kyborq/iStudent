import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { TIcon } from '../Icon';
import { IconButton } from '../inputs/IconButton';

type Props = {
  title?: string;
  leftActionIcon?: TIcon;
  primaryActionIcon?: TIcon;
  secondaryActionIcon?: TIcon;
  leftAction?: () => void;
  primaryAction?: () => void;
  secondaryAction?: () => void;
  children?: React.ReactNode;
  smallTitle?: boolean;
};

export const Header = ({
  title,
  leftActionIcon,
  primaryActionIcon,
  secondaryActionIcon,
  leftAction,
  primaryAction,
  secondaryAction,
  children,
  smallTitle,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {!!leftActionIcon && (
          <IconButton
            color="#000"
            icon={leftActionIcon}
            onPress={leftAction}
            style={{ marginRight: 24 }}
          />
        )}
        {!!title && (
          <Text
            style={[styles.label, smallTitle && { fontSize: 21 }]}
            numberOfLines={1}>
            {title}
          </Text>
        )}
        {!!primaryActionIcon && primaryAction && (
          <IconButton
            color="#000"
            icon={primaryActionIcon}
            onPress={primaryAction}
          />
        )}
        {!!secondaryActionIcon && (
          <IconButton
            color="#000"
            style={{ marginLeft: 24 }}
            icon={secondaryActionIcon}
            onPress={secondaryAction}
          />
        )}
      </View>
      {!!children && <View style={styles.childrenContainer}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    paddingHorizontal: 32,
    paddingVertical: 32,
    borderBottomStartRadius: 24,
    borderBottomEndRadius: 24,
  },
  childrenContainer: {
    marginTop: 24,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 24,
    flex: 1,
  },
  text: {
    fontSize: 12,
    color: '#c7c7c7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
