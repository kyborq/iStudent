import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from './IconButton';
import { ArrowLeftIcon } from '../icons';

type Props = {
  title: string;
  children?: React.ReactNode;
  onBack?: () => void;
};

export const Header = ({ title, children, onBack }: Props) => {
  return (
    <View style={styles.header}>
      <View style={[styles.container, onBack && styles.fill]}>
        {onBack && <IconButton icon={<ArrowLeftIcon />} onPress={onBack} />}
        <Text style={styles.title}>{title}</Text>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  title: {
    fontFamily: 'Golos-Bold',
    color: '#000000',
    fontSize: 24,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
  },
  fill: {
    flex: 1,
  },
});
