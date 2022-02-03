import React, { useState } from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { TOUCHABLE_COLOR } from '../../colors';
import { uuid4 } from '../../utils';
import { ModalView } from '../modals/ModalView';
import { SelectItem, TItem } from './SelectItem';

type Props = {
  label?: string;
  value?: string;
  placeholder?: string;
  items: TItem[];
  onSelect?: (value?: string) => void;
};

export const Select = ({
  label,
  placeholder,
  value,
  items,
  onSelect,
}: Props) => {
  const [popupVisible, setPopupVisible] = useState(false);

  const handleShowPopup = () => {
    setPopupVisible(!popupVisible);
  };

  const handleSelect = (value?: string) => {
    onSelect && onSelect(value);
    handleShowPopup();
  };

  return (
    <View style={styles.container}>
      {!!label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.touchable}>
        <TouchableNativeFeedback
          background={TOUCHABLE_COLOR}
          onPress={handleShowPopup}>
          <View style={styles.input}>
            <Text style={[styles.value, !value && styles.placeholder]}>
              {value || placeholder}
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>

      <ModalView visible={popupVisible} onClose={handleShowPopup}>
        <SelectItem
          title={placeholder}
          active={!value}
          onSelect={handleSelect}
        />
        {items.map((item) => (
          <SelectItem
            key={uuid4()}
            title={item.title}
            active={item.title === value}
            value={item.value}
            onSelect={handleSelect}
          />
        ))}
      </ModalView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  label: {
    fontSize: 14,
    color: '#c7c7c7',
    marginBottom: 6,
  },
  input: {
    flexDirection: 'row',
    backgroundColor: '#fafafa',
    borderColor: '#fafafa',
    borderRadius: 10,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 14,
    color: '#000',
  },
  placeholder: {
    color: '#C7C7C7',
  },
});
