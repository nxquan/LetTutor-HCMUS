import { View, Text, Modal } from 'react-native';
import React from 'react';
import styles from './styles';

const ModalPopper = (props: any) => {
  const { visible, transparent, children, onChangeShowModal } = props;
  return (
    <Modal visible={visible} transparent={transparent}>
      <View style={styles.modalContainer}>
        <View style={styles.modalInner}>{children}</View>
      </View>
    </Modal>
  );
};

export default ModalPopper;
