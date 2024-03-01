import { FlatList, SafeAreaView, StyleSheet } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Header } from '../../components/Header';
import { IconButton } from '../../components/IconButton';
import { AppParamList } from '../../components/navigation/Navigator';
import { StudentCard } from '../../components/StudentCard';
import { ScanIcon } from '../../icons';
import { useGetClassmates } from './hooks/useGetClassmates';

type ScreenProps = NativeStackScreenProps<AppParamList>;

export const GroupScreen = ({ navigation }: ScreenProps) => {
  const classmates = useGetClassmates();

  return (
    <SafeAreaView style={styles.root}>
      <Header title="Группа" onBack={() => navigation.pop()}>
        <IconButton
          icon={<ScanIcon />}
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
