import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import ReviewList from '@/components/ReviewList';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useTranslations} from '@/hooks';
import * as tutorService from '@/services/tutorService';
import {colors} from '@/constants';
import {useColorScheme} from 'nativewind';

type Props = {
  toggleModal: (value: boolean) => void;
  tutorId: string;
};

const height = Dimensions.get('window').height;
const ReviewModal = (props: Props) => {
  const {toggleModal, tutorId} = props;
  const [reviews, setReviews] = React.useState<any>([]);
  const [loading, setLoading] = useState(false);
  const {t} = useTranslations();
  const {colorScheme} = useColorScheme();
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
      setLoading(true);
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
      setLoading(false);
    };

    getFeedback();
  }, [tutorId, page.currentPage]);

  return (
    <View style={{width: '100%', maxHeight: height - 200}}>
      <View className="flex-row justify-between items-center">
        <Text className="text-black dark:text-white text-base font-semibold">
          {t('tutorDetail.othersReview')}
        </Text>

        <TouchableOpacity
          onPress={() => {
            toggleModal(false);
          }}>
          <AntDesign
            name="close"
            size={24}
            color={colorScheme == 'light' ? colors.black : colors.white}
          />
        </TouchableOpacity>
      </View>
      <View className="h-px mt-4 bg-gray-300" />
      <ScrollView className="w-full pt-3" showsVerticalScrollIndicator={false}>
        {loading ? (
          <View className="py-4">
            <ActivityIndicator size="large" color={colors.primary} />
            <Text className="text-base text-center font-normal text-black dark:text-white">
              Loading feedback...
            </Text>
          </View>
        ) : reviews ? (
          <ReviewList
            data={reviews}
            totalItems={page.totalItems}
            currentPage={page.currentPage}
            onChangePage={onChangePage}
          />
        ) : (
          <Text className="text-base text-center font-normal text-black dark:text-white">
            There is no any review
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default ReviewModal;
