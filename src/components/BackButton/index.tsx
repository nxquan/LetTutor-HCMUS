import {TouchableHighlight} from 'react-native';
import React from 'react';
import StackProps from '@/types/type';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';

import styles from './styles';
import {useColorScheme} from 'nativewind';

const BackButton = () => {
  const navigation = useNavigation<StackProps>();
  const {colorScheme, toggleColorScheme} = useColorScheme();

  return (
    <TouchableHighlight
      activeOpacity={0.8}
      underlayColor={
        colorScheme == 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255, 0.4)'
      }
      onPress={() => {
        navigation.goBack();
      }}
      style={styles.container}>
      <Entypo
        name="chevron-left"
        size={24}
        color={colorScheme == 'light' ? 'black' : 'white'}
      />
    </TouchableHighlight>
  );
};

export default BackButton;
