import React from 'react';
import { StyleSheet, View } from 'react-native';
import { uuid4 } from '../../../utils';
import { ColorButton } from './ColorButton';

const colorThemes = ['#5A9EEE', '#72D393', '#F2BB69', '#D372B8'];

type Props = {
  color: string;
  onSelect?: (color: string) => void;
};

export const ColorSelect = ({ color, onSelect }: Props) => {
  const themes = colorThemes.map((theme, index) => (
    <ColorButton
      key={uuid4()}
      color={theme}
      style={index !== colorThemes.length - 1 && { marginRight: 8 }}
      selected={color === theme}
      onPress={() => onSelect && onSelect(theme)}
    />
  ));

  return <View style={styles.container}>{themes}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
