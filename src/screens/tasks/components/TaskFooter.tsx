import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton } from '../../../components/inputs/IconButton';
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
      <IconButton
        icon="checkLine"
        primary={task.completed}
        label={task.completed ? 'Завершена' : 'Завершить'}
        size={54}
        onPress={onComplete}
      />
      <View style={styles.buttons}>
        <IconButton
          icon="archive"
          primary={task.archived}
          size={54}
          onPress={onArchive}
        />
        <IconButton
          icon="trash"
          size={54}
          containerStyle={{ marginLeft: 12 }}
          onPress={handleDelete}
        />
      </View>

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
