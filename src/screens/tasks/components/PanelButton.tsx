import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { TOUCHABLE_COLOR } from '../../../colors';
import { useAppSelector } from '../../../redux/store';

type Props = {
  title: string;
  number?: number;
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export const PanelButton = ({
  title,
  number,
  selected,
  style,
  onPress,
}: Props) => {
  const color = useAppSelector((state) => state.settings.theme);

  const selectedStyle = {
    container: {
      backgroundColor: color + '12',
    },
    text: {
      color: color,
    },
  };

  return (
    <View
      style={[styles.touchable, selected && selectedStyle.container, style]}>
      <TouchableNativeFeedback background={TOUCHABLE_COLOR} onPress={onPress}>
        <View style={styles.container}>
          <Text style={[styles.text, selected && selectedStyle.text]}>
            {`${title}${(number && ' ' + number) || ''}`}
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  touchable: {
    borderRadius: 12,
    backgroundColor: '#fafafa',
    overflow: 'hidden',
    marginRight: 8,
  },
  text: {
    fontWeight: 'bold',
    color: '#c7c7c7',
  },
});
