import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../colors';
import { CardBase } from '../../../components/CardBase';
import { Chip } from '../../../components/Chip';
import { Icon } from '../../../components/Icon';
import { Check } from '../../../components/inputs/Check';

type Props = {
  title: string;
  status?: boolean;
  deleted?: boolean;
  priority?: boolean;
  subject?: string;
  description?: string;
  onPress?: () => void;
  onComplete?: () => void;
};

export const TaskCard = ({
  title,
  status,
  description,
  deleted,
  priority,
  subject,
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
            numberOfLines={1}
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
          <Text numberOfLines={1} style={styles.infoText}>
            {description}
          </Text>
        )}
        {(!!subject || priority) && !deleted && !status && (
          <View style={{ flexDirection: 'row', marginTop: 6 }}>
            {priority && (
              <Chip
                label="Важный"
                color="#FFF"
                background={COLORS.dangerF26969}
              />
            )}
            {!!subject && (
              <Chip label={subject} color="#C7C7C7" background={'#FAFAFA'} />
            )}
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
    marginRight: 24,
  },
  checkbox: {
    marginRight: 10,
  },
  infoText: {
    fontSize: 14,
    marginTop: 6,
    color: '#c7c7c7',
  },
});
