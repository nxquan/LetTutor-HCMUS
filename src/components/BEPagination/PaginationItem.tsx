import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';
import styles from './styles';
import {colors} from '@/constants';

type Props = {
  title?: string;
  icon?: React.JSX.Element;
  active?: boolean;
  disabled?: boolean;
  onPress?: any;
  loading?: any;
};

const PaginationItem = (props: Props) => {
  const {title, icon, active, disabled, onPress, loading} = props;
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

  const renderChild = () => {
    if (loading) {
      return <ActivityIndicator size="small" color={colors.primary} />;
    } else {
      if (!!title) {
        return (
          <Text
            className="text-black dark:text-white"
            style={[active && styles.activeTitle]}>
            {title}
          </Text>
        );
      } else return icon;
    }
  };
  return <Component {..._props}>{renderChild()}</Component>;
};

export default PaginationItem;
