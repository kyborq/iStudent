import { StyleSheet, Text, View } from 'react-native';

import { User } from '../api/models/userModel';
import { LogoutIcon } from '../icons';
import { IconButton } from './IconButton';

type Props = {
  user: User;
};

export const Profile = ({ user }: Props) => {
  const firstLetter = (word: string) => word[0].toUpperCase();
  const initials = user.name.split(' ').map(firstLetter).join('');

  return (
    <View style={styles.profile}>
      <View style={styles.avatar}>
        <Text style={styles.initials}>{initials}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.group}>@{user.login}</Text>
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
