import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type Props = {
  text: string;
  isPrimary?: boolean;
  onPress?: () => void;
};

export const Button = ({ text, isPrimary, onPress }: Props) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.97, {
      mass: 0.05,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      mass: 0.05,
    });
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <Animated.View
        style={[
          styles.button,
          isPrimary && styles.buttonPrimary,
          animatedStyle,
        ]}>
        <Text style={[styles.text, isPrimary && styles.textPrimary]}>
          {text}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 64,
    backgroundColor: '#E7EEF9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },
  text: {
    fontFamily: 'Golos-Bold',
    textTransform: 'uppercase',
    color: '#1774FF',
  },
  buttonPrimary: {
    backgroundColor: '#1774FF',
  },
  textPrimary: {
    color: '#ffffff',
  },
});
