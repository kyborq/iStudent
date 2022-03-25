import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from '../../../components/inputs/IconButton';

type Props = {
  date: Date | number;
  onPrev?: () => void;
  onNext?: () => void;
};

export const DateSelect = ({ date, onPrev, onNext }: Props) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>
          {format(date, 'd MMMM, iiii', { locale: ru })}
        </Text>
      </View>
      <IconButton icon="chevronLeft" onPress={onPrev} />
      <IconButton icon="chevronRight" onPress={onNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
