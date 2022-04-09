import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dialogue } from '../../../components/modals/Dialogue';
import { TTask } from '../../../redux/tasksSlice';

type Props = {
  task: TTask;
  onComplete?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
};

export const TaskFooter = ({
  task,
  onComplete,
  onArchive,
  onDelete,
}: Props) => {
  const [deleteModal, showDeleteModal] = useState(false);

  const handleDelete = () => {
    showDeleteModal(!deleteModal);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttons}></View>

      <Dialogue
        visible={deleteModal}
        title="Вы уверены?"
        message="Задача будет удалена и ее больше не вернуть назад. Подумайте об этом..."
        onContinue={onDelete}
        onCancel={handleDelete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttons: {
    flexDirection: 'row',
  },
});
