import React from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
} from 'react-native';

type Props = {
  title?: string;
  visible?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
};

export const ModalView = ({ title, visible, onClose, children }: Props) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPressOut={onClose}>
        <ScrollView
          directionalLockEnabled={true}
          contentContainerStyle={styles.scrollModal}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              {!!title && <Text style={styles.title}>{title}</Text>}
              {children}
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    flex: 1,
  },
  scrollModal: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    margin: 24,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    marginHorizontal: 24,
    marginTop: 14,
  },
});
