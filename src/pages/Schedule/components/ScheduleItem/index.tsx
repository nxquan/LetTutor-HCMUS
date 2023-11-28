import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import {images} from '@/assets';
import {colors} from '@/constants';
import ModalPopper from '@/components/ModalPopper';
import Lesson from '@/components/Lesson';
import DropdownMenu from '@/components/DropdownMenu';
import {useGlobalContext} from '@/hooks';
import {editStudentRequest} from '@/store';
const reasons = [
  {id: 1, title: 'Reschedule at another time', key: 'reschedule'},
  {id: 2, title: 'Busy at that time', key: 'busy'},
  {id: 3, title: 'Asked by the tutor', key: 'asked'},
  {id: 4, title: 'Other', key: 'other'},
];

type Props = {
  data: any;
};
const ScheduleItem = (props: Props) => {
  const {data} = props;
  const {scheduleDetailInfo} = data;

  const [state, dispatch] = useGlobalContext();
  const [isOpenRequest, setIsOpenRequest] = useState(true);
  const [isOpenCancelModal, setIsOpenCancelModal] = useState(false);
  const [isOpenRequestModal, setIsOpenRequestModal] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [studentRequest, setStudentRequest] = useState('');

  const [reason, setReason] = useState({
    type: 'Choose a reason',
    notes: '',
  });
  const toggleOpenRequest = () => {
    setIsOpenRequest(!isOpenRequest);
  };

  const onChangeSelectedItem = (item: any) => {
    setReason((prev: any) => {
      return {
        ...prev,
        type: item,
      };
    });
  };

  const isAllowedToJoinMeeting = () => {
    const diff =
      Date.now() -
      (scheduleDetailInfo.startPeriodTimestamp - 7 * 60 * 60 * 1000);
    if (diff >= 0 && diff <= 25 * 60 * 1000) {
      return true;
    }
    return false;
  };

  const handleSubmitRequestStudent = () => {
    if (studentRequest.length > 0) {
      const payload = {
        studentRequest,
        id: data.id,
      };
      dispatch(editStudentRequest(payload));
    }
    setIsOpenRequestModal(false);
  };

  return (
    <Lesson data={data}>
      <View style={styles.requestContainer}>
        <View style={styles.requestHeader}>
          <Text className="text-base font-medium text-black">
            {scheduleDetailInfo.startPeriod} - {scheduleDetailInfo.endPeriod}
          </Text>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => setIsOpenCancelModal(true)}>
            <MaterialIcons
              name="cancel-presentation"
              size={18}
              color={colors.error}
            />
            <Text style={{marginLeft: 4, color: colors.error}}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.requestTime}>
          <TouchableOpacity
            onPress={() => toggleOpenRequest()}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Entypo name="chevron-small-right" size={24} color="black" />
            {/* <Entypo name='chevron-small-down' size={24} color='black' /> */}
            <Text style={{fontSize: 14}}>Request for lesson</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsOpenRequestModal(!isOpenRequestModal)}>
            <Text style={styles.requestBtn}>Edit Request</Text>
          </TouchableOpacity>
        </View>
        {isOpenRequest && (
          <View style={{paddingHorizontal: 12, marginTop: 8}}>
            <Text style={styles.requestText}>
              {data.studentRequest !== null
                ? data.studentRequest
                : 'Currently there are no requests for this class. Please write down any requests for the teacher.'}
            </Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        disabled={!isAllowedToJoinMeeting()}
        style={[
          styles.goMeetingBtn,
          !isAllowedToJoinMeeting() && {
            borderColor: colors.grey350,
          },
        ]}
        onPress={() => {
          if (isAllowedToJoinMeeting()) {
            console.log('GO MEETING');
          } else {
            console.log('CAN NOT ENTER');
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
              Kebby
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
              Thu, 26 Oct 23
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
              onChangeSelected={onChangeSelectedItem}
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
                onPress={() => setIsOpenCancelModal(false)}
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
