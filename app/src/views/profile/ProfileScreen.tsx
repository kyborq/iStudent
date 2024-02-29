import { SafeAreaView, StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { CardButton } from '../../components/CardButton';
import { Header } from '../../components/Header';
import { IconButton } from '../../components/IconButton';
import { AppParamList } from '../../components/navigation/Navigator';
import { Profile } from '../../components/Profile';
import {
  BookIcon,
  ScanIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from '../../icons';

type ProfileScreenProps = NativeStackScreenProps<AppParamList>;

export const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  return (
    <SafeAreaView style={styles.root}>
      <Header title="Профиль">
        <IconButton icon={<SearchIcon />} />
      </Header>
      <Profile />
      <View style={styles.menu}>
        <View style={styles.buttons}>
          <CardButton icon={<UsersIcon fill="#1774FF" />} label="Участники" />
          <CardButton
            icon={<ScanIcon fill="#1774FF" />}
            label="Сканер"
            onPress={() => navigation.push('Scanner')}
          />
        </View>
        <View style={styles.buttons}>
          <CardButton icon={<BookIcon fill="#1774FF" />} label="Предметы" />
          <CardButton
            icon={<SettingsIcon fill="#1774FF" />}
            label="Настройки"
            onPress={() => navigation.push('Settings')}
          />
        </View>
      </View>
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
  menu: {
    flexDirection: 'row',
    flex: 1,
    gap: 8,
  },
  buttons: {
    gap: 8,
    flex: 1,
  },
});
