import React from 'react';
import { StyleSheet, TouchableNativeFeedback, View } from 'react-native';

type CardBaseProps = {
  children?: React.ReactNode;
  onPress?: () => void;
};

export const CardBase = ({ children, onPress }: CardBaseProps) => {
  return (
    <View style={styles.touchable}>
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple(
          'rgba(0, 0, 0, 0.05)',
          false,
        )}>
        <View style={styles.container}>{children}</View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  container: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderColor: '#f2f2f2',
    borderWidth: 1,
  },
});
