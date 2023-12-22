import {
  View,
  Text,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useRoute} from '@react-navigation/native';

import styles from './styles';
import Header from '@/components/Header';
import {images, languageImages} from '@/assets';
import {colors} from '@/constants';
import InfoPart from './components/InfoPart';
import ButtonItem from '@/components/Button';
import DrawerButton from '@/components/DrawerButton';
import BackButton from '@/components/BackButton';
import RenderRating from '@/components/RenderRating';
import CustomVideo from '@/components/CustomVideo';
import ModalPopper from '@/components/ModalPopper';

import {useGlobalContext, useTranslations} from '@/hooks';
import {CATEGORIES, LEARN_TOPICS, TEST_PREPARATIONS} from '@/store/mock-data';

import {getCountryNameFromCode} from '@/utils';

import ReviewList from '@/components/ReviewList';
import * as tutorService from '@/services/tutorService';

import EncryptedStorage from 'react-native-encrypted-storage';
import BookingTable from './components/BookingTable';
import ReportForm from './components/ReportForm';
import ToastManager from 'toastify-react-native';
import {toastConfig} from '@/config';

const LANGUAGES = CATEGORIES[0].categories;
const SPECIALTIES = [...LEARN_TOPICS, ...TEST_PREPARATIONS];
const width = Dimensions.get('window').width;

