import {
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  Dimensions,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useEffect, useState, useRef, useCallback} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import EncryptedStorage from 'react-native-encrypted-storage';

import styles from './styles';
import Header from '@/components/Header';
import {colors} from '@/constants';
import Button from '@/components/Button';
import TutorItem from './components/TutorItem';
import DropdownMenu from '@/components/DropdownMenu';
import DrawerButton from '@/components/DrawerButton';
import {useTranslations} from '@/hooks';
import {TEST_PREPARATIONS, LEARN_TOPICS} from '@/store/mock-data';
import * as tutorService from '@/services/tutorService';
import BEPagination from '@/components/BEPagination';
import UpComingLesson from './components/UpComingLesson';

const width = Dimensions.get('window').width; //full width

const typesOfTutor = [
  {
    id: 9,
    key: 'all',
    name: 'All',
    createdAt: '2021-09-05T15:12:34.907Z',
    updatedAt: '2021-09-05T15:12:34.907Z',
  },
  ...LEARN_TOPICS,
  ...TEST_PREPARATIONS,
];

const nationalities = [
  {id: 1, title: 'Foreign tutor', key: 'foreign-tutor'},
  {id: 2, title: 'Vietnamese tutor', key: 'vietnamese-tutor'},
  {id: 3, title: 'Native English tutor', key: 'native-english-tutor'},
];

type SearchState = {
  tutorName: string;
  nationalities: any;
  date: Date | null;
  startTime: Date | null;
  endTime: Date | null;
  specialty: any;
};
const defaultSpecialty = {
  id: 9,
  key: 'all',
  name: 'All',
  createdAt: '2021-09-05T15:12:34.907Z',
  updatedAt: '2021-09-05T15:12:34.907Z',
};

