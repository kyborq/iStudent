import React from 'react';
import { View } from 'react-native';
import { InfoLine } from '../../../components/InfoLine';

type Props = {
  label?: string;
  description?: string;
  date?: string;
  status?: boolean;
  onShowDateModal?: (status: boolean) => void;
};

export const TaskInfo = ({
  label,
  description,
  date,
  status,
  onShowDateModal,
}: Props) => {
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
        text={!!date ? `До ${date}` : 'Без срока'}
        disabled={status}
        onPress={() => onShowDateModal && onShowDateModal(true)}
      />
    </View>
  );
};
