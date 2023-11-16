import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';

const PaginationItem = (props: any) => {
  const {title, icon, active, disabled, onPress} = props;
  let Component: any = TouchableOpacity;
  let _props: {disabled?: boolean; onPress?: any; style?: any} = {
    disabled: !!disabled,
    onPress: onPress,
    style: [styles.paginationItem, active && styles.activeContainer],
  };

  if (!!disabled) {
    Component = View;
    delete _props.onPress;
  }

  return (
    <Component {..._props}>
      {icon}
      {!!title && (
        <Text style={[styles.title, active && styles.activeTitle]}>
          {title}
        </Text>
      )}
    </Component>
  );
};

export default PaginationItem;
