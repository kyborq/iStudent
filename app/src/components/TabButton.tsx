import { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SvgProps } from 'react-native-svg';

type Props = {
  icon?: React.FC<SvgProps>;
  isCurrent?: boolean;
  onPress?: () => void;
};

export const TabButton = ({ isCurrent, icon, onPress }: Props) => {
  const TabIcon = icon as React.FC<SvgProps>;

  const backgroundColor = useSharedValue(isCurrent ? 1 : 0);

  const animatedButtonStyle = useAnimatedStyle(() => {
    const bgColor = interpolateColor(
      backgroundColor.value,
      [0, 1],
      ['#FFFFFF', '#EAF0F9'],
    );
    return {
      backgroundColor: bgColor,
      borderRadius: 28,
      height: 56,
      alignItems: 'center',
      justifyContent: 'center',
    };
  });

  useEffect(() => {
    backgroundColor.value = withTiming(isCurrent ? 1 : 0, { duration: 200 });
  }, [isCurrent]);

  return (
    <Pressable onPress={onPress} style={styles.root}>
      <Animated.View
        style={[
          styles.button,
          isCurrent && styles.current,
          animatedButtonStyle,
        ]}>
        {icon && <TabIcon fill={isCurrent ? '#1774FF' : '#CFDAEB'} />}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    borderRadius: 28,
  },
  button: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  current: {
    backgroundColor: '#EAF0F9',
    borderRadius: 28,
  },
});
