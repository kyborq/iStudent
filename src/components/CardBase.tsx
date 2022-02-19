import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableNativeFeedback,
  View,
  ViewStyle,
} from 'react-native';

type CardBaseProps = {
  children?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
};

export const CardBase = ({
  children,
  onPress,
  style,
  containerStyle,
}: CardBaseProps) => {
  return (
    <View style={[styles.touchable, style]}>
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple(
          'rgba(0, 0, 0, 0.02)',
          false,
        )}>
        <View style={[styles.container, containerStyle]}>{children}</View>
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
