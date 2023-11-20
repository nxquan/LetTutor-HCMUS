import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';

const Button = (props: {
  onPress?: any;
  title: string;
  style?: any;
  leftIcon?: JSX.Element;
  activeOpacity?: number;
}) => {
  const {title, style, activeOpacity, onPress, leftIcon} = props;
  const _styles = [styles.wrapper, style];
  let Component: any = View;
  const _props: any = {
    style: [_styles],
    activeOpacity: activeOpacity || 0.7,
  };

  if (onPress) {
    Component = TouchableOpacity;
    _props.onPress = onPress;
  }

  return (
    <Component {..._props}>
      {leftIcon}
      <Text
        style={[
          styles.title,
          {color: style?.color, fontWeight: style?.fontWeight},
          leftIcon && {marginLeft: 4},
        ]}>
        {title}
      </Text>
    </Component>
  );
};

export default Button;
