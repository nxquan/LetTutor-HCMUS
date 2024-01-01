import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import PaginationItem from './PaginationItem';
import {colors} from '@/constants';

type Props = {
  data: any[];
  style?: any;
  ITEMS_PER_PAGE: number;
  onChangeDataInPage: (data: []) => void;
};

type PaginationProps = {
  total: number;
  currentPage: number;
  totalPages: number;
  itemCount: number;
};
// This component is altered by BEPagination component due to
//BEPagination com handles the pagination in backend and this component
//handles the pagination in frontend
//If you want to use pagination in FE, use this component otherwise in BE, use BEPagination
const Pagination = (props: Props) => {
  const {data, style, ITEMS_PER_PAGE, onChangeDataInPage} = props;
  const [state, setState] = useState<PaginationProps>({
    total: data.length,
    currentPage: 1,
    totalPages: Math.ceil(data.length / ITEMS_PER_PAGE),
    itemCount: 0,
  });

  const renderPaginationItem = () => {
    const paginationItems: any = [];
    for (let i = 1; i <= state.totalPages; i++) {
      paginationItems.push(
        <PaginationItem
          key={i}
          title={i}
          active={i === state.currentPage}
          onPress={() => onChangePage(i)}
        />,
      );
    }
    return paginationItems;
  };
  const assignDataInCurrentPage = () => {
    const skipItems =
      state.currentPage === 1 ? 0 : (state.currentPage - 1) * ITEMS_PER_PAGE;
    const remaining = state.total - (state.currentPage - 1) * ITEMS_PER_PAGE;
    const takeItems = remaining >= ITEMS_PER_PAGE ? ITEMS_PER_PAGE : remaining;
    const newData: any = data.slice(skipItems, skipItems + takeItems);
    onChangeDataInPage(newData);
  };

  const onChangePage = (page: number) => {
    setState(prev => {
      return {
        ...prev,
        currentPage: page,
      };
    });
  };

  useEffect(() => {
    assignDataInCurrentPage();
  }, [state]);

  useEffect(() => {
    setState({
      total: data.length,
      currentPage: 1,
      totalPages: Math.ceil(data.length / ITEMS_PER_PAGE),
      itemCount: 0,
    });
  }, [data]);

  return (
    <View style={[styles.container, style]}>
      <PaginationItem
        disabled={state.currentPage === 1}
        onPress={() => onChangePage(state.currentPage - 1)}
        icon={
          <Ionicons
            name="chevron-back"
            size={20}
            color={state.currentPage === 1 ? colors.grey350 : colors.black}
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
                : colors.black
            }
          />
        }
      />
    </View>
  );
};

export default Pagination;
