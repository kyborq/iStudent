import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  icon?: React.ReactNode;
  label: string;
};

export const CardButton = ({ label, icon }: Props) => {
  return (
    <TouchableOpacity>
      <View style={styles.button}>
        {icon}
        <Text style={styles.text}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 100,
    backgroundColor: '#F0F3F6',
    borderRadius: 18,
    padding: 24,
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: 'Golos-Regular',
    color: '#BECBE0',
    fontSize: 14,
  },
});
