import {TouchableHighlight} from 'react-native';
import React from 'react';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import Octicons from 'react-native-vector-icons/Octicons';

import {DrawerProps} from '@/global/type';
import styles from './styles';

const DrawerButton = () => {
  const navigation = useNavigation<DrawerProps>();

  return (
    <TouchableHighlight
      activeOpacity={0.8}
      underlayColor="rgba(0,0,0,0.1)"
      onPress={() => {
        navigation.dispatch(DrawerActions.openDrawer());
      }}
      style={styles.container}>
      <Octicons name="three-bars" size={24} color="black" />
    </TouchableHighlight>
  );
};

export default DrawerButton;
