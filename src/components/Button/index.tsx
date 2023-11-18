import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';

const Button = (props: {onPress?: any; title: string; style?: any}) => {
  const {title, style, onPress} = props;
  const _styles = [styles.wrapper, style];
  let Component: any = View;
  const _props: any = {
    activeOpacity: 0.7,
    style: [_styles],
  };

  if (onPress) {
    Component = TouchableOpacity;
    _props.onPress = onPress;
  }

  return (
    <Component {..._props}>
      <Text
        style={[
          styles.title,
          {color: style?.color, fontWeight: style?.fontWeight},
        ]}>
        {title}
      </Text>
    </Component>
  );
};

export default Button;
