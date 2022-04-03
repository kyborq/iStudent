import { add, format, sub } from 'date-fns';
import { ru } from 'date-fns/locale';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from '../../../components/inputs/IconButton';

type Props = {
  date: Date | number;
  onSelect?: (date: Date | number) => void;
};

export const DateSelect = ({ date, onSelect }: Props) => {
  const handleNextDay = () => {
    const newDate = add(new Date(date), { days: 1 });
    onSelect && onSelect(newDate);
  };

  const handlePrevDay = () => {
    const newDate = sub(date, { days: 1 });
    onSelect && onSelect(newDate);
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>
          {format(date, 'd MMMM, iiii', { locale: ru })}
        </Text>
      </View>
      <IconButton icon="chevronLeft" onPress={handlePrevDay} />
      <IconButton icon="chevronRight" onPress={handleNextDay} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
