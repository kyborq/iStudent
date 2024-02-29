import { StyleSheet, Text, View } from 'react-native';

import { LogoutIcon } from '../icons';
import { IconButton } from './IconButton';

export const Profile = () => {
  return (
    <View style={styles.profile}>
      <View style={styles.avatar}>
        <Text style={styles.initials}>ИИ</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>Иванов Иван</Text>
        <Text style={styles.group}>ПС-123</Text>
      </View>
      <IconButton icon={<LogoutIcon fill="#BECBE0" />} />
    </View>
  );
};

const styles = StyleSheet.create({
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  avatar: {
    width: 64,
    height: 64,
    backgroundColor: '#1774FF',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    fontSize: 18,
    fontFamily: 'Golos-Bold',
    color: '#ffffff',
  },
  info: {
    flex: 1,
    gap: 8,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Golos-Bold',
    color: '#000000',
  },
  group: {
    color: '#C4CAD2',
    fontSize: 13,
    fontFamily: 'Golos-Regular',
  },
});
