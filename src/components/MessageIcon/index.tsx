import {Dimensions, View} from 'react-native';
import React from 'react';
import {FAB} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import Draggable from 'react-native-draggable';

import StackProps from '@/types/type';
import {colors} from '@/constants';

const height = Dimensions.get('window').height; //full height
const MessageIcon = () => {
  const navigation: any = useNavigation<StackProps>();
  return (
    <View
      style={{
        position: 'absolute',
        top: height - 100,
        right: 20,
        width: 50,
        height: 50,
      }}>
      <Draggable>
        <FAB
          activeOpacity={0.8}
          visible={true}
          onPress={() => {
            navigation.navigate('Messages');
          }}
          icon={{name: 'message', color: colors.primary}}
          color="white"
        />
      </Draggable>
    </View>
  );
};

export default MessageIcon;
