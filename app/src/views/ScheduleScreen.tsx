import { SafeAreaView, StyleSheet } from 'react-native';

import { Header } from '../components/Header';
import { IconButton } from '../components/IconButton';
import { PlusIcon, SearchIcon } from '../icons';

export const ScheduleScreen = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Header title="Расписание">
        <IconButton icon={<SearchIcon fill="#1774FF" />} />
        <IconButton icon={<PlusIcon fill="#1774FF" />} />
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
