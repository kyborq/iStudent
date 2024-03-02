import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  icon: React.ReactNode;
  label?: string;
  onPress?: () => void;
};

export const IconButton = ({ icon, label, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <View style={styles.container}>
        {icon}
        {!!label && <Text style={styles.label}>{label}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    margin: -12,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  label: {
    color: '#212529',
    fontFamily: 'Golos-Bold',
    lineHeight: 20,
  },
});
