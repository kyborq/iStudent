import { StyleSheet, Text, View } from 'react-native';

import { ArrowLeftIcon } from '../icons';
import { IconButton } from './IconButton';

type Props = {
  title: string;
  children?: React.ReactNode;
  onBack?: () => void;
};

export const Header = ({ title, children, onBack }: Props) => {
  return (
    <View style={styles.header}>
      <View style={[styles.container, (onBack || !!children) && styles.fill]}>
        {onBack && (
          <IconButton
            icon={<ArrowLeftIcon fill="#1774FF" />}
            onPress={onBack}
          />
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.actions}>{children}</View>
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
  actions: {
    gap: 24,
    flexDirection: 'row',
  },
});
