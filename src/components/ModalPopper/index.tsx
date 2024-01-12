import {View, Text, Modal} from 'react-native';
import React from 'react';
import styles from './styles';
import {useColorScheme} from 'nativewind';

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
  const {colorScheme} = useColorScheme();
  return (
    <Modal visible={visible} transparent={transparent}>
      <View
        style={[
          styles.modalContainer,
          {
            backgroundColor:
              colorScheme == 'light'
                ? 'rgba(0, 0, 0, 0.4)'
                : 'rgba(255,255,255,0.4)',
          },
        ]}>
        <View
          style={[
            styles.modalInner,
            modalInnerStyle,
            {
              backgroundColor: colorScheme == 'light' ? 'white' : 'black',
            },
          ]}>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(ModalPopper);
