import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../colors';

type Props = {
  week: string;
  number: number;
  last?: boolean;
  past?: boolean;
  current?: boolean;
  color?: 'red' | 'blue';
};

export const Day = ({ week, number, last, past, current, color }: Props) => {
  return (
    <View
      style={[
        styles.ripple,
        !last && { marginRight: 6 },
        current && { borderColor: COLORS.primary5A9EEE },
      ]}>
      <View style={styles.container}>
        <Text
          style={[
            styles.label,
            current && { color: COLORS.primary5A9EEE },
            past && { color: '#e2e2e2' },
          ]}>
          {week}
        </Text>
        <Text
          style={[
            styles.text,
            current && { color: COLORS.primary5A9EEE },
            past && { color: COLORS.darkC7C7C7 },
          ]}>
          {`${number}`.padStart(2, '0')}
        </Text>
        {!!color && (
          <View
            style={{
              marginTop: 2,
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor:
                (color === 'red' && COLORS.dangerF26969) ||
                COLORS.primary5A9EEE,
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ripple: {
    flex: 1,
    borderColor: '#f2f2f2',
    borderRadius: 8,
    borderWidth: 1,
  },
  container: {
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#c7c7c7',
    marginBottom: -3,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
