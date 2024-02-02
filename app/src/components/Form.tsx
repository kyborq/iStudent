import { StyleSheet, View } from 'react-native';

type Props = {
  children?: React.ReactNode;
};

export const Form = ({ children }: Props) => {
  return <View style={styles.form}>{children}</View>;
};

const styles = StyleSheet.create({
  form: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    paddingHorizontal: 25,
    paddingVertical: 20,
    shadowColor: '#dee2e6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 16,
    gap: 16,
  },
});
