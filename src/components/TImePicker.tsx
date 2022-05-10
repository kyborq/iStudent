import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from './button/Button';
import { Input } from './inputs/Input';

type Props = {
  value?: string;
  onSubmit?: (value: string) => void;
};

export const TimePicker = ({ onSubmit, value }: Props) => {
  const parsedValue = value?.split(':') || [];
  const pHours = parseInt(parsedValue[0]);
  const pMinutes = parseInt(parsedValue[1]);

  const [hours, setHours] = useState(pHours || 0);
  const [minutes, setMinutes] = useState(pMinutes || 0);

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
          placeholder={`${hours}`.padStart(2, '0')}
          label="Часы"
          style={{ flex: 1 }}
          value={`${hours}`.padStart(2, '0')}
          onChange={handleHours}
          ghost
        />
        <Input
          placeholder={`${minutes}`.padStart(2, '0')}
          label="Минуты"
          style={{ flex: 1 }}
          value={`${minutes}`.padStart(2, '0')}
          onChange={handleMinutes}
          ghost
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
