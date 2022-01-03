import React, { useState } from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { uuid4 } from '../../utils';
import { IconButton } from '../inputs/IconButton';
import { ModalView } from '../ModalView';

type Props = {
  items?: string[];
  current?: string;
  onSelect?: (value: string) => void;
};

export const SortButton = ({ items, current, onSelect }: Props) => {
  const [sortModal, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableNativeFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.button}>
          <IconButton
            icon="down"
            containerStyle={styles.icon}
            buttonStyle={styles.iconButton}
            background="#ffffff00"
          />
          <Text style={styles.label}>{current}</Text>
        </View>
      </TouchableNativeFeedback>

      <ModalView visible={sortModal} onClose={() => setModalVisible(false)}>
        {items?.map((item) => (
          <TouchableNativeFeedback
            key={uuid4()}
            onPress={() => {
              setModalVisible(false);
              onSelect && onSelect(item);
            }}>
            <View style={styles.item}>
              <Text style={styles.itemLabel}>{item}</Text>
            </View>
          </TouchableNativeFeedback>
        ))}
      </ModalView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 32,
    overflow: 'hidden',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
  },
  label: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    alignSelf: 'center',
  },
  iconButton: {
    backgroundColor: '#ffffff00',
  },
  item: {
    padding: 16,
  },
  itemLabel: {
    fontWeight: 'bold',
  },
});
