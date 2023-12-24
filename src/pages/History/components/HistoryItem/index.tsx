import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Pressable,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Lesson from '@/components/Lesson';
import styles from './styles';
import ModalPopper from '@/components/ModalPopper';
import {colors} from '@/constants';
import DropdownMenu from '@/components/DropdownMenu';
import {useTranslations} from '@/hooks';
import {padNumber, renderStartAndEndHourOnLearning} from '@/utils';
import RenderRating from '@/components/RenderRating';
import {images} from '@/assets';
import * as bookingService from '@/services/bookingService';
import * as lessonReportService from '@/services/lessonReportService';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Toast} from 'toastify-react-native';

type Props = {
  data: any;
  onRefresh: () => void;
};

const HistoryItem = (props: Props) => {
  const {data, onRefresh} = props;
  const {scheduleDetailInfo} = data;
  const {scheduleInfo} = scheduleDetailInfo;
  const {t} = useTranslations();

  const [reasons, setReasons] = useState<any>([]);
  const [isOpenRequest, setIsOpenRequest] = useState(true);
  const [isOpenReview, setIsOpenReview] = useState(true);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState<null | string>(null);

  const [currentRating, setCurrentRating] = useState<any>({
    id: '',
    rating: 1,
    content: '',
  });

  const [currentReport, setCurrentReport] = useState<any>({
    reasonId: -1,
    note: '',
    bookingId: '',
  });

  const onChangeSelected = (item: any) => {
    setCurrentReport((prev: any) => {
      return {
        ...prev,
        reasonId: item.id,
      };
    });
  };

  const onChangeRating = (rating: number) => {
    setCurrentRating((prev: any) => {
      return {
        ...prev,
        rating,
      };
    });
  };

  const handleChangeFeedback = async () => {
    const session: any = await EncryptedStorage.getItem('user_session');
    if (currentRating.id === '') {
      const res = await bookingService.addFeedback(
        {
          content: currentRating.content,
          rating: currentRating.rating,
          bookingId: data?.id,
          userId: scheduleInfo.tutorInfo.id,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(session).accessToken}`,
          },
        },
      );
      if (res.success) {
        Toast.success('Add feedback successfully');
      } else {
        Toast.success(res.message);
      }
    } else {
      const res = await bookingService.editFeedback(
        {
          content: currentRating.content,
          rating: currentRating.rating,
          id: currentRating.id,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(session).accessToken}`,
          },
        },
      );
      if (res.success) {
        Toast.success('Edit feedback successfully');
      } else {
        Toast.success(res.message);
      }
    }
    onRefresh();
    setCurrentRating({id: '', rating: 1, content: ''});
  };

  const handleReport = async () => {
    const session: any = await EncryptedStorage.getItem('user_session');
    const res = await lessonReportService.createReport(
      {
        bookingId: currentReport.bookingId,
        note: currentReport.note,
        reasonId: currentReport.reasonId,
      },
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(session).accessToken}`,
        },
      },
    );

    if (res.success) {
      Toast.success('Add report successfully');
    } else {
      Toast.success(res.message);
    }
  };

  useEffect(() => {
    const fetchReasons = async () => {
      const session: any = await EncryptedStorage.getItem('user_session');
      const res = await lessonReportService.getReasons({
        headers: {
          Authorization: `Bearer ${JSON.parse(session).accessToken}`,
        },
      });
      if (res.success) {
        const _reason = res.data.rows.map((item: any) => {
          return {
            id: item.id,
            title: item.reason,
            key: item.reason,
          };
        });
        setReasons(_reason);
      }
    };

    fetchReasons();
  }, []);

  return (
    <Lesson data={data} history={true}>
      <View style={styles.requestHeader}>
        <Text style={styles.timeText}>
          {t('history.lessonTime')}{' '}
          {padNumber(
            new Date(scheduleDetailInfo.startPeriodTimestamp).getHours(),
          )}
          :
          {padNumber(
            new Date(scheduleDetailInfo.startPeriodTimestamp).getMinutes(),
          )}{' '}
          -{' '}
          {padNumber(
            new Date(scheduleDetailInfo.endPeriodTimestamp).getHours(),
          )}
          :
          {padNumber(
            new Date(scheduleDetailInfo.endPeriodTimestamp).getMinutes(),
          )}
        </Text>
      </View>
      <View style={styles.lessonComment}>
        {data?.studentRequest ? (
          <>
            <TouchableOpacity
              style={styles.lessonBar}
              onPress={() => setIsOpenRequest(!isOpenRequest)}>
              <Text style={{fontSize: 14, color: colors.black}}>
                {t('schedule.requestForLesson')}
              </Text>
              {!isOpenRequest ? (
                <Entypo name="chevron-small-right" size={24} color="black" />
              ) : (
                <Entypo name="chevron-small-down" size={24} color="black" />
              )}
            </TouchableOpacity>
            {isOpenRequest && (
              <View style={{marginTop: 8, paddingHorizontal: 12}}>
                <Text style={styles.commentText}>{data?.studentRequest}</Text>
              </View>
            )}
          </>
        ) : (
          <View style={{marginTop: 8, paddingHorizontal: 12}}>
            <Text style={styles.commentText}>No request for lesson</Text>
          </View>
        )}
      </View>
      <View style={styles.lessonComment}>
        {data?.tutorReview ? (
          <>
            <TouchableOpacity
              style={styles.lessonBar}
              onPress={() => setIsOpenReview(!isOpenReview)}>
              <Text style={{fontSize: 14, color: colors.black}}>
                {t('history.reviewFromTutor')}
              </Text>
              {!isOpenReview ? (
                <Entypo name="chevron-small-right" size={24} color="black" />
              ) : (
                <Entypo name="chevron-small-down" size={24} color="black" />
              )}
            </TouchableOpacity>
            {isOpenReview && (
              <View style={{marginTop: 8, paddingHorizontal: 12}}>
                <Text style={styles.commentText}>{data?.tutorReview}</Text>
              </View>
            )}
          </>
        ) : (
          <View style={{marginTop: 8, paddingHorizontal: 12}}>
            <Text style={styles.commentText}>Tutor haven't reviewed yet</Text>
          </View>
        )}
      </View>

      <View>
        {data?.feedbacks.length > 0 ? (
          <View>
            {data?.feedbacks.map((feedback: any, index: number) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: 12,
                  }}>
                  <View className="flex-row items-center">
                    <Text className="text-black text-md">Rating: </Text>
                    <RenderRating size={14} rating={feedback?.rating} />
                  </View>
                  <View className="flex-row items-center">
                    <TouchableOpacity
                      onPress={() => {
                        setIsOpenModal('rating');
                        setCurrentRating({
                          id: feedback.id,
                          rating: feedback.rating,
                          content: feedback.content,
                        });
                      }}
                      className="mr-4">
                      <Text style={styles.actionBtn}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setIsOpenModal('report');
                        setCurrentReport((prev: any) => {
                          return {
                            ...prev,
                            bookingId: feedback.bookingId,
                          };
                        });
                      }}>
                      <Text style={styles.actionBtn}>{t('report')}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 12,
            }}>
            <TouchableOpacity onPress={() => setIsOpenModal('rating')}>
              <Text style={styles.actionBtn}>{t('rating')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsOpenModal('report');
              }}>
              <Text style={styles.actionBtn}>{t('report')}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <ModalPopper visible={!!isOpenModal} transparent={true}>
        <>
          <TouchableOpacity
            style={{alignSelf: 'flex-end', padding: 8}}
            onPress={() => setIsOpenModal(null)}>
            <AntDesign name="close" size={20} color="black" />
          </TouchableOpacity>
          <View style={styles.modalInfo}>
            <Image
              source={images.defaultAvatar}
              src={scheduleInfo?.tutorInfo?.avatar}
              style={styles.avatar}
            />
            <Text className="text-xl text-black font-semibold mx-1">
              {data?.scheduleDetailInfo?.scheduleInfo?.tutorInfo?.name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: colors.black,
                marginVertical: 4,
              }}>
              {t('history.lessonTime')}
            </Text>
            <Text
              style={{fontSize: 16, fontWeight: '500', color: colors.black}}>
              {new Date(scheduleDetailInfo.startPeriodTimestamp).toDateString()}
              ,{' '}
              {renderStartAndEndHourOnLearning(
                scheduleDetailInfo.startPeriodTimestamp,
                scheduleDetailInfo.endPeriodTimestamp,
              )}
            </Text>
          </View>
          <View
            style={{
              marginVertical: 16,
              height: 1,
              backgroundColor: colors.grey350,
            }}
          />

          {isOpenModal === 'report' ? (
            <View style={styles.modalBody}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '500',
                  marginBottom: 8,
                  color: colors.black,
                }}>
                <Text
                  style={{
                    color: colors.error,
                    fontWeight: '600',
                  }}>
                  *
                </Text>
                {t('history.reason')}
              </Text>

              <DropdownMenu
                isOpen={isOpenMenu}
                onChangeOpen={setIsOpenMenu}
                data={reasons}
                selectedItem={{
                  key: reasons.find(
                    (item: any) => item.id === currentReport.reasonId,
                  )?.key,
                }}
                onChangeSelected={onChangeSelected}>
                <Pressable onPress={() => setIsOpenMenu(!isOpenMenu)}>
                  <View
                    style={[
                      styles.dropdownBtn,
                      isOpenMenu && {borderColor: colors.primary},
                    ]}>
                    <Text
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        color: colors.text,
                      }}>
                      {
                        reasons.find(
                          (item: any) => item.id === currentReport.reasonId,
                        )?.title
                      }
                    </Text>
                    {isOpenMenu ? (
                      <Entypo
                        name="chevron-small-down"
                        size={20}
                        color={colors.grey300}
                      />
                    ) : (
                      <Entypo
                        name="chevron-small-right"
                        size={20}
                        color={colors.grey300}
                      />
                    )}
                  </View>
                </Pressable>
              </DropdownMenu>
              <TextInput
                multiline={true}
                numberOfLines={8}
                textAlignVertical="top"
                placeholder={t('history.additionalNote')}
                onBlur={() => {}}
                value={currentReport.note}
                onChangeText={t =>
                  setCurrentReport((prev: any) => ({...prev, note: t}))
                }
                style={{
                  textAlign: 'left',
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderColor: colors.grey350,
                  borderWidth: 1,
                  borderRadius: 6,
                  marginTop: 16,
                  zIndex: -1,
                  fontSize: 15,
                }}
              />

              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'flex-end',
                  marginTop: 16,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setIsOpenModal(null);
                    setCurrentReport({
                      note: '',
                      bookingId: '',
                      reasonId: -1,
                    });
                  }}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 5,
                    paddingHorizontal: 12,
                    zIndex: -1,
                  }}>
                  <Text style={{fontSize: 14, color: colors.text}}>
                    {t('later')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleReport();
                    setIsOpenModal(null);
                  }}
                  style={{
                    backgroundColor: colors.primary,
                    paddingVertical: 5,
                    paddingHorizontal: 12,
                    borderRadius: 4,
                    marginLeft: 16,
                    zIndex: -1,
                  }}>
                  <Text style={{color: colors.white}}>{t('submit')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.modalBody}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '500',
                  marginBottom: 8,
                  textAlign: 'center',
                  color: colors.black,
                }}>
                <Text
                  style={{
                    color: colors.error,
                    fontWeight: '600',
                  }}>
                  *
                </Text>
                {t('history.ratingQuestion')} {scheduleInfo.tutorInfo.name}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginVertical: 4,
                }}>
                <RenderRating
                  size={28}
                  rating={currentRating.rating}
                  interactive={true}
                  onChangeRating={onChangeRating}
                />
              </View>
              <TextInput
                multiline={true}
                numberOfLines={8}
                textAlignVertical="top"
                placeholder={t('history.contentReview')}
                placeholderTextColor={colors.grey500}
                onBlur={() => {}}
                style={{
                  textAlign: 'left',
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderColor: colors.grey350,
                  borderWidth: 1,
                  borderRadius: 6,
                  marginTop: 16,
                  zIndex: -1,
                  fontSize: 15,
                  color: 'black',
                }}
                value={currentRating.content}
                onChangeText={t =>
                  setCurrentRating((prev: any) => ({...prev, content: t}))
                }
              />

              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'flex-end',
                  marginTop: 16,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setIsOpenModal(null);
                  }}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 5,
                    paddingHorizontal: 12,
                    zIndex: -1,
                  }}>
                  <Text style={{fontSize: 14, color: colors.text}}>
                    {t('later')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (isOpenModal === 'rating') {
                      handleChangeFeedback();
                    } else if (isOpenModal === 'report') {
                    }
                    setIsOpenModal(null);
                  }}
                  style={{
                    backgroundColor: colors.primary,
                    paddingVertical: 5,
                    paddingHorizontal: 12,
                    borderRadius: 4,
                    marginLeft: 16,
                    zIndex: -1,
                  }}>
                  <Text style={{color: colors.white}}>{t('submit')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
      </ModalPopper>
    </Lesson>
  );
};

export default HistoryItem;
