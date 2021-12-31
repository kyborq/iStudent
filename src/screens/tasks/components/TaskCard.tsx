import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../colors';
import { CardBase } from '../../../components/CardBase';
import { Icon } from '../../../components/Icon';
import { IconButton } from '../../../components/IconButton';
import { Check } from '../../../components/inputs/Check';

type Props = {
  label?: string;
  status?: boolean;
  archived?: boolean;
  onPress?: () => void;
  onCheck?: () => void;
  onDelete?: () => void;
};

export const TaskCard = ({
  label,
  status,
  archived,
  onPress,
  onCheck,
  onDelete,
}: Props) => {
  return (
    <CardBase onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.checkbox}>
          {!archived && <Check checked={status} onPress={onCheck} />}
          {archived && <Icon icon="archive" color="#c7c7c7" />}
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.label,
              {
                textDecorationLine: status ? 'line-through' : 'none',
                color: status || archived ? '#c7c7c7' : '#000',
              },
            ]}>
            {label}
          </Text>
        </View>
        {onDelete && (
          <IconButton
            icon="trash"
            color={COLORS.dangerF26969}
            containerStyle={{ overflow: 'hidden' }}
            buttonStyle={{ width: 24, height: 24, overflow: 'hidden' }}
            onPress={onDelete}
          />
        )}
      </View>
    </CardBase>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkbox: {
    marginRight: 10,
  },
});
