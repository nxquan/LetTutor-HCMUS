import { View, Text } from 'react-native';
import React from 'react';
import Button from '@/components/Button';
import styles from './styles';

type Props = {
  disabled?: boolean;
  onPress?: () => void;
};
const BookButton = (props: Props) => {
  const { disabled, onPress } = props;
  const _props: any = { onPress: onPress };
  let _styles = {
    ...styles.btn,
  };

  if (disabled) {
    _styles = {
      ..._styles,
      ...styles.disabled,
    };
    Object.keys(_props).forEach((key) => {
      if (key.startsWith('on') && typeof _props[key] == 'function') {
        delete _props[key];
      }
    });
  }
  return <Button title='Book' {..._props} style={_styles} />;
};

export default BookButton;
