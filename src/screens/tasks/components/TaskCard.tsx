import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CardBase } from '../../../components/CardBase';
import { Icon } from '../../../components/Icon';
import { Check } from '../../../components/inputs/Check';

type Props = {
  label?: string;
  status?: boolean;
  archived?: boolean;
  onPress?: () => void;
  onCheck?: () => void;
};

export const TaskCard = ({
  label,
  status,
  archived,
  onPress,
  onCheck,
}: Props) => {
  return (
    <CardBase onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.checkbox}>
          {!archived && <Check checked={status} onPress={onCheck} />}
          {archived && <Icon icon="archive" color="#c7c7c7" />}
        </View>
        <View>
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
