import React, { useState } from 'react';
import { View } from 'react-native';
import { Button } from '../../../components/inputs/Button';
import { Input } from '../../../components/inputs/Input';
import { TStep } from '../../../redux/tasksSlice';

type Props = {
  step?: TStep;
  onSubmit: (value?: string) => void;
};

export const StepForm = ({ step, onSubmit }: Props) => {
  const [stepDraft, setStepDraft] = useState(step?.label || '');

  return (
    <View>
      <Input
        value={stepDraft}
        onChange={setStepDraft}
        placeholder="Текст подзадачи"
      />
      <Button label="Сохранить" onPress={() => onSubmit(stepDraft)} />
    </View>
  );
};
