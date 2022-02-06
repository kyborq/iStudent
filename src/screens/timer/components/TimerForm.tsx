import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../colors';
import { IconButton } from '../../../components/inputs/IconButton';
import { Input } from '../../../components/inputs/Input';

type Props = {
  onSubmit?: (seconds: number) => void;
};

export const TimerForm = ({ onSubmit }: Props) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleHours = (value: string) => {
    if (value !== '') {
      const h = parseInt(value);
      setHours(h);
    } else {
      setHours(0);
    }
  };

  const handleMinutes = (value: string) => {
    if (value !== '') {
      const m = parseInt(value);
      setMinutes(m);
    } else {
      setMinutes(0);
    }
  };

  const handleSubmit = () => {
    onSubmit && onSubmit(seconds);
  };

  useEffect(() => {
    setSeconds((hours * 60 + minutes) * 60);
  }, [minutes, hours]);

  return (
    <View>
      <View style={styles.inputs}>
        <Input
          label="Часы"
          value={`${hours}`}
          onChange={handleHours}
          style={styles.inputMargin}
        />

        <Input
          label="Минуты"
          value={`${minutes}`}
          onChange={handleMinutes}
          style={styles.input}
        />
      </View>
      <View style={styles.formFooter}>
        <IconButton icon="checkLine" size={52} onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputs: {
    flexDirection: 'row',
    paddingHorizontal: 24,
  },
  input: {
    flex: 1,
  },
  inputMargin: {
    flex: 1,
    marginRight: 16,
  },
  formFooter: {
    paddingHorizontal: 24,
    paddingBottom: 14,
    flexDirection: 'row',
  },
});
