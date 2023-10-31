import {View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import PaginationItem from './PaginationItem';
import {colors} from '@/constants';

const Pagination = (props: any) => {
  const {style} = props;

  return (
    <View style={[styles.container, style]}>
      <PaginationItem
        icon={<Ionicons name="chevron-back" size={20} color={colors.grey350} />}
      />
      <PaginationItem active={true} title={1} />
      <PaginationItem title={2} />
      <PaginationItem title={3} />
      <PaginationItem
        icon={
          <Ionicons name="chevron-forward" size={20} color={colors.grey350} />
        }
      />
    </View>
  );
};

export default Pagination;
