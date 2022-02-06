import React, { useState } from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { TOUCHABLE_COLOR } from '../../colors';
import { uuid4 } from '../../utils';
import { Icon } from '../Icon';
import { SelectItem } from '../inputs/SelectItem';
import { ModalView } from '../modals/ModalView';

type Props = {
  items: string[];
  values: string[];
  current: string;
  onSelect?: (value: string) => void;
};

export const SortButton = ({ items, values, current, onSelect }: Props) => {
  const [sortModal, setModalVisible] = useState(false);

  const toggleSortModal = () => setModalVisible(!sortModal);

  const handleSubmit = (value: string) => {
    toggleSortModal();
    onSelect && onSelect(value);
  };

  return (
    <View style={styles.container}>
      <TouchableNativeFeedback
        background={TOUCHABLE_COLOR}
        onPress={toggleSortModal}>
        <View style={styles.sortButton}>
          <Text style={styles.text}>{current}</Text>
          <Icon icon="chevronDown" color="#e2e2e2" />
        </View>
      </TouchableNativeFeedback>

      <ModalView visible={sortModal} onClose={toggleSortModal}>
        {items.map((item, index) => (
          <SelectItem
            key={uuid4()}
            title={item}
            value={values[index]}
            active={item === current}
            onSelect={() => handleSubmit(values[index])}
          />
        ))}
      </ModalView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 8,
  },
  sortButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingLeft: 12,
    paddingVertical: 8,
  },
  text: {
    fontWeight: 'bold',
    marginRight: 4,
  },
});
