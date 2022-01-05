import React from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { COLORS } from '../../../colors';
import { IconButton } from '../../../components/inputs/IconButton';
import { SortButton } from '../../../components/sorting/SortButton';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { changeTaskSorting, ETaskSorting } from '../../../redux/tasksSlice';
import { getKeyByValue } from '../../../utils';

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
      <SortButton
        current={sorting.sorting}
        items={[ETaskSorting.label, ETaskSorting.status, ETaskSorting.priority]}
        onSelect={(value) => {
          const item = value as ETaskSorting;
          dispatch(
            changeTaskSorting({
              sorting: item,
              direction: item === ETaskSorting.priority ? 1 : -1,
            }),
          );
        }}
      />
      <View style={{ flexDirection: 'row' }}>
        <IconButton
          icon="check"
          label={completed !== 0 ? completed?.toString() : ''}
          color={showCompleted ? COLORS.primary5A9EEE : '#c7c7c7'}
          background="#fff"
          onPress={onShowCompleted}
        />
        <IconButton
          icon="archive"
          label={archived !== 0 ? archived?.toString() : ''}
          color={showArchived ? COLORS.primary5A9EEE : '#c7c7c7'}
          background="#fff"
          onPress={onShowArchived}
        />
      </View>
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
