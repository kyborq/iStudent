import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from './inputs/Button';
import { Input } from './inputs/Input';

type Props = {
  onSubmit?: (value: string) => void;
};

export const TimePicker = ({ onSubmit }: Props) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const handleHours = (value: string) => {
    const h = parseInt(value, 10);
    setHours(clampNumber(h, 0, 23));
  };

  const handleMinutes = (value: string) => {
    const m = parseInt(value, 10);
    setMinutes(clampNumber(m, 0, 59));
  };

  const clampNumber = (h: number, min: number, max: number) => {
    if (h < min) return min;
    if (h > max) return max;
    return h;
  };

  const handleSubmit = () => {
    const h = `${hours}`.padStart(2, '0');
    const m = `${minutes}`.padStart(2, '0');
    const time = `${h}:${m}`;
    onSubmit && onSubmit(time);
  };

  return (
    <View style={styles.container}>
      <View style={styles.timeInputs}>
        <Input
          placeholder="00"
          label="Часы"
          style={{ flex: 1 }}
          value={`${hours}`.padStart(2, '0')}
          onChange={handleHours}
        />
        <Input
          placeholder="00"
          label="Минуты"
          style={{ flex: 1 }}
          value={`${minutes}`.padStart(2, '0')}
          onChange={handleMinutes}
        />
      </View>
      <Button label="Сохранить" primary onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  timeInputs: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
