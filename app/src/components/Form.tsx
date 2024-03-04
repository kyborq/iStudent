import { StyleSheet, Text, View } from 'react-native';

type Props = {
  title?: string;
  children?: React.ReactNode;
};

export const Form = ({ children, title }: Props) => {
  return (
    <View style={styles.form}>
      {!!title && <Text style={styles.title}>{title}</Text>}
      {children}
    </View>
  );
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
  title: {
    color: '#212529',
    fontFamily: 'Golos-Bold',
    lineHeight: 20,
  },
});
