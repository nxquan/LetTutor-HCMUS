import {View, Text} from 'react-native';
import React, {useState} from 'react';
import Pagination from '@/components/Pagination';
import ReviewItem from '../ReviewItem';

const ReviewList = (props: any) => {
  const {data, ITEMS_PER_PAGE = 6} = props;
  const [currentFeedbacks, setCurrentFeedbacks] = useState([]);

  const renderReviews = (reviews: any[]) => {
    return reviews.map(review => {
      return <ReviewItem key={review?.id} data={review} />;
    });
  };
  const onChangeCurrentFeedbacks = (data: any) => {
    setCurrentFeedbacks(data);
  };
  return (
    <View
      style={{
        paddingTop: 12,
      }}>
      {renderReviews(currentFeedbacks)}
      <Pagination
        ITEMS_PER_PAGE={ITEMS_PER_PAGE}
        data={data}
        onChangeDataInPage={onChangeCurrentFeedbacks}
      />
    </View>
  );
};

export default ReviewList;
