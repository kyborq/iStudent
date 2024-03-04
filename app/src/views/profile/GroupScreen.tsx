import { FlatList, SafeAreaView, StyleSheet } from 'react-native';

import { Header } from '../../components/Header';
import { IconButton } from '../../components/IconButton';
import { ScreenProps } from '../../components/navigation/types';
import { StudentCard } from '../../components/StudentCard';
import { ScanIcon } from '../../icons';
import { useGetClassmates } from './hooks/useGetClassmates';

export const GroupScreen = ({ navigation }: ScreenProps) => {
  const classmates = useGetClassmates();

  return (
    <SafeAreaView style={styles.root}>
      <Header title="Группа" onBack={() => navigation.pop()}>
        <IconButton
          icon={<ScanIcon fill="#1774FF" />}
          onPress={() => navigation.push('Scanner')}
        />
      </Header>
      <FlatList
        data={classmates}
        renderItem={({ item }) => <StudentCard user={item} />}
        contentContainerStyle={{ gap: 8 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 32,
    flexGrow: 1,
    gap: 24,
  },
});