const TutorDetail = () => {
  const route: any = useRoute();
  const {t} = useTranslations();
  const [loadingPagination, setLoadingPagination] = useState(false);

  const [tutorDetail, setTutorDetail] = useState<any>({
    rating: 0,
    languages: '',
    education: '',
    experience: '',
    interests: '',
    totalFeedback: 0,
    specialties: '',
    isFavorite: null,
    video: '',
    bio: '',
    User: {},
  });
  const [country, setCountry] = useState({
    flag: undefined,
    name: '',
  });

  const [isOpenReport, setIsOpenReport] = useState(false);

  const [feedbacks, setFeedbacks] = useState([]);
  const [page, setPage] = useState({
    currentPage: 1,
    totalItems: 0,
  });
  const [isFullscreen, setIsFullscreen] = useState(false);

  const onChangePage = useCallback((page: number) => {
    setPage((prev: any) => ({
      ...prev,
      currentPage: page,
    }));
  }, []);

  const renderItem = (items: any[]) => {
    return items.map((item, index) => {
      return (
        <ButtonItem
          key={index}
          title={item}
          style={{
            paddingVertical: 6,
            paddingHorizontal: 10,
            marginLeft: 10,
            marginBottom: 8,
            borderRadius: 99,
            color: colors.primary,
            backgroundColor: colors.backgroundActive,
          }}
        />
      );
    });
  };

  const getSpecialtyNames = (specialties: string) => {
    const _specialties = specialties.split(',');

    return _specialties.map(key => {
      return SPECIALTIES.find(item => item.key === key)?.name;
    });
  };

  const getLanguagesName = (languages: string) => {
    const _languages = languages.split(',');

    return _languages.map(key => {
      return LANGUAGES.find(item => item.key === key)?.description;
    });
  };

  const handleAddFavorite = async () => {
    const res = await tutorService.addFavoriteTutor({
      tutorId: tutorDetail.User.id,
    });
    if (res.success) {
      setTutorDetail((prev: any) => {
        return {
          ...prev,
          isFavorite: !prev.isFavorite,
        };
      });
    }
  };

  useEffect(() => {
    const getTutorInfoById = async () => {
      const tutorId = route.params?.tutorId;
      const res = await tutorService.getTutorInfoById({
        params: {
          tutorId: tutorId,
        },
      });

      if (res.success) {
        setTutorDetail(res.data);
        const _country: any = await getCountryNameFromCode(
          res.data?.User?.country,
        );
        setCountry(_country);
      } else {
        console.log(res.message);
      }
    };

    getTutorInfoById();
  }, [route.params?.tutorId]);

  useEffect(() => {
    const getFeedback = async () => {
      setLoadingPagination(true);
      const tutorId = route.params?.tutorId;
      const feedbackRes = await tutorService.getFeedbackByTutorId(tutorId, {
        params: {
          perPage: 12,
          page: page.currentPage,
        },
      });

      if (feedbackRes.success) {
        const {data} = feedbackRes.data;
        setFeedbacks(data.rows);
        setPage((prev: any) => {
          return {
            ...prev,
            totalItems: data.count,
          };
        });
        setLoadingPagination(false);
      }
    };

    getFeedback();
  }, [route.params?.tutorId, page.currentPage]);

  return (
    <ScrollView
      nestedScrollEnabled={true}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={isFullscreen ? [] : [0]}>
      <Header drawerBtn={<DrawerButton />} backIcon={<BackButton />} />
      <View style={styles.inner}>
        <View style={styles.info}>
          <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
            <Image
              src={tutorDetail.User?.avatar}
              source={images.defaultAvatar}
              style={styles.avatar}
            />
            <View>
              <Text
                style={{color: colors.black, fontSize: 22, fontWeight: '500'}}>
                {tutorDetail?.User?.name}
              </Text>
              <View style={{flexDirection: 'row', marginVertical: 4}}>
                <RenderRating rating={tutorDetail?.rating} size={18} />
                <Text
                  style={{
                    marginLeft: 6,
                    color: colors.grey700,
                    fontStyle: 'italic',
                  }}>
                  ({tutorDetail?.totalFeedback})
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  src={country.flag}
                  source={languageImages.vietNam}
                  style={{width: 20, height: 15}}
                />
                <Text style={{fontSize: 14, color: colors.text, marginLeft: 6}}>
                  {country.name}
                </Text>
              </View>
            </View>
          </View>
          <Text
            style={{
              paddingTop: 15,
              marginBottom: 12,
              textAlign: 'justify',
              fontSize: 15,
              color: colors.text,
              paddingHorizontal: 10,
            }}>
            {tutorDetail?.bio}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingHorizontal: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                handleAddFavorite();
              }}
              style={{padding: 8}}
              activeOpacity={0.7}>
              <View style={{alignItems: 'center'}}>
                {!!tutorDetail?.isFavorite ? (
                  <AntDesign name="heart" size={24} color={colors.error} />
                ) : (
                  <AntDesign name="hearto" size={24} color={colors.primary} />
                )}
                <Text
                  style={{
                    marginTop: 4,
                    color: !!tutorDetail?.isFavorite
                      ? colors.error
                      : colors.primary,
                  }}>
                  Favorite
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsOpenReport(!isOpenReport);
              }}
              style={{padding: 8}}
              activeOpacity={0.7}>
              <View style={{alignItems: 'center', marginLeft: 54}}>
                <AntDesign
                  name="exclamationcircleo"
                  size={24}
                  color={colors.primary}
                />
                <Text style={{marginTop: 4, color: colors.primary}}>
                  Report
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <CustomVideo
            uri={tutorDetail?.video}
            isFullscreen={isFullscreen}
            onChangeOrientation={setIsFullscreen}
          />

          <InfoPart title={t('tutorDetail.education')}>
            <Text style={{fontSize: 14, color: colors.text, marginLeft: 12}}>
              {tutorDetail?.education}
            </Text>
          </InfoPart>
          <InfoPart title={t('tutorDetail.languages')}>
            <View style={{flexDirection: 'row'}}>
              {renderItem(getLanguagesName(String(tutorDetail?.languages)))}
            </View>
          </InfoPart>
          <InfoPart title={t('tutorDetail.specialties')}>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {renderItem(getSpecialtyNames(String(tutorDetail?.specialties)))}
            </View>
          </InfoPart>
          <InfoPart title={t('tutorDetail.interests')}>
            <Text style={{marginLeft: 10, fontSize: 14, color: colors.text}}>
              {tutorDetail?.interests}
            </Text>
          </InfoPart>
          <InfoPart title={t('tutorDetail.teachingExperience')}>
            <Text style={{marginLeft: 10, fontSize: 14, color: colors.text}}>
              {tutorDetail?.experience}
            </Text>
          </InfoPart>
          <InfoPart title={t('tutorDetail.othersReview')}>
            <ReviewList
              data={feedbacks}
              totalItems={page.totalItems}
              currentPage={page.currentPage}
              onChangePage={onChangePage}
              loading={loadingPagination}
            />
          </InfoPart>
        </View>
        <BookingTable tutorId={route.params?.tutorId} />
      </View>

      <ModalPopper visible={isOpenReport} transparent={true}>
        <ReportForm tutorDetail={tutorDetail} toggleModal={setIsOpenReport} />
      </ModalPopper>

      <StatusBar
        backgroundColor={colors.white}
        barStyle={'dark-content'}
        hidden={isFullscreen}
      />
      <ToastManager {...toastConfig} width={width - 30} />
    </ScrollView>
  );
};

export default TutorDetail;
