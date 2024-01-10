import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {
  getCurrentWeek,
  getDayInEnglish,
  getEnglishNameOfMonth,
  padNumber,
} from '@/utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import CheckBox from '@react-native-community/checkbox';
import {colors} from '@/constants';

import * as scheduleService from '@/services/scheduleService';
import * as userService from '@/services/userService';
import * as bookingService from '@/services/bookingService';
import {useGlobalContext, useTranslations} from '@/hooks';
import Button from '@/components/Button';
import ModalPopper from '@/components/ModalPopper';

const timers = [
  '00:00 - 00:25',
  '00:30 - 00:55',
  '01:00 - 01:25',
  '01:30 - 01:55',
  '02:00 - 02:25',
  '02:30 - 02:55',
  '03:00 - 03:25',
  '03:30 - 03:55',
  '04:00 - 04:25',
  '04:30 - 04:55',
  '05:00 - 05:25',
  '05:30 - 05:55',
  '06:00 - 06:25',
  '06:30 - 06:55',
  '07:00 - 07:25',
  '07:30 - 07:55',
  '08:00 - 08:25',
  '08:30 - 08:55',
  '09:00 - 09:25',
  '09:30 - 09:55',
  '10:00 - 10:25',
  '10:30 - 10:55',
  '11:00 - 11:25',
  '11:30 - 11:55',
  '12:00 - 12:25',
  '12:30 - 12:55',
  '13:00 - 13:25',
  '13:30 - 13:55',
  '14:00 - 14:25',
  '14:30 - 14:55',
  '15:00 - 15:25',
  '15:30 - 15:55',
  '16:00 - 16:25',
  '16:30 - 16:55',
  '17:00 - 17:25',
  '17:30 - 17:55',
  '18:00 - 18:25',
  '18:30 - 18:55',
  '19:00 - 19:25',
  '19:30 - 19:55',
  '20:00 - 20:25',
  '20:30 - 20:55',
  '21:00 - 21:25',
  '21:30 - 21:55',
  '22:00 - 22:25',
  '22:30 - 22:55',
  '23:00 - 23:25',
  '23:30 - 23:55',
];

type Props = {
  tutorId: string;
};

