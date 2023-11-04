import {View, Text, TouchableHighlight} from 'react-native';
import React from 'react';
import StackProps from '@/global/type';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';

import styles from './styles';

const BackButton = () => {
  const navigation = useNavigation<StackProps>();
  return (
    <TouchableHighlight
      activeOpacity={0.8}
      underlayColor="rgba(0,0,0,0.1)"
      onPress={() => {
        navigation.goBack();
      }}
      style={styles.container}>
      <Entypo name="chevron-left" size={24} color="black" />
    </TouchableHighlight>
  );
};

export default BackButton;
