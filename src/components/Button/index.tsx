import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';

const Button = (props: {onPress?: any; title: string; style?: any}) => {
  const {title, style, onPress} = props;
  const _styles = [styles.wrapper, style];
  let Component: any = View;

  if (onPress) {
    Component = TouchableOpacity;
  }

  return (
    <Component style={[_styles]} onPress={onPress} activeOpacity={0.7}>
      <Text style={[styles.title, {color: style?.color}]}>{title}</Text>
    </Component>
  );
};

export default Button;
