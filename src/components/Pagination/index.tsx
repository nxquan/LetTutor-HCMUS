import { View, Text } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import PaginationItem from './PaginationItem';
import { colors } from '@/constants';

const Pagination = (props: any) => {
  const { style } = props;

  return (
    <View style={[styles.container, style]}>
      <PaginationItem
        icon={
          <Ionicons
            name='md-chevron-back-outline'
            size={20}
            color={colors.grey350}
          />
        }
      />
      <PaginationItem active={true} title={1} />
      <PaginationItem title={2} />
      <PaginationItem title={3} />
      <PaginationItem
        icon={
          <Ionicons
            name='md-chevron-forward-outline'
            size={20}
            color={colors.grey350}
          />
        }
      />
    </View>
  );
};

export default Pagination;
