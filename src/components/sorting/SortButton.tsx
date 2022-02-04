import React, { useState } from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { TOUCHABLE_COLOR } from '../../colors';
import { uuid4 } from '../../utils';
import { Icon } from '../Icon';
import { IconButton } from '../inputs/IconButton';
import { SelectItem } from '../inputs/SelectItem';
import { ModalView } from '../modals/ModalView';

type Props = {
  onSelect?: (value: string) => void;
};

export const SortButton = ({ onSelect }: Props) => {
  const [sortModal, setModalVisible] = useState(false);

  const toggleSortModal = () => setModalVisible(!sortModal);

  return (
    <View style={styles.container}>
      <TouchableNativeFeedback
        background={TOUCHABLE_COLOR}
        onPress={toggleSortModal}>
        <View style={styles.sortButton}>
          <Text style={styles.text}>По названию</Text>
          <Icon icon="chevronDown" color="#e2e2e2" />
        </View>
      </TouchableNativeFeedback>

      <ModalView visible={sortModal} onClose={toggleSortModal}>
        <SelectItem title="По названию" active value="BY_NAME" />
        <SelectItem title="По добавлению" value="BY_NAME" />
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
