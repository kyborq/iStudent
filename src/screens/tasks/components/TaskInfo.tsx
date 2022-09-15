import React, { useState } from 'react';
import { View } from 'react-native';
import { InfoLine } from '../../../components/InfoLine';
import { strings } from '../../../locales';
import { TSubject } from '../../../redux/subjectsSlice';
import { TTask } from '../../../redux/tasksSlice';

type Props = {
  task: TTask;
  subject?: TSubject;
  onShowSubject?: (id: string) => void;
  onSetTimer?: (id: string) => void;
  onSetDeadline?: (date: string) => void;
};

export const TaskInfo = ({
  task,
  subject,
  onShowSubject,
  onSetTimer,
  onSetDeadline,
}: Props) => {
  const [dateModal, setDateModal] = useState(false);

  const handleShowSubject = () => {
    onShowSubject && onShowSubject(subject?.id || '');
  };

  const handleSetTimer = () => {
    onSetTimer && onSetTimer(task.id);
  };

  const handleToggleModal = () => {
    setDateModal(!dateModal);
  };

  const handleSetDeadline = (date: string) => {
    onSetDeadline && onSetDeadline(date);
    handleToggleModal();
  };

  return (
    <View>
      <InfoLine
        icon="textInfo"
        label={strings.task}
        text={task.title}
        disabled={task.completed}
      />
      {!!subject?.title && (
        <InfoLine
          icon="book"
          label={strings.subject}
          text={subject?.title}
          disabled={task.completed}
          onPress={handleShowSubject}
        />
      )}

      <InfoLine
        icon="calendar"
        label={strings.deadline}
        text={(!!task.deadline && task.deadline) || strings.notSelect}
        disabled={task.completed}
      />
    </View>
  );
};
