import { format } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';
import React from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { COLORS, TOUCHABLE_COLOR } from '../../../colors';
import { strings } from '../../../localizations/localization';
import { ILocaleIterator } from './DateSelect';

type Props = {
  selected?: boolean;
  current?: boolean;
  color?: 'red' | 'blue';
  date: Date | number;
  onSelect?: (date: Date | number) => void;
};

export const WeekDay = ({
  date,
  selected,
  current,
  color,
  onSelect,
}: Props) => {
  const number = format(date, 'dd');

  const locale: ILocaleIterator = {
    en_US: enUS,
    ru_RU: ru,
  };

  const day = format(date, 'iiiiii', { locale: locale[strings.getLanguage()] });

  const handleSelect = () => {
    onSelect && onSelect(date);
  };

  return (
    <View style={styles.ripple}>
      <TouchableNativeFeedback
        onPress={handleSelect}
        background={TOUCHABLE_COLOR}>
        <View
          style={[
            styles.container,
            selected && styles.selectedContainer,
            current && styles.currentContainer,
          ]}>
          <Text
            style={[
              styles.label,
              selected && styles.selectedText,
              current && !selected && styles.currentText,
            ]}>
            {day}
          </Text>
          <Text
            style={[
              styles.text,
              selected && styles.selectedText,
              current && !selected && styles.currentText,
            ]}>
            {number}
          </Text>
          {!!color && (
            <View style={[styles.weekColor, !selected && styles[color]]} />
          )}
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  ripple: {
    width: 48,
    borderRadius: 8,
    overflow: 'hidden',
  },
  container: {
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f2f2f2',
    borderRadius: 8,
  },
  label: {
    fontSize: 12,
    color: '#c7c7c7',
    marginBottom: -3,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  weekColor: {
    marginTop: 2,
    width: 6,
    height: 6,
    backgroundColor: '#FFF',
    borderRadius: 3,
  },
  selectedContainer: {
    backgroundColor: COLORS.primary5A9EEE,
    borderColor: COLORS.primary5A9EEE,
  },
  selectedText: {
    color: '#FFF',
  },
  currentContainer: {
    borderColor: COLORS.primary5A9EEE,
  },
  currentText: {
    color: COLORS.primary5A9EEE,
  },
  red: {
    backgroundColor: COLORS.redF26969,
    borderRadius: 3,
  },
  blue: {
    backgroundColor: COLORS.blue5A9EEE,
    borderRadius: 3,
  },
});
