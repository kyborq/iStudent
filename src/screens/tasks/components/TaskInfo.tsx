import moment from 'moment';
import React from 'react';
import { View } from 'react-native';
import { InfoLine } from '../../../components/InfoLine';
import { TSubject } from '../../../redux/subjectsSlice';
import { TTask } from '../../../redux/tasksSlice';
import { ProgressBar } from '../../timer/components/ProgressBar';
import { getTimeString } from '../../timer/timerUtils';

type Props = {
  task: TTask;
  subject?: TSubject;
  onShowSubject?: (id: string) => void;
  onSetTimer?: (id: string) => void;
};

export const TaskInfo = ({
  task,
  subject,
  onShowSubject,
  onSetTimer,
}: Props) => {
  const currentDate = moment().format('DD.MM.YYYY');

  // const outOfDate = currentDate < (date || currentDate);
  // const isOutOfTime = !!spended && !!estimate && spended > estimate;
  // const spendedTime = getTimeString(spended || 0);
  // const estimatedTime = getTimeString(estimate || 0);
  // const outOfTime =
  //   (!!spended &&
  //     !!estimate &&
  //     getTimeString(spended - estimate, 'Просрочено на')) ||
  //   '';

  const handleShowSubject = () => {
    onShowSubject && onShowSubject(subject?.id || '');
  };

  const handleSetTimer = () => {
    onSetTimer && onSetTimer(task.id);
  };

  return (
    <View>
      <InfoLine
        icon="textInfo"
        label="Название задачи"
        text={task.title}
        disabled={task.completed}
      />
      {!!subject?.title && (
        <InfoLine
          icon="book"
          label="Предмет"
          text={subject?.title}
          disabled={task.completed}
          onPress={handleShowSubject}
        />
      )}

      <InfoLine
        icon="time"
        label="Таймер"
        text={'Не установлен'}
        disabled={task.completed}
        onPress={handleSetTimer}
      />

      {/* 

      <InfoLine
        icon="book"
        label="Срок выполнения"
        text={
          !!date ? `${date} ${outOfDate ? '(просрочен)' : ''}` : 'Без срока'
        }
        disabled={status}
        alert={outOfDate}
        onPress={() => onShowDateModal && onShowDateModal(true)}
      />

      <InfoLine
        icon="time"
        label="Таймер"
        text={isOutOfTime ? outOfTime : `${spendedTime} / ${estimatedTime}`}
        onPress={onTimer}
        alert={isOutOfTime}
        disabled={status}>
        {spended !== 0 && estimate !== 0 && (
          <ProgressBar value={spended || 0} max={estimate || 0} />
        )}
      </InfoLine> */}
    </View>
  );
};
