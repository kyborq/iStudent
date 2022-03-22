import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../../../colors';
import { IconButton } from '../../../components/inputs/IconButton';
import { SortButton } from '../../../components/sorting/SortButton';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { changeTaskSorting, ETaskSorting } from '../../../redux/tasksSlice';

type Props = {
  archived?: number;
  completed?: number;
  showCompleted?: boolean;
  showArchived?: boolean;
  onSort?: () => void;
  onShowArchived?: () => void;
  onShowCompleted?: () => void;
};

export const TaskSortPanel = ({
  archived,
  completed,
  showCompleted,
  showArchived,
  onSort,
  onShowArchived,
  onShowCompleted,
}: Props) => {
  const dispatch = useAppDispatch();
  const sorting = useAppSelector((state) => state.tasks.sorting);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  label: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
