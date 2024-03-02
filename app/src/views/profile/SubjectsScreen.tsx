import { FlatList, SafeAreaView, StyleSheet } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Header } from '../../components/Header';
import { IconButton } from '../../components/IconButton';
import { AppParamList } from '../../components/navigation/Navigator';
import { SubjectCard } from '../../components/SubjectCard';
import { PlusIcon, SearchIcon } from '../../icons';
import { useSubjects } from './hooks/useSubjects';

type ScreenProps = NativeStackScreenProps<AppParamList>;

export const SubjectsScreen = ({ navigation }: ScreenProps) => {
  const { subjects, refresh, refreshing } = useSubjects();

  return (
    <SafeAreaView style={styles.root}>
      <Header title="Предметы" onBack={() => navigation.pop()}>
        <IconButton
          icon={<PlusIcon fill="#1774FF" />}
          onPress={() => navigation.push('NewSubject')}
        />
        <IconButton icon={<SearchIcon fill="#1774FF" />} />
      </Header>
      <FlatList
        data={subjects}
        onRefresh={refresh}
        refreshing={refreshing}
        contentContainerStyle={{ gap: 8, flexGrow: 1, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <SubjectCard subject={item} />}
      />
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
