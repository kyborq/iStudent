import moment from 'moment';
import React from 'react';
import { View } from 'react-native';
import { InfoLine } from '../../../components/InfoLine';
import { ProgressBar } from '../../timer/components/ProgressBar';
import { getTimeString } from '../../timer/timerUtils';

type Props = {
  label?: string;
  description?: string;
  date?: string;
  status?: boolean;
  spended?: number;
  estimate?: number;
  onShowDateModal?: (status: boolean) => void;
  onTimer?: () => void;
};

export const TaskInfo = ({
  label,
  description,
  date,
  status,
  spended,
  estimate,
  onTimer,
  onShowDateModal,
}: Props) => {
  const currentDate = moment().format('DD.MM.YYYY');

  const outOfDate = currentDate < (date || currentDate);
  const isOutOfTime = !!spended && !!estimate && spended > estimate;
  const spendedTime = getTimeString(spended || 0);
  const estimatedTime = getTimeString(estimate || 0);
  const outOfTime =
    (!!spended &&
      !!estimate &&
      getTimeString(spended - estimate, 'Просрочено на')) ||
    '';

  return (
    <View>
      {!!label && (
        <InfoLine
          icon="textInfo"
          label="Название задачи"
          text={label}
          disabled={status}
        />
      )}

      {!!description && (
        <InfoLine
          label="Описание задачи"
          text={description}
          disabled={status}
        />
      )}

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
      </InfoLine>
    </View>
  );
};