const Tutor = () => {
  const {t} = useTranslations();

  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  const [isShowTimePicker, setIsShowTimePicker] = useState(false);
  const [isOpenNationality, setIsOpenNationality] = useState(false);
  const [timeType, setTimeType] = useState('start');

  const [tutors, setTutors] = useState<any[]>([]);
  const [page, setPage] = useState({
    currentPage: 1,
    totalItems: 0,
  });

  const scrollRef: any = useRef();
  const tutorRef: any = useRef();

  const [filters, setFilters] = useState<SearchState>({
    tutorName: '',
    nationalities: [],
    date: null,
    startTime: null,
    endTime: null,
    specialty: defaultSpecialty,
  });

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const {type} = event;
    if (type == 'set') {
      setIsShowDatePicker(false);
      setFilters((prev: any) => {
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
      setFilters((prev: any) => {
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

  const onChangeNationality = useCallback((item: any) => {
    if (!filters.nationalities.includes(item)) {
      setFilters((prev: any) => {
        console.log('prev', prev);
        return {
          ...prev,
          nationalities: [...prev.nationalities, item],
        };
      });
    }
  }, []);

  const onChangeOpenNationalityMenu = useCallback((value: boolean) => {
    setIsOpenNationality(value);
  }, []);

  const renderSpecialties = () => {
    return typesOfTutor.map((item, index) => {
      let _styles = {
        color: colors.text,
        backgroundColor: colors.grey100,
      };
      if (filters.specialty.key === item.key) {
        _styles.color = colors.primary;
        _styles.backgroundColor = colors.backgroundActive;
      }

      return (
        <Button
          key={index}
          onPress={() => setFilters(prev => ({...prev, specialty: item}))}
          title={t(item.key)}
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

  const renderNationalities = () => {
    let items: [] = filters.nationalities;
    return items.map((item: any, index: number) => {
      return (
        <View
          key={index}
          style={{
            backgroundColor: 'rgba(0,0,0,0.1)',
            borderRadius: 4,
            flexDirection: 'row',
            paddingVertical: 2,
            marginLeft: 4,
            marginTop: 4,
          }}>
          <Text style={{fontSize: 14, color: colors.text}}>{t(item.key)}</Text>
          <TouchableWithoutFeedback
            onPress={() => {
              setIsOpenNationality(false);
              setFilters((prev: any) => {
                return {
                  ...prev,
                  nationalities: prev.nationalities.filter(
                    (e: any) => e.key !== item.key,
                  ),
                };
              });
            }}>
            <AntDesign
              name="close"
              size={20}
              color="rgba(0,0,0,0.6)"
              style={{marginLeft: 4}}
            />
          </TouchableWithoutFeedback>
        </View>
      );
    });
  };

  const onChangePage = useCallback((page: number) => {
    setPage((prev: any) => ({
      ...prev,
      currentPage: page,
    }));
  }, []);

  const handleAddFavorite = (tutorId: string) => {
    setTutors((prev: any) => {
      const _state = [...prev];
      const tutorItem = _state.find((item: any) => item.id === tutorId);
      if (tutorItem) {
        tutorItem.isFavoriteTutor = !tutorItem.isFavoriteTutor;
      }
      return _state;
    });
  };

  useEffect(() => {
    scrollRef.current &&
      scrollRef.current?.scrollTo({
        y: 0, //680
        animated: true,
      });
  }, [page.currentPage]);

  useEffect(() => {
    const fetchForSearchingTutors = async () => {
      let session: any;
      try {
        session = await EncryptedStorage.getItem('user_session');
      } catch (error) {
        throw error;
      }
      const _filters: any = {
        date: filters.date,
        specialties:
          filters.specialty.key == 'all' ? [] : [filters.specialty.key],
        nationality: {},
        tutoringTimeAvailable: [null, null],
      };

      const isVietNamese = filters.nationalities.some(
        (item: any) => item.key === 'vietnamese-tutor',
      );
      if (isVietNamese) {
        _filters.nationality.isVietNamese = true;
      }

      const isNative = filters.nationalities.some(
        (item: any) => item.key === 'native-english-tutor',
      );
      if (isNative) {
        _filters.nationality.isNative = true;
      }

      if (
        filters.nationalities.length === nationalities.length ||
        filters.nationalities.length === 0
      ) {
        _filters.nationality = {};
      } else {
        const isForeignTutor = filters.nationalities.some(
          (item: any) => item.key === 'foreign-tutor',
        );
        if (isForeignTutor) {
          if (isVietNamese) {
            _filters.nationality = {
              isNative: false,
            };
          } else if (isNative) {
            _filters.nationality = {
              isVietNamese: false,
            };
          } else {
            _filters.nationality = {
              isVietNamese: false,
              isNative: false,
            };
          }
        }
      }

      if (_filters.date != null) {
        if (!!filters.startTime && !!filters.endTime) {
          _filters.tutoringTimeAvailable = [
            filters.startTime.getTime(),
            filters.endTime.getTime(),
          ];
        } else if (!!filters.startTime) {
          const currentDate = new Date();
          _filters.tutoringTimeAvailable = [
            filters.startTime.getTime(),
            new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() - 1,
              currentDate.getDate(),
              23,
              59,
              0,
            ).getTime(),
          ];
        } else if (filters.endTime) {
          const currentDate = new Date();
          _filters.tutoringTimeAvailable = [
            new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() - 1,
              currentDate.getDate(),
              0,
              0,
              0,
            ).getTime(),
            filters.endTime.getTime(),
          ];
        }
      }
      try {
        const res = await tutorService.searchTutors(
          {
            search: filters.tutorName,
            filters: _filters,
            perPage: 12,
            page: page.currentPage,
          },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(session).accessToken}`,
            },
          },
        );
        if (res.success) {
          let rawData = res.data.rows;
          const favoriteTutors: any[] = rawData.filter(
            (item: any) => item.isFavoriteTutor === true,
          );
          favoriteTutors.sort((a, b) => b.rating - a.rating);

          const unfavoriteTutors = rawData.filter(
            (item: any) => !item.isFavoriteTutor,
          );
          unfavoriteTutors.sort((a: any, b: any) => b.rating - a.rating);
          rawData = [...favoriteTutors, ...unfavoriteTutors];
          setTutors(rawData);
          setPage((prev: any) => {
            return {
              ...prev,
              totalItems: res.data.count,
            };
          });
        } else {
          console.error('error', res);
        }
      } catch (error) {
        throw error;
      }
    };
    fetchForSearchingTutors();
  }, [filters, page.currentPage]);

  return (
    <ScrollView
      ref={scrollRef}
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: colors.white}}>
      <Header drawerBtn={<DrawerButton />} />
      {/* Notification */}
      <UpComingLesson />
      {/* Tutor Container */}
      <View style={styles.tutorContainer}>
        <Text
          style={{
            color: colors.black,
            fontSize: 29,
            fontWeight: '700',
            marginBottom: 6,
          }}>
          {t('tutor.findATutor')}
        </Text>

        <TextInput
          placeholder={t('tutor.tutorName')}
          placeholderTextColor={colors.text}
          value={filters.tutorName}
          onChangeText={text =>
            setFilters(prev => ({...prev, tutorName: text}))
          }
          style={[styles.inputContainer, {flex: 1, marginBottom: 12}]}
        />

        <DropdownMenu
          isOpen={isOpenNationality}
          data={nationalities}
          onChangeOpen={onChangeOpenNationalityMenu}
          onChangeSelected={onChangeNationality}
          selectedItem={filters.nationalities}
          style={{zIndex: 3}}>
          <Pressable
            onPress={() => setIsOpenNationality(!isOpenNationality)}
            style={styles.dropdownMenuBtn}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginLeft: -8,
                marginTop: -4,
              }}>
              {filters.nationalities?.length > 0 ? (
                renderNationalities()
              ) : (
                <Text style={{fontSize: 14, color: colors.text}}>
                  {t('tutor.selectNationalities')}
                </Text>
              )}
            </View>
            {isOpenNationality ? (
              <Entypo
                name="chevron-small-down"
                size={24}
                color="black"
                style={{marginLeft: -20}}
              />
            ) : (
              <Entypo
                name="chevron-small-right"
                size={24}
                color="black"
                style={{marginLeft: -20}}
              />
            )}
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
          {t('tutor.selectTutoringTime')}
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
                {filters.date
                  ? filters.date?.toDateString()
                  : t('tutor.selectADay')}
              </Text>
            </Pressable>
            <FontAwesome
              onPress={() => setFilters((prev: any) => ({...prev, date: null}))}
              name="calendar"
              size={18}
              color={colors.grey500}
              style={{marginLeft: 20}}
            />
            {isShowDatePicker && (
              <DateTimePicker
                mode="date"
                display="calendar"
                value={filters.date ? filters.date : new Date()}
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
                {filters.startTime
                  ? filters.startTime.toLocaleTimeString()
                  : t('tutor.startTime')}
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
                {filters.endTime
                  ? filters.endTime.toLocaleTimeString()
                  : t('tutor.endTime')}
              </Text>
            </Pressable>
            <AntDesign
              style={{marginLeft: 12}}
              name="clockcircleo"
              size={20}
              color={colors.text}
              onPress={() => {
                setFilters((prev: any) => {
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
                value={filters.startTime ? filters.startTime : new Date()}
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
          {renderSpecialties()}
        </View>
        <Button
          title={t('tutor.resetFilter')}
          style={styles.resetBtn}
          onPress={() => {
            setFilters({
              tutorName: '',
              nationalities: [],
              date: null,
              startTime: null,
              endTime: null,
              specialty: defaultSpecialty,
            });
          }}
        />
        <View>
          <Text
            ref={tutorRef}
            style={{
              color: colors.black,
              fontSize: 20,
              fontWeight: '600',
              marginTop: 10,
            }}>
            {t('tutor.recommendedTutor')}
          </Text>
          <View style={styles.tutorList}>
            {tutors.length > 0 ? (
              tutors.map((tutorItem: any) => {
                return (
                  <TutorItem
                    data={tutorItem}
                    key={tutorItem?.id}
                    onAddFavorite={handleAddFavorite}
                  />
                );
              })
            ) : (
              <Text
                style={{
                  marginTop: 16,
                  color: colors.black,
                  textAlign: 'center',
                  fontSize: 14,
                  fontWeight: '500',
                }}>
                Empty list. Find other tutors!
              </Text>
            )}
          </View>
          <BEPagination
            ITEMS_PER_PAGE={12}
            totalItems={page.totalItems}
            currentPage={page.currentPage}
            onChangePage={onChangePage}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Tutor;
