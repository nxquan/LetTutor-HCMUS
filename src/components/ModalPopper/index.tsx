import {View, Text, Modal} from 'react-native';
import React from 'react';
import styles from './styles';

type Props = {
  visible: boolean;
  onChangeShowModal?: any;
  children?: React.JSX.Element;
  transparent?: boolean;
  modalInnerStyle?: any;
};

const ModalPopper = (props: Props) => {
  const {visible, transparent, children, onChangeShowModal, modalInnerStyle} =
    props;
  return (
    <Modal visible={visible} transparent={transparent}>
      <View style={styles.modalContainer}>
        <View style={[styles.modalInner, modalInnerStyle]}>{children}</View>
      </View>
    </Modal>
  );
};

export default React.memo(ModalPopper);
