import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { COLORS, TOUCHABLE_COLOR } from '../../colors';
import { useAppSelector } from '../../redux/store';
import { Icon, TIcon } from '../Icon';

type Props = {
  label?: string;
  icon?: TIcon;
  primary?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export const Button = ({ label, icon, onPress, style, primary }: Props) => {
  const color = useAppSelector((state) => state.settings.theme);

  const primaryTheme = {
    text: {
      color: '#FFF',
    },
    container: {
      backgroundColor: color,
    },
  };

  const defaultTheme = {
    text: {
      color: color,
    },
    container: {
      backgroundColor: COLORS.lightFAFAFA,
    },
  };

  const theme = primary ? primaryTheme : defaultTheme;

  return (
    <View style={[styles.container, style]}>
      <TouchableNativeFeedback background={TOUCHABLE_COLOR} onPress={onPress}>
        <View style={[styles.button, theme.container]}>
          {icon && (
            <Icon
              icon={icon}
              color={primary ? color : '#FFF'}
              containerStyle={[styles.icon, { marginRight: !!label ? 10 : 0 }]}
            />
          )}
          {!!label && <Text style={[styles.label, theme.text]}>{label}</Text>}
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 10,
  },
  button: {
    overflow: 'hidden',
    borderRadius: 10,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary5A9EEE,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  icon: {},
});
