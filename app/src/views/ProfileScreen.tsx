import { SafeAreaView, StyleSheet, View } from 'react-native';

import { CardButton } from '../components/CardButton';
import { Header } from '../components/Header';
import { IconButton } from '../components/IconButton';
import { ProfileIcon, SearchIcon } from '../icons';

export const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Header title="Профиль">
        <IconButton icon={<SearchIcon />} />
      </Header>
      <View style={styles.menu}>
        <View style={styles.buttons}>
          <CardButton icon={<ProfileIcon fill="#1774FF" />} label="Участники" />
          <CardButton icon={<ProfileIcon fill="#1774FF" />} label="Контакты" />
          <CardButton icon={<ProfileIcon fill="#1774FF" />} label="Настройки" />
        </View>
        <View style={styles.buttons}>
          <CardButton icon={<ProfileIcon fill="#1774FF" />} label="Предметы" />
          <CardButton icon={<ProfileIcon fill="#1774FF" />} label="Сканер" />
        </View>
      </View>
      {/* <Scanner
        onScanned={async data => {
          const [client] = data.split(':');
          await saveQrCode(client);
        }}
      /> */}
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
