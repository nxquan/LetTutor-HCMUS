import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import {colors} from '@/constants';

type Props = {
  type: string;
  hidden?: boolean;
};

const CStatusBar = (props: Props) => {
  const {type, hidden} = props;
  return (
    <StatusBar
      backgroundColor={type == 'light' ? colors.white : colors.black}
      barStyle={type == 'light' ? 'dark-content' : 'light-content'}
      hidden={hidden}
    />
  );
};

export default CStatusBar;
