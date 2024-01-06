import {TouchableHighlight} from 'react-native';
import React from 'react';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import Octicons from 'react-native-vector-icons/Octicons';

import {DrawerProps} from '@/types/type';
import styles from './styles';
import {useColorScheme} from 'nativewind';

const DrawerButton = () => {
  const navigation = useNavigation<DrawerProps>();
  const {colorScheme} = useColorScheme();
  return (
    <TouchableHighlight
      activeOpacity={0.8}
      underlayColor={
        colorScheme == 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.4)'
      }
      onPress={() => {
        navigation.dispatch(DrawerActions.openDrawer());
      }}
      style={styles.container}>
      <Octicons
        name="three-bars"
        size={24}
        color={colorScheme == 'light' ? 'black' : 'white'}
      />
    </TouchableHighlight>
  );
};

export default DrawerButton;
