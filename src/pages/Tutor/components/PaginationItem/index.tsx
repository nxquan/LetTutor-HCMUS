import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './styles';

const PaginationItem = (props: any) => {
  const { title, icon, active, disable } = props;
  let Component: any = TouchableOpacity;
  if (disable) {
    Component = View;
  }

  return (
    <Component style={[styles.container, active && styles.activeContainer]}>
      {icon}
      {!!title && <Text style={[styles.title, active && styles.activeTitle]}>{title}</Text>}
    </Component>
  );
};

export default PaginationItem;
