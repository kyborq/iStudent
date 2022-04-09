import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { PanelButton } from './PanelButton';

type Props = {
  all: number;
  todo: number;
  completed: number;
  archived: number;
  filter?: string;
  onSetFilter?: (fitler: string) => void;
};

export const TasksPanel = ({
  all,
  todo,
  completed,
  archived,
  filter,
  onSetFilter,
}: Props) => {
  const showAll = () => onSetFilter && onSetFilter('ALL');
  const showTodo = () => onSetFilter && onSetFilter('TODO');
  const showCompleted = () => onSetFilter && onSetFilter('COMPLETED');
  const showArchived = () => onSetFilter && onSetFilter('ARCHIVED');

  return (
    <View style={styles.panel}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24 }}>
        <PanelButton
          title="Все"
          selected={filter === 'ALL'}
          number={all}
          onPress={showAll}
        />
        <PanelButton
          title="Новые"
          selected={filter === 'TODO'}
          number={todo}
          onPress={showTodo}
        />
        <PanelButton
          title="Завершенные"
          selected={filter === 'COMPLETED'}
          number={completed}
          onPress={showCompleted}
        />
        <PanelButton
          title="Архивированные"
          selected={filter === 'ARCHIVED'}
          number={archived}
          onPress={showArchived}
          style={{ marginRight: 0 }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  panel: {
    flexDirection: 'row',
    marginBottom: 8,
  },
});
