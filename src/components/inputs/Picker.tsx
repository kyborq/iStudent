import React, { useState } from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { TOUCHABLE_COLOR } from '../../colors';
import { Icon, TIcon } from '../Icon';
import { ModalView } from '../modals/ModalView';

type Props = {
  icon: TIcon;
  label?: string;
  value?: string;
  placeholder?: string;
  children?: React.ReactNode;
  visible?: boolean;
  handleShow?: () => void;
  handleHide?: () => void;
};

export const Picker = ({
  icon,
  label,
  placeholder,
  value,
  children,
  visible,
  handleShow,
  handleHide,
}: Props) => {
  const [popupVisible, setPopupVisible] = useState(false);

  const handleShowPopup = () => {
    setPopupVisible(!popupVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableNativeFeedback
        background={TOUCHABLE_COLOR}
        onPress={handleShow}>
        <View
          style={{
            paddingHorizontal: 24,
            paddingVertical: 8,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{ flex: 1 }}>
            {!!label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.input}>
              <Icon icon={icon} color="#c7c7c7" />
              <Text style={[styles.value, !value && styles.placeholder]}>
                {value || placeholder}
              </Text>
            </View>
          </View>
          <Icon icon="chevronDown" color="#c7c7c7" />
        </View>
      </TouchableNativeFeedback>

      <ModalView title={label} visible={visible} onClose={handleHide}>
        {children}
      </ModalView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    flex: 1,
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  label: {
    fontSize: 12,
    color: '#c7c7c7',
    marginBottom: 8,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 16,
  },
  placeholder: {
    color: '#C7C7C7',
  },
});
