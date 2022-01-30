import moment from 'moment';
import React from 'react';
import { View } from 'react-native';
import { InfoLine } from '../../../components/InfoLine';

type Props = {
  label?: string;
  description?: string;
  date?: string;
  status?: boolean;
  onShowDateModal?: (status: boolean) => void;
  onTimer?: () => void;
};

export const TaskInfo = ({
  label,
  description,
  date,
  status,
  onTimer,
  onShowDateModal,
}: Props) => {
  const currentDate = moment(date, 'DD.MM.YYYY');
  const deadlineDate = currentDate.endOf('day').fromNow();

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
        text={!!date ? `${date}` : 'Без срока'}
        disabled={status}
        onPress={() => onShowDateModal && onShowDateModal(true)}
      />

      <InfoLine
        icon="time"
        label="Таймер"
        text={'0 часов из 2'}
        onPress={onTimer}
        disabled={status}
      />
    </View>
  );
};
