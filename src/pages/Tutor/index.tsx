import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';
import Header from '@/components/Header';
import {colors} from '@/constants';
import Button from '@/components/Button';
import TutorItem from './components/TutorItem';
import Pagination from '@/components/Pagination';
import DropdownMenu from '@/components/DropdownMenu';
import StackProps from '@/global/type';
import {useNavigation} from '@react-navigation/native';

const width = Dimensions.get('window').width; //full width

const typesOfTutor = [
  'All',
  'English for kids',
  'English for Business',
  'Conversational',
  'STARTERS',
  'MOVERS',
  'FLYERS',
  'KET',
  'PET',
  'IELTS',
  'TOEFL',
  'TOEIC',
];

const nationalities = [
  'Foreign tutor',
  'Vietnamese tutor',
  'Native English tutor',
];

type SearchState = {
  tutorName: string;
  tutorNationality: string;
  date: Date | null;
  startTime: Date | null;
  endTime: Date | null;
};

const Tutor = () => {
  const navigation = useNavigation<StackProps>();
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  const [isShowTimePicker, setIsShowTimePicker] = useState(false);
  const [isOpenNationality, setIsOpenNationality] = useState(false);

  const [selectedTypes, setSelectedTypes] = useState('All');
  const [timeType, setTimeType] = useState('start');

  const [searchValue, setSearchValue] = useState<SearchState>({
    tutorName: '',
    tutorNationality: '',
    date: null,
    startTime: null,
    endTime: null,
  });

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const {type} = event;
    if (type == 'set') {
      setIsShowDatePicker(false);
      setSearchValue((prev: any) => {
        const currentDate = selectedDate;
        return {...prev, date: currentDate};
      });
    } else {
      setIsShowDatePicker(false);
    }
  };

  const onChangeTime = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const {type} = event;
    if (type === 'set') {
      const currentDate = selectedDate;
      setIsShowTimePicker(!isShowTimePicker);
      setSearchValue((prev: any) => {
        const _time: any = {};
        if (timeType === 'start') {
          _time.startTime = currentDate;
        } else if (timeType === 'end') {
          _time.endTime = currentDate;
        }

        return {...prev, ..._time};
      });
    } else {
      setIsShowTimePicker(!isShowTimePicker);
    }
  };

  const showTimePicker = (type: string) => {
    setIsShowTimePicker(!isShowTimePicker);
    setTimeType(type);
  };

  const onChangeNationality = (item: string) => {
    setSearchValue((prev: any) => {
      return {
        ...prev,
        tutorNationality: item,
      };
    });
  };

  const renderTypesOfTutor = () => {
    return typesOfTutor.map((type, index) => {
      let _styles = {
        color: colors.text,
        backgroundColor: colors.grey100,
      };
      if (selectedTypes === type) {
        _styles.color = colors.primary;
        _styles.backgroundColor = colors.backgroundActive;
      }

      return (
        <Button
          key={index}
          onPress={() => setSelectedTypes(type)}
          title={type}
          style={{
            paddingVertical: 6,
            paddingHorizontal: 10,
            marginLeft: 10,
            marginBottom: 8,
            borderRadius: 6,
            borderColor: 'rgba(0,0,0,0.08)',
            borderWidth: 1,
            ..._styles,
          }}
        />
      );
    });
  };

  return (
    <ScrollView
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: colors.white}}>
      <Header />
      {/* Notification */}
      <LinearGradient
        start={{x: 0.1, y: 0}}
        end={{x: 0.75, y: 1.0}}
        style={styles.notiContainer}
        colors={['rgb(12, 61, 223)', 'rgb(5, 23, 157)']}>
        <View>
          <Text style={styles.notiHeading}>Upcoming lesson</Text>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <View style={{flex: 1}}>
              <Text style={styles.notiDateText}>
                Fri, 20 Oct 23 00:30 - 00:55
              </Text>
              <Text style={styles.notiRemainTimeText}>(starts in ...)</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('VideoCall')}
              activeOpacity={0.8}
              style={{
                backgroundColor: colors.white,
                flex: 1,
                flexDirection: 'row',
                flexShrink: 0,
                alignItems: 'center',
                borderRadius: 20,
                paddingHorizontal: 12,
                paddingVertical: 6,
              }}>
              <Feather name="youtube" size={24} color={colors.primary} />
              <Text
                style={{marginLeft: 6, color: colors.primary, fontSize: 14}}>
                Enter lesson room
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              color: colors.white,
              textAlign: 'center',
              fontSize: 16,
              fontWeight: '500',
              marginTop: 12,
            }}>
            Total lesson time is 507 hours 5 minutes
          </Text>
        </View>
      </LinearGradient>

      {/* Tutor Container */}
      <View style={styles.tutorContainer}>
        <Text
          style={{
            color: colors.black,
            fontSize: 29,
            fontWeight: '700',
            marginBottom: 6,
          }}>
          Find a tutor
        </Text>

        <TextInput
          placeholder="Enter tutor name"
          placeholderTextColor={colors.text}
          style={[
            styles.inputContainer,
            {flex: 1, marginRight: 12, marginBottom: 12},
          ]}
        />
        <DropdownMenu
          data={nationalities}
          onChangeOpen={setIsOpenNationality}
          selectedItem={searchValue.tutorNationality}
          onChangeSelected={onChangeNationality}
          isOpen={isOpenNationality}
          style={{zIndex: 3, flex: 1, width: '60%'}}>
          <Pressable
            onPress={() => {
              setIsOpenNationality(!isOpenNationality);
            }}>
            <View
              style={[
                styles.inputContainer,
                {flexDirection: 'row', alignItems: 'center'},
              ]}>
              <Text
                style={{
                  flex: 1,
                  width: '10%',
                  color: colors.text,
                }}>
                {searchValue.tutorNationality || 'Select nationality'}
              </Text>
              {isOpenNationality ? (
                <Entypo name="chevron-small-down" size={24} color="black" />
              ) : (
                <Entypo name="chevron-small-right" size={24} color="black" />
              )}
            </View>
          </Pressable>
        </DropdownMenu>

        <Text
          style={{
            color: colors.black,
            fontSize: 18,
            fontWeight: '500',
            marginTop: 10,
            marginBottom: 4,
          }}>
          Select available tutoring time:
        </Text>

        {/*Input date & time */}
        <View>
          <View
            style={[
              styles.inputContainer,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '50%',
              },
            ]}>
            <Pressable onPress={() => setIsShowDatePicker(!isShowDatePicker)}>
              <Text style={{color: colors.text, paddingVertical: 2}}>
                {searchValue.date
                  ? searchValue.date?.toDateString()
                  : 'Select a day'}
              </Text>
            </Pressable>
            <FontAwesome
              onPress={() =>
                setSearchValue((prev: any) => ({...prev, date: null}))
              }
              name="calendar"
              size={18}
              color={colors.grey500}
              style={{marginLeft: 20}}
            />
            {isShowDatePicker && (
              <DateTimePicker
                mode="date"
                display="calendar"
                value={searchValue.date ? searchValue.date : new Date()}
                onChange={onChangeDate}
              />
            )}
          </View>

          <View
            style={[
              styles.inputContainer,
              {
                flexDirection: 'row',
                alignItems: 'center',
                width: (width * 3) / 4,
                marginTop: 12,
              },
            ]}>
            <Pressable //Only on android
              onPress={() => {
                showTimePicker('start');
              }}
              style={{flex: 1, paddingVertical: 2}}>
              <Text
                onPressIn={() => {
                  //with editable(false), onPressIn only will work on iOS
                  showTimePicker('start');
                }}
                style={{flex: 1, color: colors.text}}>
                {searchValue.startTime
                  ? searchValue.startTime.toLocaleTimeString()
                  : 'Start time'}
              </Text>
            </Pressable>
            <Entypo
              style={{marginHorizontal: 12}}
              name="arrow-long-right"
              size={20}
              color={colors.text}
            />
            <Pressable
              style={{flex: 1, paddingVertical: 2}}
              onPress={() => {
                showTimePicker('end');
              }}>
              <Text
                onPressIn={() => {
                  showTimePicker('end');
                }}
                style={{flex: 1, color: colors.text}}>
                {searchValue.endTime
                  ? searchValue.endTime.toLocaleTimeString()
                  : 'End time'}
              </Text>
            </Pressable>
            <AntDesign
              style={{marginLeft: 12}}
              name="clockcircleo"
              size={20}
              color={colors.text}
              onPress={() => {
                setSearchValue((prev: any) => {
                  return {
                    ...prev,
                    startTime: null,
                    endTime: null,
                  };
                });
              }}
            />
            {isShowTimePicker && (
              <DateTimePicker
                mode="time"
                display="spinner"
                value={
                  searchValue.startTime ? searchValue.startTime : new Date()
                }
                onChange={onChangeTime}
              />
            )}
          </View>
        </View>

        <View
          style={{
            marginTop: 12,
            marginLeft: -12,
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {renderTypesOfTutor()}
        </View>

        <View>
          <Text
            style={{
              color: colors.black,
              fontSize: 20,
              fontWeight: '600',
              marginTop: 10,
            }}>
            Recommended Tutors
          </Text>
          <View style={styles.tutorList}>
            <TutorItem />
            <TutorItem />
            <TutorItem />
            <TutorItem />
            <TutorItem />
          </View>
          <Pagination />
        </View>
      </View>
    </ScrollView>
  );
};

export default Tutor;
