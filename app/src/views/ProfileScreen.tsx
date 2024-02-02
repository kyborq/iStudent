import { SafeAreaView, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { IconButton } from '../components/IconButton';
import { SearchIcon } from '../icons';
import { CardButton } from '../components/CardButton';

export const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Header title="Профиль">
        <IconButton icon={<SearchIcon />} />
      </Header>
      <View style={styles.buttons}>
        <CardButton />
        <CardButton />
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
  buttons: {
    flexDirection: 'row',
    gap: 8,
  },
});
