import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Lesson from '@/components/Lesson';
import styles from './styles';
import ModalPopper from '@/components/ModalPopper';
import {colors} from '@/constants';
import {images} from '@/assets';
import DropdownMenu from '@/components/DropdownMenu';
import {useTranslations} from '@/hooks';

const reasons = [
  {
    id: 1,
    title: 'Tutor was late',
    key: 'wasLate',
  },
  {
    id: 2,
    title: 'Tutor was absent',
    key: 'wasAbsent',
  },
  {
    id: 3,
    title: 'Network unstable',
    key: 'networkUnstable',
  },
  {
    id: 4,
    title: 'Other',
    key: 'other',
  },
];

type Props = {
  data: any;
};
const HistoryItem = (props: Props) => {
  const {data} = props;
  const {scheduleDetailInfo} = data;
  const {scheduleInfo} = scheduleDetailInfo;
  const {t} = useTranslations();

  const [isOpenRequest, setIsOpenRequest] = useState(true);
  const [isOpenReview, setIsOpenReview] = useState(true);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState<null | string>(null);

  const [reason, setReason] = useState({
    type: 'Choose a reason',
    notes: '',
  });

  const onChangeSelected = (item: any) => {
    setReason((prev: any) => {
      return {
        ...prev,
        type: item.key,
      };
    });
  };

  return (
    <Lesson data={data}>
      <View style={styles.requestHeader}>
        <Text style={styles.timeText}>
          {t('history.lessonTime')} 01:00 - 01:25
        </Text>
      </View>
      <View style={styles.lessonComment}>
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
            <Text style={styles.commentText}>{t('schedule.request')}</Text>
          </View>
        )}
      </View>
      <View style={styles.lessonComment}>
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
            <Text style={styles.commentText}>{t('history.review')}</Text>
          </View>
        )}
      </View>

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

      <ModalPopper visible={!!isOpenModal} transparent={true}>
        <>
          <TouchableOpacity
            style={{alignSelf: 'flex-end', padding: 8}}
            onPress={() => setIsOpenModal(null)}>
            <AntDesign name="close" size={20} color="black" />
          </TouchableOpacity>
          <View style={styles.modalInfo}>
            <Image
              source={{uri: scheduleInfo.tutorInfo.avatar}}
              style={styles.avatar}
            />
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
              Thu, 26 Oct 23
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
                selectedItem={{key: reason.type}}
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
                      {t(reason.type)}
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
                <AntDesign name="star" size={20} color={colors.yellow} />
                <AntDesign
                  name="star"
                  size={20}
                  color={colors.yellow}
                  style={{marginHorizontal: 4}}
                />
                <AntDesign
                  name="star"
                  size={20}
                  color={colors.yellow}
                  style={{marginHorizontal: 4}}
                />
                <AntDesign
                  name="star"
                  size={20}
                  color={colors.yellow}
                  style={{marginHorizontal: 4}}
                />
                <AntDesign name="staro" size={20} color={colors.yellow} />
              </View>
              <TextInput
                multiline={true}
                numberOfLines={8}
                textAlignVertical="top"
                placeholder={t('history.contentReview')}
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
                  fontSize: 14,
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
