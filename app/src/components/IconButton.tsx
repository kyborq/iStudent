import { StyleSheet, TouchableOpacity, View } from 'react-native';

type Props = {
  icon: React.ReactNode;
  onPress?: () => void;
};

export const IconButton = ({ icon, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <View>{icon}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    margin: -12,
  },
});
