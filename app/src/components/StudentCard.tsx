import { StyleSheet, Text, View } from 'react-native';

import { User } from '../api/models/userModel';
import { Avatar } from './Avatar';

type Props = {
  user: User;
};

export const StudentCard = ({ user }: Props) => {
  return (
    <View style={styles.user}>
      <Avatar name={user.name} />
      <View style={styles.info}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.group}>@{user.login}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
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
