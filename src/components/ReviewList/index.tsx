import {ScrollView, View} from 'react-native';
import React from 'react';
import ReviewItem from '../ReviewItem';
import BEPagination from '../BEPagination';

type Props = {
  data: any;
  totalItems: number;
  currentPage: number;
  onChangePage: (page: number) => void;
};
const ReviewList = (props: Props) => {
  const {data, totalItems, currentPage, onChangePage} = props;

  const renderReviews = (reviews: any[]) => {
    return reviews.map(review => {
      return <ReviewItem key={review?.id} data={review} />;
    });
  };

  return (
    <View
      style={{
        paddingTop: 12,
      }}>
      {renderReviews(data)}
      <BEPagination
        ITEMS_PER_PAGE={12} //Default 12
        totalItems={totalItems}
        currentPage={currentPage}
        onChangePage={onChangePage}
      />
    </View>
  );
};

export default ReviewList;
