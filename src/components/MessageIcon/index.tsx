import {Dimensions} from 'react-native';
import React from 'react';
import {FAB} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import StackProps from '@/types/type';
import {colors} from '@/constants';

const height = Dimensions.get('window').height; //full height
const MessageIcon = () => {
  const navigation: any = useNavigation<StackProps>();
  return (
    <FAB
      style={{
        position: 'absolute',
        top: height - 130,
        right: 20,
      }}
      activeOpacity={0.8}
      visible={true}
      onPress={() => {
        navigation.navigate('Messages');
      }}
      icon={{name: 'message', color: colors.primary}}
      color="white"
    />
  );
};

export default MessageIcon;
