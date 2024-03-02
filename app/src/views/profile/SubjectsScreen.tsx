import { SafeAreaView, StyleSheet } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Header } from '../../components/Header';
import { IconButton } from '../../components/IconButton';
import { AppParamList } from '../../components/navigation/Navigator';
import { PlusIcon, SearchIcon } from '../../icons';

type ScreenProps = NativeStackScreenProps<AppParamList>;

export const SubjectsScreen = ({ navigation }: ScreenProps) => {
  return (
    <SafeAreaView style={styles.root}>
      <Header title="Предметы" onBack={() => navigation.pop()}>
        <IconButton
          icon={<PlusIcon fill="#1774FF" />}
          onPress={() => navigation.push('NewSubject')}
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
