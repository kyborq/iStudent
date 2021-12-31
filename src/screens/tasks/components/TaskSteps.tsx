import React, { useState } from 'react';
import { InfoLine } from '../../../components/InfoLine';
import { useAppDispatch } from '../../../redux/store';
import {
  addTaskStep,
  completeTaskStep,
  deleteTaskStep,
  TStep,
} from '../../../redux/tasksSlice';
import { uuid4 } from '../../../utils';
import { TaskCard } from './TaskCard';
import { StepForm } from '../components/StepForm';
import { ModalView } from '../../../components/ModalView';

type Props = {
  taskId: string;
  steps: TStep[];
  disabled?: boolean;
};

export const TaskSteps = ({ steps, taskId, disabled }: Props) => {
  const [stepModal, setStepModal] = useState(false);
  const dispatch = useAppDispatch();

  const handleCompleteStep = (id: string) => {
    dispatch(completeTaskStep(id));
  };

  const handleDeleteStep = (id: string) => {
    dispatch(deleteTaskStep(id));
  };

  const handleAddStep = (value: string) => {
    const step: TStep = {
      id: uuid4(),
      status: false,
      label: value,
      taskId: taskId,
    };

    dispatch(addTaskStep(step));
  };

  return (
    <>
      <InfoLine
        icon="checkLine"
        label="Шаги"
        text={steps.length ? '' : 'Нет шагов'}
        actionIcon="add"
        onAction={() => setStepModal(true)}
        disabled={disabled}>
        {steps.map((s) => (
          <TaskCard
            key={s.id}
            label={s.label}
            status={disabled || s.status}
            onCheck={() => !disabled && handleCompleteStep(s.id)}
          />
        ))}
      </InfoLine>
      <ModalView
        title="Добавить шаг"
        visible={stepModal}
        onClose={() => setStepModal(false)}>
        <StepForm
          onSubmit={(value) => {
            setStepModal(false);
            handleAddStep(value || '');
          }}
        />
      </ModalView>
    </>
  );
};
