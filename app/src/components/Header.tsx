import { StyleSheet, Text, View } from 'react-native';

type Props = {
  title: string;
};

export const Header = ({ title }: Props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Golos-Bold',
    color: '#000000',
    fontSize: 24,
  },
});
