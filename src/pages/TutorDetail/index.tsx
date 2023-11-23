import {
  View,
  Text,
  ScrollView,
  Image,
  StatusBar,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  TextInput,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import CheckBox from '@react-native-community/checkbox';
import {useRoute} from '@react-navigation/native';

import styles from './styles';
import Header from '@/components/Header';
import {images} from '@/assets';
import {colors} from '@/constants';
import InfoPart from './components/InfoPart';
import ButtonItem from '@/components/Button';
import BookButton from './components/BookBtn';
import DrawerButton from '@/components/DrawerButton';
import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import RenderRating from '@/components/RenderRating';
import CustomVideo from '@/components/CustomVideo';
import ModalPopper from '@/components/ModalPopper';

import {useGlobalContext} from '@/hooks';
import {LEARN_TOPICS, TEST_PREPARATIONS} from '@/store/mock-data';
import {toggleFavoriteTutor} from '@/store';

import {
  getCountryNameFromCode,
  getEnglishNameOfMonth,
  getDayInEnglish,
  getCurrentWeek,
} from '@/utils';

import ReviewList from '@/components/ReviewList';
import index from '../Schedule/components/ScheduleItem';

const timers = [
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

const REPORTS = [
  'This tutor is annoying me',
  'This profile is pretending be someone or is fake',
  'Inappropriate profile photo',
];

const SPECIALTIES = [...LEARN_TOPICS, ...TEST_PREPARATIONS];
type DetailTutor = {
  experience: string;
  video: string;
  bio: string;
  languages: any;
  education: string;
  interests: string;
  totalFeedback: number;
  rating: number;
  specialties: string;
  User: any;
};

const TutorDetail = () => {
  // const route: any = useRoute();
  const [state, dispatch] = useGlobalContext();
  const [tutorDetail, setTutorDetail] = useState<DetailTutor>({
    rating: 0,
    languages: '',
    education: '',
    experience: '',
    interests: '',
    totalFeedback: 0,
    specialties: '',
    video: '',
    bio: '',
    User: {},
  });

  const [isOpenReport, setIsOpenReport] = useState(false);
  const [isOpenBookingModal, setIsOpenBookingModal] = useState(false);
  const [reports, setReports] = useState<number[]>([]);

  const [feedbacks, setFeedbacks] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [schedules, setSchedules] = useState<{distance: number; data: Date[]}>(
    () => {
      return {
        distance: 0,
        data: getCurrentWeek(),
      };
    },
  );
  const [bookings, setBookings]: any = useState();

  const extractBookings = (tutorId: string) => {
    const result = [];
    for (let i = 0; i < schedules.data.length; i++) {
      let bookingsInDate: any[] = [];

      timers.forEach(time => {
        const times = time.split(' - ');
        const schedule = new Date(schedules.data[i]);

        let _booking = state.schedules.find((item: any) => {
          const startDate = new Date(item?.startTimestamp);
          return (
            item?.tutorId === tutorId &&
            item?.startTime === times[0] &&
            item?.endTime === times[1] &&
            startDate.getDate() === schedule.getDate() &&
            startDate.getMonth() === schedule.getMonth()
          );
        });

        bookingsInDate.push(_booking);
      });
      result.push(bookingsInDate);
    }
    return result;
  };

  useEffect(() => {
    const tutorId = 'f23c4d9f-6043-4cb8-a038-9538a609f5ca'; //route.params?.tutorId ;
    const detailItem = state.tutorDetails.find(
      (item: any) => item?.userId === tutorId,
    );

    const tutor = state.tutors.find((item: any) => item?.id === tutorId);
    detailItem.User = tutor;

    const _feedbacks = state.feedbacks.filter(
      (item: any) => item.secondId === tutorId,
    );
    const bookings = extractBookings(tutorId);
    setBookings(bookings);
    setTutorDetail(detailItem);
    setFeedbacks(_feedbacks);
  }, [state]);

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
    } else if (item?.isBooked) {
      const isSelfBooking = item?.scheduleDetails?.bookingInfo?.find(
        (item: any) => item?.userId === '123',
      );

      //MY BOOK
      if (!!isSelfBooking) {
        ResultComponent = <Text style={{color: colors.success}}>Booked</Text>;
      } else {
        //OTHER BOOKINGS
        ResultComponent = <Text style={{color: colors.grey600}}>Reserved</Text>;
      }
    } else {
      //AVAILABLE
      ResultComponent = (
        <Button
          style={{
            backgroundColor: '#009dff',
            color: colors.white,
            paddingVertical: 2,
            paddingHorizontal: 12,
            borderRadius: 99,
          }}
          title="Book"
          onPress={() => {
            setIsOpenBookingModal(true);
          }}
        />
      );
    }

    return (
      <View key={index} style={[[styles.cell]]}>
        {ResultComponent}
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={isFullscreen ? [] : [0]}>
      <Header drawerBtn={<DrawerButton />} backIcon={<BackButton />} />
      <View style={styles.inner}>
        <View style={styles.info}>
          <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
            <Image
              defaultSource={images.defaultAvatar}
              source={{
                uri:
                  tutorDetail.User?.avatar ||
                  'https://api.app.lettutor.com/avatar/54334d4d-fb16-417d-bf4c-28845f2c29e0avatar1666581400098.jpg',
              }}
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
                  source={{
                    uri: `https://flagsapi.com/${tutorDetail?.User?.country}/flat/64.png`,
                  }}
                  style={{width: 20, height: 15}}
                />
                <Text style={{fontSize: 14, color: colors.text, marginLeft: 6}}>
                  {getCountryNameFromCode(tutorDetail?.User?.country)}
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
                dispatch(
                  toggleFavoriteTutor({
                    tutorId: 'f23c4d9f-6043-4cb8-a038-9538a609f5ca',
                  }),
                ); //route.params?.tutorId
              }}
              style={{padding: 8}}
              activeOpacity={0.7}>
              <View style={{alignItems: 'center'}}>
                {!!tutorDetail?.User?.isFavoriteTutor ? (
                  <AntDesign name="heart" size={24} color={colors.error} />
                ) : (
                  <AntDesign name="hearto" size={24} color={colors.primary} />
                )}
                <Text
                  style={{
                    marginTop: 4,
                    color: !!tutorDetail?.User?.isFavoriteTutor
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

          <InfoPart title="Education">
            <Text style={{fontSize: 14, color: colors.text, marginLeft: 12}}>
              {tutorDetail?.education}
            </Text>
          </InfoPart>
          <InfoPart title="Languages">
            <View style={{flexDirection: 'row'}}>
              {renderItem(String(tutorDetail?.languages).split(', '))}
            </View>
          </InfoPart>
          <InfoPart title="Specialties">
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {renderItem(getSpecialtyNames(String(tutorDetail?.specialties)))}
            </View>
          </InfoPart>
          <InfoPart title="Interests">
            <Text style={{marginLeft: 10, fontSize: 14, color: colors.text}}>
              {tutorDetail?.interests}
            </Text>
          </InfoPart>
          <InfoPart title="Teaching Experience">
            <Text style={{marginLeft: 10, fontSize: 14, color: colors.text}}>
              {tutorDetail?.experience}
            </Text>
          </InfoPart>
          <InfoPart title="Others review">
            <ReviewList data={feedbacks} />
          </InfoPart>
        </View>

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
              title="Today"
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
              {getEnglishNameOfMonth(
                new Date(schedules.data[0]).getMonth() + 1,
              )}
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
                        {item?.getDate()} / {item?.getMonth() + 1} {'\n'}
                        {getDayInEnglish(item.getDay())}
                      </Text>
                    </View>
                  );
                })}
              </View>
              <View style={{flexDirection: 'row'}}>
                <FlatList data={timers} renderItem={renderTimerItem} />
                {/* <FlatList data={bookings?.[0]} renderItem={renderBookItem} /> */}

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
        </View>
      </View>

      <ModalPopper visible={isOpenReport} transparent={true}>
        <View style={{width: '100%'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'center',
            }}>
            <Text
              style={{color: colors.black, fontSize: 16, fontWeight: '500'}}>
              Report {tutorDetail?.User?.name}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setReports([]);
                setIsOpenReport(false);
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
          <View style={styles.modalBody}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <AntDesign
                name="exclamationcircle"
                size={20}
                color={colors.primary}
              />
              <Text
                style={{
                  color: colors.black,
                  fontSize: 14,
                  fontWeight: '500',
                  marginLeft: 6,
                }}>
                Help us understand what's happening
              </Text>
            </View>
            <View style={{paddingHorizontal: 8, width: '100%'}}>
              {REPORTS.map((item: any, index: number) => {
                return (
                  <Pressable
                    key={index}
                    onPress={() => {
                      setReports((prev: any) => {
                        if (prev.includes(index)) {
                          return reports.filter(i => i !== index);
                        } else {
                          return [...prev, index];
                        }
                      });
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <CheckBox
                        value={reports.includes(index)}
                        onValueChange={() => {
                          setReports((prev: any) => {
                            if (prev.includes(index)) {
                              return reports.filter(i => i !== index);
                            } else {
                              return [...prev, index];
                            }
                          });
                        }}
                        tintColors={{
                          true: colors.primary,
                          false: 'rgba(0,0,0,0.5)',
                        }}
                      />
                      <Text
                        style={{
                          color: 'rgba(0,0,0,0.85)',
                          fontSize: 14,
                          flex: 1,
                          flexWrap: 'wrap',
                        }}>
                        {item}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>

            <TextInput
              multiline={true}
              numberOfLines={12}
              textAlignVertical="top"
              placeholder="Please let us know details about your problem"
              placeholderTextColor={colors.grey500}
              style={{
                color: colors.black,
                textAlign: 'left',
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderColor: colors.grey350,
                borderWidth: 1,
                borderRadius: 6,
                marginTop: 16,
                zIndex: -1,
                fontSize: 14,
              }}>
              {reports
                .sort((a, b) => a - b)
                .map((item, index) => {
                  return REPORTS[item] + '\n';
                })}
            </TextInput>

            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-end',
                marginTop: 16,
              }}>
              <Button
                title="Cancel"
                onPress={() => {
                  setReports([]);
                  setIsOpenReport(false);
                }}
                style={{
                  borderColor: colors.primary,
                  color: colors.primary,
                }}
              />

              <Button
                title="Submit"
                onPress={() => setIsOpenReport(false)}
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
        </View>
      </ModalPopper>

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
                  fontSize: 14,
                  fontWeight: '500',
                  borderRadius: 6,
                  textAlign: 'center',
                }}>
                20:30 - 20:55 Saturday, 25 November 2023
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
                  You have 0 class left
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
                }}>
                {reports
                  .sort((a, b) => a - b)
                  .map((item, index) => {
                    return REPORTS[item] + '\n';
                  })}
              </TextInput>
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
                onPress={() => setIsOpenBookingModal(false)}
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
        </View>
      </ModalPopper>

      <StatusBar
        backgroundColor={colors.white}
        barStyle={'dark-content'}
        hidden={isFullscreen}
      />
    </ScrollView>
  );
};

export default TutorDetail;
