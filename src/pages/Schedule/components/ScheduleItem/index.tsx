import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import styles from './styles';
import {images} from '@/assets';
import {colors} from '@/constants';
import ModalPopper from '@/components/ModalPopper';
import Lesson from '@/components/Lesson';
import DropdownMenu from '@/components/DropdownMenu';
import {useTranslations} from '@/hooks';
import {Toast} from 'toastify-react-native';
import * as bookingService from '@/services/bookingService';
import {renderStartAndEndHourOnLearning} from '@/utils';
import ScheduleInfo from '../ScheduleInfo';
import {useNavigation} from '@react-navigation/native';
import StackProps from '@/types/type';

const reasons = [
  {id: 1, title: 'Reschedule at another time', key: 'reschedule'},
  {id: 2, title: 'Busy at that time', key: 'busy'},
  {id: 3, title: 'Asked by the tutor', key: 'asked'},
  {id: 4, title: 'Other', key: 'other1'},
];
type Props = {
  data: any | any[];
  isSingle?: boolean;
  onChangeRefresh: () => void;
};
const ScheduleItem = (props: Props) => {
  const {data, isSingle, onChangeRefresh} = props;
  const {t} = useTranslations();
  const navigation = useNavigation<StackProps>();
  const [isOpenCancelModal, setIsOpenCancelModal] = useState(false);
  const [isOpenRequestModal, setIsOpenRequestModal] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [studentRequest, setStudentRequest] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(undefined);
  const [isReadyMeeting, setIsReadyMeeting] = useState(false);
  const [reason, setReason] = useState({
    type: 'Choose a reason',
    notes: '',
  });

  const onChangeReason = (item: any) => {
    setReason((prev: any) => {
      return {
        ...prev,
        type: item.title,
      };
    });
  };

  const onChangeSelectedItem = (data: any) => {
    setSelectedItem(data);
    setStudentRequest(data?.studentRequest);
  };

  const isAllowedToJoinMeeting = () => {
    if (isSingle) {
      const diff = Date.now() - data.scheduleDetailInfo.startPeriodTimestamp;
      if (diff >= 0 && diff <= 25 * 60 * 1000) {
        return true;
      }
    } else {
      const diff = Date.now() - data[0].scheduleDetailInfo.startPeriodTimestamp;
      if (diff >= 0 && diff <= 25 * 60 * 1000) {
        return true;
      }
    }
    return false;
  };

  const handleSubmitRequestStudent = async () => {
    if (studentRequest.length > 0 && selectedItem) {
      const res = await bookingService.editRequest(selectedItem.id, {
        studentRequest,
      });
      if (res.success) {
        onChangeRefresh();
      }
    }

    setIsOpenRequestModal(false);
  };

  const handleCancelBooking = async () => {
    const isEligible =
      selectedItem.scheduleDetailInfo.startPeriodTimestamp - Date.now() >=
      2 * 60 * 60 * 1000;
    if (isEligible) {
      const res = await bookingService.cancelBooking({
        data: {
          scheduleDetailId: selectedItem.id,
          cancelInfo: {
            cancelReasonId: reasons.find(
              (item: any) => item.title == reason.type,
            )?.id,
            note: reason.notes,
          },
        },
      });
      setIsOpenCancelModal(false);
      onChangeRefresh();
    } else {
      Toast.success('Chỉ hủy được 2 tiếng trước khi học');
    }
  };

  const renderSession = () => {
    if (isSingle) {
      return (
        <ScheduleInfo
          data={data}
          onOpenCancelModal={setIsOpenCancelModal}
          onOpenRequestModal={setIsOpenRequestModal}
          onChangeSelectedItem={onChangeSelectedItem}
        />
      );
    } else {
      return data.map((item: any, index: number) => {
        return (
          <>
            <ScheduleInfo
              key={item.id}
              data={item}
              orderSession={index + 1}
              onOpenCancelModal={setIsOpenCancelModal}
              onOpenRequestModal={setIsOpenRequestModal}
              onChangeSelectedItem={onChangeSelectedItem}
            />
          </>
        );
      });
    }
  };

  useEffect(() => {
    const isReadyForMeeting = isAllowedToJoinMeeting();
    setIsReadyMeeting(isReadyForMeeting);
  }, [data]);

  return (
    <Lesson
      data={isSingle ? data : data[0]}
      numberOfLesson={isSingle ? 1 : data.length}>
      {!isSingle && (
        <Text className="text-lg font-normal mb-2 text-black">
          Lesson time:{' '}
          {renderStartAndEndHourOnLearning(
            data[0].scheduleDetailInfo.startPeriodTimestamp,
            data[data.length - 1].scheduleDetailInfo.endPeriodTimestamp,
          )}
        </Text>
      )}
      {renderSession()}
      <TouchableOpacity
        disabled={!isReadyMeeting}
        style={[
          styles.goMeetingBtn,
          !isReadyMeeting && {
            borderColor: colors.grey350,
          },
        ]}
        onPress={() => {
          if (isReadyMeeting) {
            navigation.navigate('VideoCall', {
              data: data?.length > 1 ? data[0] : data,
            });
          }
        }}>
        <Text
          style={[
            {color: colors.primary},
            !isAllowedToJoinMeeting() && {
              color: colors.grey400,
            },
          ]}>
          Go to meeting
        </Text>
      </TouchableOpacity>

      <ModalPopper visible={isOpenCancelModal} transparent={true}>
        <View>
          <TouchableOpacity
            style={{alignSelf: 'flex-end', padding: 8}}
            onPress={() => setIsOpenCancelModal(false)}>
            <AntDesign name="close" size={20} color="black" />
          </TouchableOpacity>
          <View style={styles.modalInfo}>
            <Image source={images.becomeTutor2} style={styles.avatar} />
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                marginVertical: 2,
                color: colors.black,
              }}>
              {selectedItem?.scheduleDetailInfo?.scheduleInfo?.tutorInfo?.name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: colors.black,
                marginVertical: 2,
              }}>
              Lesson time
            </Text>
            <Text
              style={{fontSize: 16, fontWeight: '500', color: colors.black}}>
              {new Date(
                selectedItem?.scheduleDetailInfo?.startPeriodTimestamp,
              ).toDateString()}
            </Text>
          </View>
          <View
            style={{
              marginVertical: 16,
              height: 1,
              backgroundColor: colors.grey300,
            }}
          />
          <View style={styles.modalBody}>
            <Text
              style={{
                color: colors.black,
                fontSize: 15,
                fontWeight: '500',
                marginBottom: 8,
              }}>
              <Text
                style={{
                  color: colors.error,
                  fontWeight: '600',
                }}>
                *
              </Text>
              What was the reason you cancel this booking?
            </Text>

            <DropdownMenu
              isOpen={isOpenMenu}
              onChangeOpen={setIsOpenMenu}
              onChangeSelected={onChangeReason}
              data={reasons}
              selectedItem={reason.type}>
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
                    {reason.type}
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
              placeholder="Additional notes"
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
              value={reason.notes}
              onChangeText={text => setReason(prev => ({...prev, notes: text}))}
            />

            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-end',
                marginTop: 16,
              }}>
              <TouchableOpacity
                onPress={() => setIsOpenCancelModal(false)}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 5,
                  paddingHorizontal: 12,
                  zIndex: -1,
                }}>
                <Text style={{fontSize: 14, color: colors.text}}>Later</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleCancelBooking()}
                style={{
                  backgroundColor: colors.primary,
                  paddingVertical: 5,
                  paddingHorizontal: 12,
                  borderRadius: 4,
                  marginLeft: 16,
                  zIndex: -1,
                }}>
                <Text style={{color: colors.white}}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ModalPopper>

      <ModalPopper visible={isOpenRequestModal} transparent={true}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'center',
            }}>
            <Text
              style={{color: colors.black, fontSize: 16, fontWeight: '500'}}>
              Special Request
            </Text>
            <TouchableOpacity onPress={() => setIsOpenRequestModal(false)}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginVertical: 16,
              height: 1,
              backgroundColor: colors.grey300,
            }}
          />

          <View style={styles.modalBody}>
            <Text
              style={{
                color: colors.black,
                fontSize: 15,
                fontWeight: '500',
                marginBottom: 8,
              }}>
              <Text
                style={{
                  color: colors.error,
                  fontWeight: '600',
                }}>
                *
              </Text>
              Notes
            </Text>
            <TextInput
              onChangeText={t => setStudentRequest(t)}
              multiline={true}
              numberOfLines={12}
              textAlignVertical="top"
              placeholder="Additional notes"
              placeholderTextColor={colors.grey600}
              value={studentRequest}
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
                color: colors.black,
              }}
            />
            <Text style={{fontSize: 12, color: colors.text, marginTop: 6}}>
              You can write in English or Vietnamese (Maximum 200 letters)
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-end',
                marginTop: 16,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setStudentRequest('');
                  setIsOpenRequestModal(false);
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 5,
                  paddingHorizontal: 12,
                  zIndex: -1,
                }}>
                <Text style={{fontSize: 14, color: colors.text}}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSubmitRequestStudent()}
                style={{
                  backgroundColor: colors.primary,
                  paddingVertical: 5,
                  paddingHorizontal: 12,
                  borderRadius: 4,
                  marginLeft: 16,
                  zIndex: -1,
                }}>
                <Text style={{color: colors.white}}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ModalPopper>
    </Lesson>
  );
};

export default ScheduleItem;
