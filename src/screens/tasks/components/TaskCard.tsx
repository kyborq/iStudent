import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CardBase } from '../../../components/CardBase';
import { Icon } from '../../../components/Icon';
import { Check } from '../../../components/inputs/Check';

type Props = {
  title: string;
  status?: boolean;
  deleted?: boolean;
  description?: string;
  onPress?: () => void;
  onComplete?: () => void;
};

export const TaskCard = ({
  title,
  status,
  description,
  deleted,
  onPress,
  onComplete,
}: Props) => {
  return (
    <CardBase onPress={onPress}>
      <View>
        <View style={styles.container}>
          <View style={styles.checkbox}>
            {!deleted && <Check checked={status} onPress={onComplete} />}
            {deleted && <Icon icon="archive" color="#c7c7c7" />}
          </View>
          <Text
            style={[
              styles.label,
              {
                color: status || deleted ? '#c7c7c7' : '#000',
                textDecorationLine: status || deleted ? 'line-through' : 'none',
              },
            ]}>
            {title}
          </Text>
        </View>
        {!!description && !deleted && !status && (
          <View style={styles.info}>
            <Icon icon="info" />
            <Text style={styles.infoText}>{description}</Text>
          </View>
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
  info: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    marginLeft: 10,
    color: '#c7c7c7',
  },
});
