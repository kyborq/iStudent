import { SafeAreaView, StyleSheet } from 'react-native';

import { Header } from '../../components/Header';
import { IconButton } from '../../components/IconButton';
import { ScreenProps } from '../../components/navigation/types';
import { PlusIcon, SearchIcon } from '../../icons';

export const TasksScreen = ({ navigation }: ScreenProps) => {
  return (
    <SafeAreaView style={styles.root}>
      <Header title="Задачи">
        <IconButton
          icon={<PlusIcon fill="#1774FF" />}
          onPress={() => navigation.push('NewTask')}
        />
        <IconButton icon={<SearchIcon fill="#1774FF" />} />
      </Header>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 20,
    paddingVertical: 32,
    flexGrow: 1,
    gap: 24,
  },
});