const BookingTable = (props: Props) => {
  const {tutorId} = props;
  const [state, dispatch] = useGlobalContext();
  const {t} = useTranslations();

  const [schedules, setSchedules] = useState<{distance: number; data: Date[]}>(
    () => {
      return {
        distance: 0,
        data: getCurrentWeek(),
      };
    },
  );
  const [bookings, setBookings]: any = useState();
  const [isOpenBookingModal, setIsOpenBookingModal] = useState(false);
  const [isOpenBookingResult, setIsOpenBookingResult] = useState(false);

  const [selectedBooking, setSelectedBooking] = useState<any>(undefined);
  const [walletInfo, setWalletInfo] = useState<any>({});
  const [notes, setNotes] = useState('');

  const renderTimerItem = (data: any) => {
    return (
      <View style={[[styles.cell, styles.firstCell]]}>
        <Text style={{fontWeight: '600', color: colors.black}}>
          {data.item}
        </Text>
      </View>
    );
  };

  const renderBookItem = ({item, index}: any) => {
    let ResultComponent: JSX.Element;
    if (item === undefined) {
      ResultComponent = <Text></Text>;
    } else if (item?.scheduleDetails[0].bookingInfo.length > 0) {
      const isSelfBooking = item?.scheduleDetails[0].bookingInfo?.find(
        (booking: any) => booking?.userId === state.currentUser.id,
      );

      //MY BOOK
      if (!!isSelfBooking) {
        ResultComponent = (
          <Text style={{color: colors.success}}>{t('booked')}</Text>
        );
      } else {
        //OTHER BOOKINGS
        ResultComponent = <Text style={{color: colors.grey600}}>Reserved</Text>;
      }
    } else {
      //AVAILABLE
      if (item?.startTimestamp - (Date.now() + 2 * 60 * 60 * 1000) < 0) {
        ResultComponent = (
          <Button
            style={{
              borderWidth: 1,
              borderColor: colors.grey600,
              backgroundColor: colors.white,
              color: colors.grey600,
              paddingVertical: 2,
              paddingHorizontal: 12,
              borderRadius: 99,
            }}
            title={t('book')}
          />
        );
      } else {
        ResultComponent = (
          <Button
            style={{
              backgroundColor: '#009dff',
              color: colors.white,
              paddingVertical: 2,
              paddingHorizontal: 12,
              borderRadius: 99,
            }}
            title={t('book')}
            onPress={() => {
              setSelectedBooking(item);
              setIsOpenBookingModal(true);
            }}
          />
        );
      }
    }

    return (
      <View key={index} style={[[styles.cell]]}>
        {ResultComponent}
      </View>
    );
  };

  const extractBookings = (data: any[]) => {
    const result: any[] = [];
    for (let i = 0; i < schedules.data.length; i++) {
      let schedulesInDay: any[] = [];

      const schedule = schedules.data[i];

      timers.forEach(time => {
        const times = time.split(' - ');
        let _booking = data.find((item: any) => {
          const startLessonDate = new Date(item?.startTimestamp);
          return (
            Number(times[0].split(':')[0]) === startLessonDate.getHours() &&
            Number(times[0].split(':')[1]) === startLessonDate.getMinutes() &&
            startLessonDate.getDate() === schedule.getDate() &&
            startLessonDate.getMonth() === schedule.getMonth()
          );
        });

        schedulesInDay.push(_booking);
      });
      result.push(schedulesInDay);
    }
    return result;
  };

  const handleBooking = async () => {
    const res = await bookingService.placeBooking({
      note: notes,
      scheduleDetailIds: [selectedBooking.scheduleDetails[0].id],
    });

    if (res.success) {
      setIsOpenBookingResult(true);
    }
  };

  useEffect(() => {
    const getBookings = async () => {
      const res = await scheduleService.getSchedules({
        params: {
          page: 0,
          tutorId,
        },
      });

      if (res.success) {
        const {scheduleOfTutor} = res.data;
        const _bookings = extractBookings(scheduleOfTutor);
        setBookings(_bookings);
      }
    };

    getBookings();
  }, [isOpenBookingResult, tutorId]);

  useEffect(() => {
    const getWalletOfUser = async () => {
      const res = await userService.getUserInfo();
      if (res.success) {
        const {user} = res.data;
        setWalletInfo(user.walletInfo);
      }
    };

    getWalletOfUser();
  }, [isOpenBookingResult]);

  return (
    <View style={{paddingHorizontal: 10}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 15,
        }}>
        <Button
          style={{
            backgroundColor: '#009dff',
            padding: 8,
            color: colors.white,
            fontWeight: '500',
            borderRadius: 6,
          }}
          title={t('tutorDetail.today')}
          onPress={() => {
            setSchedules({
              distance: 0,
              data: getCurrentWeek(),
            });
          }}
        />
        <TouchableHighlight
          style={[styles.actionBtn, {marginLeft: 12}]}
          activeOpacity={0.7}
          underlayColor="rgba(0,0,0,0.3)"
          disabled={schedules.distance === 0}
          onPress={() => {
            setSchedules(prev => {
              const newDistance = prev.distance - 7;
              return {
                distance: newDistance,
                data: getCurrentWeek(newDistance),
              };
            });
          }}>
          <Entypo name="chevron-small-left" size={24} color="black" />
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.actionBtn, {marginHorizontal: 12}]}
          activeOpacity={0.7}
          underlayColor="rgba(0,0,0,0.3)"
          onPress={() => {
            setSchedules(prev => {
              const newDistance = prev.distance + 7;
              return {
                distance: newDistance,
                data: getCurrentWeek(newDistance),
              };
            });
          }}>
          <Entypo name="chevron-small-right" size={24} color="black" />
        </TouchableHighlight>
        <Text style={{fontSize: 16, color: colors.text, fontWeight: '500'}}>
          {getEnglishNameOfMonth(new Date(schedules.data[0]).getMonth() + 1)}
          {new Date(schedules.data[0]).getMonth() !==
            new Date(schedules.data[6]).getMonth() &&
            ` - ${getEnglishNameOfMonth(
              new Date(schedules.data[6]).getMonth() + 1,
            )}`}
          {', '}
          {new Date(schedules.data[6]).getFullYear()}
        </Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.table}>
          <View style={styles.header}>
            <View
              style={[
                styles.cell,
                styles.firstCell,
                {
                  backgroundColor: 'rgb(0, 157, 255)',
                },
              ]}
            />

            {[...schedules.data].map((item: Date, index) => {
              return (
                <View
                  key={index}
                  style={[
                    styles.cell,
                    {
                      backgroundColor: 'rgb(0, 157, 255)',
                    },
                  ]}>
                  <Text
                    style={{
                      color: colors.white,
                      fontWeight: '500',
                      textAlign: 'center',
                    }}>
                    {item.getDate()} / {item.getMonth() + 1} {'\n'}
                    {getDayInEnglish(item.getDay())}
                  </Text>
                </View>
              );
            })}
          </View>
          <View style={{flexDirection: 'row'}}>
            <FlatList data={timers} renderItem={renderTimerItem} />
            {schedules.data.map((_item, index) => {
              return (
                <FlatList
                  key={index}
                  data={bookings?.[index]}
                  renderItem={renderBookItem}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
      <ModalPopper visible={isOpenBookingModal} transparent={true}>
        <View style={{width: '100%'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'center',
            }}>
            <Text
              style={{color: colors.black, fontSize: 16, fontWeight: '600'}}>
              Booking Details
            </Text>
            <TouchableOpacity
              onPress={() => {
                setIsOpenBookingModal(false);
              }}>
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
          {isOpenBookingResult ? (
            <View style={[styles.modalBody]}>
              <View
                style={{
                  alignItems: 'center',
                  paddingBottom: 50,
                  paddingTop: 20,
                }}>
                <AntDesign
                  name="check"
                  size={32}
                  color={colors.white}
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: colors.success,
                    textAlign: 'center',
                    lineHeight: 50,
                    borderRadius: 999,
                  }}
                />
                <Text className="font-bold text-xl text-black mx-5">
                  Booking success
                </Text>
                <Text className="text-gray-400 text-base">
                  Check your mail's inbox to see detail order
                </Text>
              </View>
              <View
                style={{
                  marginVertical: 16,
                  height: 1,
                  backgroundColor: colors.grey300,
                }}
              />
              <Button
                title="Done"
                onPress={() => {
                  setIsOpenBookingModal(false);
                  setIsOpenBookingResult(false);
                }}
                style={{
                  borderColor: colors.primary,
                  color: colors.primary,
                  paddingHorizontal: 28,
                  alignSelf: 'flex-end',
                }}
              />
            </View>
          ) : (
            <View style={styles.modalBody}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: colors.grey200,
                  borderRadius: 6,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: colors.black,
                    backgroundColor: colors.grey200,
                    padding: 8,
                  }}>
                  Booking Time
                </Text>
                <Text
                  style={{
                    margin: 8,
                    backgroundColor: 'rgb(238, 234, 255)',
                    color: 'rgb(119, 102, 199)',
                    padding: 8,
                    fontSize: 15,
                    fontWeight: '500',
                    borderRadius: 6,
                    textAlign: 'center',
                  }}>
                  {padNumber(
                    new Date(selectedBooking?.startTimestamp).getHours(),
                  )}
                  :
                  {padNumber(
                    new Date(selectedBooking?.startTimestamp).getMinutes(),
                  )}{' '}
                  -
                  {padNumber(
                    new Date(selectedBooking?.endTimestamp).getHours(),
                  )}
                  :
                  {padNumber(
                    new Date(selectedBooking?.endTimestamp).getMinutes(),
                  )}
                  {', '}
                  {new Date(selectedBooking?.startTimestamp).toDateString()}
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: colors.grey200,
                  borderRadius: 6,
                  marginTop: 8,
                  backgroundColor: colors.grey100,
                  padding: 8,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 8,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: colors.black,
                    }}>
                    Balance
                  </Text>
                  <Text
                    style={{
                      color: 'rgb(119, 102, 199)',
                      fontSize: 14,
                    }}>
                    You have {walletInfo.amount / 100000} class left
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: colors.black,
                    }}>
                    Price
                  </Text>
                  <Text
                    style={{
                      color: 'rgb(119, 102, 199)',
                      fontSize: 14,
                    }}>
                    1 class
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: 16,
                  borderWidth: 1,
                  borderRadius: 6,
                  borderColor: colors.grey300,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: colors.black,
                    backgroundColor: colors.grey200,
                    padding: 8,
                  }}>
                  Notes
                </Text>
                <TextInput
                  onChangeText={text => setNotes(text)}
                  multiline={true}
                  numberOfLines={8}
                  textAlignVertical="top"
                  placeholder="Please let us know details about your problem"
                  placeholderTextColor={colors.grey500}
                  style={{
                    color: colors.black,
                    textAlign: 'left',
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 6,
                    marginTop: 8,
                    fontSize: 14,
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'flex-end',
                  marginTop: 16,
                }}>
                <Button
                  title="Cancel"
                  onPress={() => {
                    setIsOpenBookingModal(false);
                  }}
                  style={{
                    borderColor: colors.primary,
                    color: colors.primary,
                  }}
                />
                <Button
                  title="Book"
                  onPress={() => {
                    handleBooking();
                  }}
                  leftIcon={
                    <Feather
                      name="chevrons-right"
                      size={20}
                      color={colors.white}
                    />
                  }
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.white,
                    marginLeft: 16,
                  }}
                />
              </View>
            </View>
          )}
        </View>
      </ModalPopper>
    </View>
  );
};

export default BookingTable;
