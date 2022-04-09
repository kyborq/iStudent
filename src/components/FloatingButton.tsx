import React from 'react';
import {
  StyleSheet,
  TouchableNativeFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { COLORS, TOUCHABLE_COLOR } from '../colors';
import { Icon, TIcon } from './Icon';

type Props = {
  icon: TIcon;
  style?: ViewStyle;
  background?: string;
  onPress?: () => void;
};

export const FloatingButton = ({ icon, background, style, onPress }: Props) => {
  return (
    <View style={[styles.ripple, style]}>
      <TouchableNativeFeedback onPress={onPress} background={TOUCHABLE_COLOR}>
        <View
          style={[
            styles.container,
            { backgroundColor: background || COLORS.primary5A9EEE },
          ]}>
          <Icon icon={icon} color="#fff" />
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  ripple: {
    borderRadius: 32,
    overflow: 'hidden',
    width: 56,
    height: 56,
    position: 'absolute',
    margin: 24,
    bottom: 0,
    right: 0,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,

    elevation: 4,
  },
  container: {
    borderRadius: 24,
    flex: 1,
    backgroundColor: COLORS.primary5A9EEE,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
