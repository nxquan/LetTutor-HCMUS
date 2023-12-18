import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import ReviewList from '@/components/ReviewList';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useTranslations} from '@/hooks';
import * as tutorService from '@/services/tutorService';

type Props = {
  toggleModal: (value: boolean) => void;
  tutorId: string;
};

const height = Dimensions.get('window').height;
const ReviewModal = (props: Props) => {
  const {toggleModal, tutorId} = props;
  const [reviews, setReviews] = React.useState<any>([]);
  const {t} = useTranslations();

  const [page, setPage] = useState({
    currentPage: 1,
    totalItems: 0,
  });

  const onChangePage = useCallback((page: number) => {
    setPage((prev: any) => ({
      ...prev,
      currentPage: page,
    }));
  }, []);

  useEffect(() => {
    const getFeedback = async () => {
      if (!!tutorId) {
        const feedbackRes = await tutorService.getFeedbackByTutorId(tutorId, {
          params: {
            perPage: 12,
            page: page.currentPage,
          },
        });

        if (feedbackRes.success) {
          const {data} = feedbackRes.data;
          setReviews(data.rows);
          setPage((prev: any) => {
            return {
              ...prev,
              totalItems: data.count,
            };
          });
        }
      }
    };

    getFeedback();
  }, [tutorId, page.currentPage]);

  return (
    <View style={{width: '100%', maxHeight: height - 200}}>
      <View className="flex-row justify-between items-center">
        <Text className="text-black text-base font-semibold">
          {t('tutorDetail.othersReview')}
        </Text>

        <TouchableOpacity
          onPress={() => {
            toggleModal(false);
          }}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View className="h-px mt-4 bg-gray-300" />
      <ScrollView className="w-full pt-3" showsVerticalScrollIndicator={false}>
        <ReviewList
          data={reviews}
          totalItems={page.totalItems}
          currentPage={page.currentPage}
          onChangePage={onChangePage}
        />
      </ScrollView>
    </View>
  );
};

export default ReviewModal;
