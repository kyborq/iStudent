import { StyleSheet, Text, View } from 'react-native';

type Props = {
  name: string;
};

export const Avatar = ({ name }: Props) => {
  const firstLetter = (word: string) => word[0].toUpperCase();
  const initials = name.split(' ').map(firstLetter).join('');

  return (
    <View style={styles.avatar}>
      <Text style={styles.initials}>{initials}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
