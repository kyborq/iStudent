import { StyleSheet, TouchableOpacity, View } from 'react-native';

export const CardButton = () => {
  return (
    <TouchableOpacity>
      <View style={styles.button}></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 163,
    height: 100,
    backgroundColor: 'red',
    borderRadius: 18,
  },
});
