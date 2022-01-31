import moment from 'moment';
import React from 'react';
import { View } from 'react-native';
import { COLORS } from '../../../colors';
import { InfoLine } from '../../../components/InfoLine';
import { toTime } from '../../timer/timerUtils';

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
        text={`${toTime(spended || 0)} из ${toTime(estimate || 0)}`}
        onPress={onTimer}
        disabled={status}>
        <View
          style={{
            height: 16,
            borderRadius: 8,
            backgroundColor: '#f2f2f2',
            width: '100%',
            overflow: 'hidden',
          }}>
          <View
            style={{
              width: `${((spended || 0) / (estimate || 0)) * 100}%`,
              backgroundColor:
                (spended || 0) > (estimate || 0)
                  ? COLORS.dangerF26969
                  : COLORS.primary5A9EEE,
              height: 16,
            }}
          />
        </View>
      </InfoLine>
    </View>
  );
};
