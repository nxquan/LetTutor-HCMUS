import {ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import PaginationItem from './PaginationItem';
import {colors} from '@/constants';
import {useColorScheme} from 'nativewind';

type Props = {
  style?: any;
  ITEMS_PER_PAGE: number;
  totalItems: number;
  currentPage: number;
  onChangePage: (page: number) => void;
  loading?: any;
};

type BEPaginationProps = {
  totalItems: number;
  currentPage: number;
  totalPages: number;
};
const BEPagination = (props: Props) => {
  const {
    style,
    ITEMS_PER_PAGE,
    currentPage,
    totalItems: _totalItems,
    onChangePage,
    loading,
  } = props;
  const [state, setState] = useState<BEPaginationProps>({
    totalItems: 0,
    currentPage: 0,
    totalPages: 0,
  });

  const {colorScheme} = useColorScheme();

  useEffect(() => {
    setState(prev => {
      return {
        totalItems: _totalItems,
        currentPage: currentPage,
        totalPages: Math.ceil(_totalItems / ITEMS_PER_PAGE),
      };
    });
  }, [props]);

  const renderPaginationItem = () => {
    const paginationItems: any = [];
    for (let i = 1; i <= state.totalPages; i++) {
      paginationItems.push(
        <PaginationItem
          key={i}
          title={String(i)}
          loading={i === state.currentPage ? loading : false}
          active={i === state.currentPage}
          onPress={() => {
            onChangePage(i);
            setState((prev: any) => ({...prev, currentPage: i}));
          }}
        />,
      );
    }
    return paginationItems;
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.container, style]}
      horizontal
      style={{alignSelf: 'flex-end'}}>
      <PaginationItem
        disabled={state.currentPage === 1}
        onPress={() => onChangePage(state.currentPage - 1)}
        icon={
          <Ionicons
            name="chevron-back"
            size={20}
            color={
              state.currentPage === 1
                ? colors.grey350
                : colorScheme == 'light'
                ? colors.black
                : colors.white
            }
          />
        }
      />
      {state.totalPages > 0 && renderPaginationItem()}
      <PaginationItem
        disabled={state.currentPage === state.totalPages}
        onPress={() => onChangePage(state.currentPage + 1)}
        icon={
          <Ionicons
            name="chevron-forward"
            size={20}
            color={
              state.currentPage === state.totalPages
                ? colors.grey350
                : colorScheme == 'light'
                ? colors.black
                : colors.white
            }
          />
        }
      />
    </ScrollView>
  );
};

export default BEPagination;
