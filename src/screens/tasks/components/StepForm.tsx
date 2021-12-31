import React, { useState } from 'react';
import { View } from 'react-native';
import { Button } from '../../../components/inputs/Button';
import { Input } from '../../../components/inputs/Input';

type Props = {
  onSubmit: (value?: string) => void;
};

export const StepForm = ({ onSubmit }: Props) => {
  const [step, setStep] = useState('');

  return (
    <View>
      <Input value={step} onChange={setStep} placeholder="Текст подзадачи" />
      <Button label="Сохранить" onPress={() => onSubmit(step)} />
    </View>
  );
};
