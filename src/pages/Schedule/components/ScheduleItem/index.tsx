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
import {useColorScheme} from 'nativewind';

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
  const {colorScheme} = useColorScheme();
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
          <ScheduleInfo
            key={item.id}
            data={item}
            orderSession={index + 1}
            onOpenCancelModal={setIsOpenCancelModal}
            onOpenRequestModal={setIsOpenRequestModal}
            onChangeSelectedItem={onChangeSelectedItem}
          />
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
        <Text className="text-lg font-normal mb-2 text-black dark:text-white">
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
        <View className="bg-white dark:bg-black">
          <TouchableOpacity
            style={{alignSelf: 'flex-end', padding: 8}}
            onPress={() => setIsOpenCancelModal(false)}>
            <AntDesign
              name="close"
              size={20}
              color={colorScheme == 'light' ? 'black' : 'white'}
            />
          </TouchableOpacity>
          <View style={styles.modalInfo}>
            <Image source={images.becomeTutor2} style={styles.avatar} />
            <Text className="text-lg text-medium mx-0.5 text-black dark:text-white">
              {selectedItem?.scheduleDetailInfo?.scheduleInfo?.tutorInfo?.name}
            </Text>
            <Text className="text-sm mx-0.5 text-black dark:text-white">
              Lesson time
            </Text>
            <Text className="text-base text-medium text-black dark:text-white">
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
            <Text className="text-sm text-medium mb-2 text-black dark:text-white">
              <Text
                style={{
                  color: colors.error,
                  fontWeight: '600',
                }}>
                *{' '}
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
                  <Text className="text-sm flex-1 text-center text-text dark:text-white">
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
              className="text-black dark:text-white text-left py-2 px-1 border rounded-md mt-4"
              style={{
                borderColor: colors.grey350,
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
                <Text className="text-sm text-text dark:text-white">Later</Text>
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
            <Text className="text-black dark:text-white text-base font-medium">
              Special Request
            </Text>
            <TouchableOpacity onPress={() => setIsOpenRequestModal(false)}>
              <AntDesign
                name="close"
                size={24}
                color={colorScheme == 'light' ? 'black' : 'white'}
              />
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
              className="text-black dark:text-white text-medium mb-2"
              style={{
                fontSize: 15,
              }}>
              <Text
                style={{
                  color: colors.error,
                  fontWeight: '600',
                }}>
                *{' '}
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
              className="text-black dark:text-white text-left p-2 border rounded-md mt-4"
              style={{
                borderColor: colors.grey350,
                zIndex: -1,
                fontSize: 15,
              }}
            />
            <Text className="text-text dark:text-white mt-1.5 text-xs">
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
                <Text className="text-sm text-text dark:text-white">
                  Cancel
                </Text>
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
