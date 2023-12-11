import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import Header from '@/components/Header';
import {images} from '@/assets';
import FormGroup from '@/components/FormGroup';
import DropdownMenu from '@/components/DropdownMenu';
import styles from './styles';
import {colors} from '@/constants';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import RadioGroup, {RadioButton} from 'react-native-radio-buttons-group';
import CheckBox from '@react-native-community/checkbox';
import {LEARN_TOPICS, TEST_PREPARATIONS, CATEGORIES} from '@/store/mock-data';
import Button from '@/components/Button';
import {formatDate} from '@/utils';
const SPECIALTIES = [...LEARN_TOPICS, ...TEST_PREPARATIONS];
import CustomVideo from '@/components/CustomVideo';
import DocumentPicker, {
  isCancel,
  isInProgress,
  types,
} from 'react-native-document-picker';
import StackProps from '@/types/type';
import {useNavigation} from '@react-navigation/native';
import {useGlobalContext, useTranslations} from '@/hooks';
import {addApplication} from '@/store';
import DrawerButton from '@/components/DrawerButton';
import * as tutorService from '@/services/tutorService';
import EncryptedStorage from 'react-native-encrypted-storage';

const BecomeTutor = () => {
  const [generalInfo, setGeneralInfo] = useState({
    fullName: '',
    country: {
      name: '',
      region: '',
      key: '',
      id: '',
    },
    birthday: '',
  });
  const [cv, setCV] = useState({
    interests: '',
    education: '',
    experience: '',
    profession: '',
    certificates: [],
  });
  const [languages, setLanguages] = useState<any[]>([]);
  const [teaching, setTeaching] = useState({
    intro: '',
    skill: {
      id: 1,
      label: 'Người mới bắt đầu',
    },
    specialties: [],
  });
  const [video, setVideo] = useState<any>({
    fileCopyUri: '',
  });

  const [state, dispatch] = useGlobalContext();
  const {t} = useTranslations();
  const navigation = useNavigation<StackProps>();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [tab, setTab] = useState(1);
  const [isOpenCountryModal, setIsOpenCountryModal] = useState(false);
  const [isOpenLanguageMenu, setIsOpenLanguageMenu] = useState(false);
  const [countries, setCountries] = useState<any[]>([]);
  const [languageForMenu, setLanguageForMenu] = useState<any[]>([]);
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);

  const handleChangeGeneralInfo = (key: string, value: any) => {
    setGeneralInfo((prev: any) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleChangeCV = (key: string, value: any) => {
    setCV((prev: any) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleChangeTeaching = (key: string, value: any) => {
    setTeaching((prev: any) => {
      if (key !== 'specialties') {
        return {
          ...prev,
          [key]: value,
        };
      } else {
        const index = prev.specialties.findIndex(
          (_item: any) => _item.key === value.key,
        );
        if (index !== -1) {
          const specialties = prev.specialties.filter(
            (_item: any) => _item.key !== value?.key,
          );
          return {...prev, specialties};
        } else {
          return {...prev, specialties: [...prev.specialties, value]};
        }
      }
    });
  };

  const handleChangeLanguages = (item: any) => {
    setLanguages((prev: any) => {
      const index = languages.findIndex(_item => _item.key === item.key);
      if (index !== -1) {
        const state = prev.filter((_item: any) => _item.key !== item.key);
        return [...state];
      } else {
        return [...prev, item];
      }
    });
  };

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const {type} = event;
    if (type == 'set') {
      setGeneralInfo((prev: any) => {
        const currentDate = selectedDate;
        return {...prev, birthday: currentDate?.toDateString()};
      });

      setIsShowDatePicker(false);
    } else {
      setIsShowDatePicker(false);
    }
  };

  const renderLanguageItems = () => {
    return languages.map((item: any, index) => {
      return (
        <View
          key={index}
          style={{
            backgroundColor: 'rgba(0,0,0,0.1)',
            borderRadius: 4,
            flexDirection: 'row',
            padding: 2,
            marginLeft: 4,
            marginTop: 4,
          }}>
          <Text style={{fontSize: 14, color: colors.text}}>{item.name}</Text>
          <TouchableWithoutFeedback
            onPress={() => {
              setIsOpenLanguageMenu(false);
              setLanguages((prev: any) => {
                const state = prev.filter(
                  (_item: any) => _item.key !== item.key,
                );
                return [...state];
              });
            }}>
            <AntDesign
              name="close"
              size={20}
              color="rgba(0,0,0,0.8)"
              style={{marginLeft: 4}}
            />
          </TouchableWithoutFeedback>
        </View>
      );
    });
  };

  const handleSubmitApplication = async () => {
    const data: any = {
      avatar: undefined,
      name: generalInfo.fullName,
      country: generalInfo.country.key,
      birthday: generalInfo.birthday,
      ...cv,
      certificateMapping: cv.certificates,
      teaching,
      languages,
      video,
    };
    delete data.certificates;

    const session = await EncryptedStorage.getItem('user_session');
    const res = await tutorService.becomeTutor(data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(session).accessToken}`,
      },
    });
  };

  const radioButtons = useMemo(
    () => [
      {
        id: 1, // acts as primary key, should be unique and non-empty string
        label: 'beginner',
        value: 'option1',
      },
      {
        id: 2,
        label: 'intermediate',
        value: 'option2',
      },
      {
        id: 3,
        label: 'advanced',
        value: 'option3',
      },
    ],
    [],
  );

  useEffect(() => {
    fetch('https://api.first.org/data/v1/countries')
      .then(response => {
        return response.json();
      })
      .then(({data}: any) => {
        const _countries = Object.keys(data).map(key => {
          return {
            name: data[key].country,
            region: data[key].region,
            key: key,
            id: key,
          };
        });
        _countries.sort((a, b) => a.key.localeCompare(b.key));
        setCountries(_countries);
      });

    setLanguageForMenu(() => {
      const temp = CATEGORIES[0].categories.map(item => {
        return {
          ...item,
          name: item.description,
        };
      });
      return temp;
    });

    const application = state.applications.find(
      (app: any) => app.id === 'f569c202-7bbf-4620-af77-ecc1419a6b28',
    );
    if (application) {
      setGeneralInfo(application.generalInfo);
      setCV(application.cv);
      setTeaching(application.teaching);
      setLanguages(application.languages);
      setVideo(application.video);
    }
  }, []);

  const handleError = (err: unknown) => {
    if (isCancel(err)) {
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the first will be considered',
      );
    } else {
      throw err;
    }
  };
  useEffect(() => {
    if (video) {
      //onChangeProfile('avatar', video?.[0]?.fileCopyUri);
    }
  }, [video]);

  return (
    <ScrollView className="bg-white">
      <Header drawerBtn={<DrawerButton />} />
      <View className="flex-column mt-4 px-2.5">
        <View className="flex-row items-center">
          <Text
            className="bg-blue-500 rounded-full text-gray-300 w-8 h-8 text-center leading-8 font-bold"
            style={
              tab !== 1 && {
                backgroundColor: colors.white,
                borderColor: colors.primary,
                borderWidth: 1,
              }
            }>
            {tab !== 1 ? (
              <AntDesign name="check" size={20} color={colors.primary} />
            ) : (
              1
            )}
          </Text>
          <Text
            className="ml-2.5 text-black text-base"
            style={tab == 1 && {fontWeight: '500'}}>
            {t('becomeTutor.tab1')}
          </Text>
        </View>
        <View className="flex-row items-center mt-2.5">
          <Text
            className="border border-gray-400 text-gray-300 rounded-full w-8 h-8 text-center leading-8"
            style={[
              tab === 2 && {
                backgroundColor: colors.primary,
                color: colors.white,
              },
              tab === 3 && {
                backgroundColor: colors.white,
                borderColor: colors.primary,
                borderWidth: 1,
              },
            ]}>
            {tab === 3 ? (
              <AntDesign name="check" size={20} color={colors.primary} />
            ) : (
              2
            )}
          </Text>
          <Text
            className="ml-2.5 text-gray-400 text-base"
            style={[
              tab === 2 && {fontWeight: '500', color: colors.black},
              tab == 3 && {fontWeight: '400', color: colors.black},
            ]}>
            {t('becomeTutor.tab2')}
          </Text>
        </View>
        <View className="flex-row items-center mt-2.5">
          <Text
            className="border border-gray-400  text-gray-300 rounded-full w-8 h-8 text-center leading-8"
            style={[
              tab === 3 && {
                backgroundColor: colors.primary,
                color: colors.white,
              },
            ]}>
            {/* <AntDesign name="check" size={20} color={colors.primary} /> */}3
          </Text>
          <Text
            className="ml-2.5 text-gray-400 text-base"
            style={[tab === 3 && {fontWeight: '500', color: colors.black}]}>
            {t('becomeTutor.tab3')}
          </Text>
        </View>
      </View>
      {tab == 1 && (
        <View>
          <View className="px-2.5 mt-4">
            <Image
              source={images.becomeTutor}
              style={{width: 140, height: 140}}
            />
            <Text className="text-gray-700 text-xl font-bold mt-1">
              {t('becomeTutor.title')}
            </Text>
            <Text className="text-base text-gray-700 text-justify">
              {t('becomeTutor.description1')}
            </Text>
            <Text className="text-base text-gray-700 mt-4 text-justify">
              {t('becomeTutor.description2')}
            </Text>
          </View>
          <View className="px-2.5 mb-8">
            <View className="flex-row items-center mt-2">
              <View className="h-px bg-gray-300 w-6" />
              <Text className="text-gray-700 text-xl font-bold px-2">
                {t('becomeTutor.basicInfo')}
              </Text>
              <View className="ml-2 h-px bg-gray-300 flex-1" />
            </View>
            <Image
              source={images.becomeTutor}
              style={{width: 200, height: 200}}
              className="self-center my-2"
            />
            <Text className="w-2/3 text-center text-black self-center text-base border border-blue-300 p-4 bg-blue-50 rounded-md">
              {t('becomeTutor.noteForAvatar')}
            </Text>

            <View className="px-6 mt-2">
              <FormGroup
                title={t('becomeTutor.tutorName')}
                placeholder={t('becomeTutor.enterTutorName')}
                field="fullName"
                value={generalInfo.fullName}
                onChange={handleChangeGeneralInfo}
              />

              <Text className="text-base mb-1 text-black">
                {t('becomeTutor.iAmFrom')}
              </Text>
              <DropdownMenu
                isOpen={isOpenCountryModal}
                data={countries}
                onChangeOpen={setIsOpenCountryModal}
                onChangeSelected={handleChangeGeneralInfo}
                selectedItem={generalInfo.country}
                typeOfMenu="country"
                style={{zIndex: 1}}>
                <Pressable
                  className="py-2.5"
                  onPress={() => setIsOpenCountryModal(!isOpenCountryModal)}
                  style={styles.dropdownMenuBtn}>
                  <Text style={{fontSize: 14, color: colors.text}}>
                    {generalInfo.country?.name ||
                      t('tutor.selectNationalities')}
                  </Text>
                  {isOpenCountryModal ? (
                    <Entypo name="chevron-small-down" size={24} color="black" />
                  ) : (
                    <Entypo
                      name="chevron-small-right"
                      size={24}
                      color="black"
                    />
                  )}
                </Pressable>
              </DropdownMenu>

              <Text className="text-base mb-1 text-black mt-2.5">
                {t('birthday')}
              </Text>
              <Pressable onPress={() => setIsShowDatePicker(!isShowDatePicker)}>
                <View
                  className="py-2.5 mt-1 flex-row justify-between items-center w-full"
                  style={[
                    styles.inputContainer,
                    {
                      borderColor: colors.grey500,
                    },
                  ]}>
                  <Text className="text-black py-0.5">
                    {generalInfo.birthday != ''
                      ? formatDate(new Date(generalInfo.birthday))
                      : t('enterBirthday')}
                  </Text>
                  <TouchableWithoutFeedback
                    onPress={() =>
                      setGeneralInfo((prev: any) => ({
                        ...prev,
                        birthday: undefined,
                      }))
                    }>
                    <FontAwesome
                      name="calendar"
                      size={18}
                      color={colors.grey500}
                      style={{marginLeft: 20}}
                    />
                  </TouchableWithoutFeedback>
                  {isShowDatePicker && (
                    <DateTimePicker
                      mode="date"
                      display="calendar"
                      value={new Date()}
                      onChange={onChangeDate}
                    />
                  )}
                </View>
              </Pressable>
            </View>

            <View className="px-2.5">
              <View className="flex-row items-center mt-2">
                <View className="h-px bg-gray-300 w-6" />
                <Text className="text-gray-700 text-xl font-bold px-2">CV</Text>
                <View className="ml-2 h-px bg-gray-300 flex-1" />
              </View>
              <Text className="text-base text-gray-700 text-justify">
                {t('becomeTutor.desForCV')}
              </Text>
              <Text className="mt-2.5 text-center text-black self-center text-base border border-blue-300 p-4 bg-blue-50 rounded-md">
                {t('becomeTutor.noteForCV')}
              </Text>
              <View>
                <Text className="text-base mb-2 mt-4 text-black">
                  {t('tutorDetail.interests')}
                </Text>
                <TextInput
                  onChangeText={text => {
                    handleChangeCV('hobbies', text);
                  }}
                  multiline={true}
                  numberOfLines={8}
                  textAlignVertical="top"
                  placeholder="Những điều thú vị, sở thích, những trải nghiệm đáng nhớ hoặc bất cứ điều gì mà bạn muốn chia sẻ."
                  placeholderTextColor={colors.grey500}
                  className="text-black text-left text-base px-3 rounded-md border"
                  style={{
                    borderRadius: 6,
                    borderColor: colors.grey300,
                  }}>
                  {cv.hobbies}
                </TextInput>
              </View>
              <View>
                <Text className="text-base mb-2 mt-4 text-black">
                  {t('tutorDetail.education')}
                </Text>
                <TextInput
                  onChangeText={text => {
                    handleChangeCV('education', text);
                  }}
                  multiline={true}
                  numberOfLines={8}
                  textAlignVertical="top"
                  placeholder='Ví dụ: "Bằng cử nghệ thuật của đại học Cambly; Chứng nhận huấn luyện viên Yoga, Chứng chỉ Tiếp thu và Giảng dạy Ngôn ngữ Thứ hai (SLAT) của Đại học Cambly"'
                  placeholderTextColor={colors.grey500}
                  className="text-black text-left text-base px-3 rounded-md border"
                  style={{
                    borderRadius: 6,
                    borderColor: colors.grey300,
                  }}>
                  {cv.education}
                </TextInput>
              </View>
              <View>
                <Text className="text-base mb-2 mt-4 text-black">
                  {t('becomeTutor.experience')}
                </Text>
                <TextInput
                  onChangeText={text => {
                    handleChangeCV('experience', text);
                  }}
                  multiline={true}
                  numberOfLines={8}
                  textAlignVertical="top"
                  placeholderTextColor={colors.grey500}
                  className="text-black text-left text-base px-3 rounded-md border"
                  style={{
                    borderRadius: 6,
                    borderColor: colors.grey300,
                  }}>
                  {cv.experience}
                </TextInput>
              </View>
              <View>
                <Text className="text-base mb-2 mt-4 text-black">
                  {t('becomeTutor.previousProfession')}
                </Text>
                <TextInput
                  onChangeText={text => handleChangeCV('profession', text)}
                  multiline={true}
                  numberOfLines={8}
                  textAlignVertical="top"
                  placeholderTextColor={colors.grey500}
                  className="text-black text-left text-base px-3 rounded-md border"
                  style={{
                    borderRadius: 6,
                    borderColor: colors.grey300,
                  }}>
                  {cv.profession}
                </TextInput>
              </View>
              <View>
                <Text className="text-base mb-2 mt-4 text-black">
                  {t('becomeTutor.certificate')}
                </Text>

                <View style={styles.bookContainer}>
                  <Text
                    style={[
                      styles.text,
                      {fontWeight: '500', color: colors.black, marginBottom: 8},
                    ]}>
                    {t('schedule.latestBook')}
                  </Text>
                  <View style={styles.tableHeader}>
                    <Text style={[styles.tableCol, {width: '30%'}]}>
                      {t('schedule.name')}
                    </Text>
                    <Text
                      style={[
                        styles.tableCol,
                        {width: '40%', backgroundColor: colors.white},
                      ]}>
                      Sample.pdf
                    </Text>
                    <Text style={[styles.tableCol, {width: '18%'}]}>
                      {t('schedule.page')}
                    </Text>
                    <Text
                      style={[
                        styles.tableCol,
                        {width: '12%', backgroundColor: colors.white},
                      ]}>
                      0
                    </Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCol, {width: '30%'}]}>
                      {t('schedule.description')}
                    </Text>
                    <Text
                      style={[
                        styles.tableCol,
                        {
                          width: '70%',
                          backgroundColor: colors.white,
                          lineHeight: 20,
                        },
                      ]}>
                      Sample.pdfDescriptionDescriptionDescriptionDescriptionDescription
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View className="px-2.5">
              <View className="flex-row items-center mt-2">
                <View className="h-px bg-gray-300 w-6" />
                <Text className="text-gray-700 text-xl font-bold px-2">
                  {t('becomeTutor.myLanguages')}
                </Text>
                <View className="ml-2 h-px bg-gray-300 flex-1" />
              </View>
              <View>
                <Text className="text-base mb-2 mt-4 text-black">
                  {t('tutorDetail.languages')}
                </Text>
              </View>
              <DropdownMenu
                isOpen={isOpenLanguageMenu}
                data={languageForMenu}
                onChangeOpen={setIsOpenLanguageMenu}
                onChangeSelected={handleChangeLanguages}
                selectedItem={{}}
                style={{zIndex: 1}}>
                <Pressable
                  className="py-2.5"
                  onPress={() => setIsOpenLanguageMenu(!isOpenLanguageMenu)}
                  style={styles.dropdownMenuBtn}>
                  <View className="flex-row flex-wrap">
                    {languages.length > 0 ? (
                      renderLanguageItems()
                    ) : (
                      <Text style={{fontSize: 14, color: colors.text}}>
                        Ví dụ: Tiếng Anh, Tiếng Việt, Tiếng Trung, Tiếng Hàn
                      </Text>
                    )}
                  </View>
                  {isOpenLanguageMenu ? (
                    <Entypo
                      style={{marginLeft: -16}}
                      name="chevron-small-down"
                      size={24}
                      color="black"
                    />
                  ) : (
                    <Entypo
                      style={{marginLeft: -16}}
                      name="chevron-small-right"
                      size={24}
                      color="black"
                    />
                  )}
                </Pressable>
              </DropdownMenu>
            </View>

            <View className="px-2.5">
              <View className="flex-row items-center mt-2">
                <View className="h-px bg-gray-300 w-6" />
                <Text className="text-gray-700 text-xl font-bold px-2">
                  {t('becomeTutor.whoITeach')}
                </Text>
                <View className="ml-2 h-px bg-gray-300 flex-1" />
              </View>
              <Text className="mt-2.5 text-center text-black self-center text-base border border-blue-300 p-4 bg-blue-50 rounded-md">
                {t('becomeTutor.noteForTeach')}
              </Text>
              <Text className="text-base mb-2 mt-4 text-black">
                {t('becomeTutor.introduction')}
              </Text>
              <TextInput
                onChangeText={text => handleChangeTeaching('intro', text)}
                multiline={true}
                numberOfLines={8}
                textAlignVertical="top"
                placeholder='Ví dụ: "Tôi là bác sĩ, năm nay 35 tuổi và có thể giúp bạn thực hành tiếng Anh thương mại và y tế. Tôi cũng thích dạy cho người mới bắt đầu vì có tính kiên nhẫn và luôn nói chậm, rõ ràng. '
                placeholderTextColor={colors.grey500}
                className="text-black text-left text-base px-3 rounded-md border"
                style={{
                  borderRadius: 6,
                  borderColor: colors.grey300,
                }}>
                {teaching.intro}
              </TextInput>
              <Text className="text-base mb-2 mt-4 text-black">
                {t('becomeTutor.whoStudents')}
              </Text>
              <View>
                {radioButtons.map((item, index) => {
                  return (
                    <RadioButton
                      key={String(index)}
                      onPress={() => handleChangeTeaching('skill', item)}
                      id={String(item.id)}
                      label={t(`becomeTutor.${item.label}`)}
                      value={item.value}
                      color={
                        teaching.skill.id === item.id
                          ? colors.success
                          : 'rgba(0,0,0,0.4)'
                      }
                      selected={teaching.skill.id === item.id}
                      labelStyle={{
                        color: colors.black,
                        fontSize: 15,
                      }}></RadioButton>
                  );
                })}
              </View>
              <Text className="text-base mb-2 mt-4 text-black">
                {t('becomeTutor.mySpecialties')}
              </Text>
              {SPECIALTIES.map((item, index) => {
                return (
                  <View key={index} className="flex-row items-center">
                    <CheckBox
                      onValueChange={value => {
                        handleChangeTeaching('specialties', item);
                      }}
                      value={teaching.specialties.some(
                        (specialty: any, index) => specialty?.key === item.key,
                      )}
                      tintColors={{
                        true: colors.primary,
                        false: 'rgba(0,0,0,0.5)',
                      }}
                    />
                    <Text className="text-base text-black ml-2">
                      {t(item.key)}
                    </Text>
                  </View>
                );
              })}
              <Text className="text-base text-red-500">
                {t('becomeTutor.warning')}
              </Text>
            </View>
            <Button
              title={t('next')}
              onPress={() => setTab(2)}
              style={{
                backgroundColor: colors.primary,
                color: colors.white,
                fontWeight: '500',
                marginTop: 24,
              }}
            />
          </View>
        </View>
      )}
      {tab == 2 && (
        <View>
          <View className="px-2.5 mt-4">
            <Image
              source={images.becomeTutor2}
              style={{width: 120, height: 120}}
            />
            <Text className="text-gray-700 text-xl font-bold my-2">
              {t('becomeTutor.introMySelf')}
            </Text>
            <Text className="text-base text-gray-700 text-justify">
              {t('becomeTutor.desForIntroMySelf')}
            </Text>
          </View>
          <View className="px-2.5 mb-8">
            <View className="px-2.5">
              <View className="flex-row items-center mt-2">
                <View className="h-px bg-gray-300 w-6" />
                <Text className="text-gray-700 text-xl font-bold px-2">
                  {t('becomeTutor.titleVideo')}
                </Text>
                <View className="ml-2 h-px bg-gray-300 flex-1" />
              </View>

              <Text className="mt-2.5 text-black self-center text-base border border-blue-300 p-4 bg-blue-50 rounded-md">
                {t('becomeTutor.trick')} {'\n  '}
                {t('becomeTutor.trick1')} {'\n  '}
                {t('becomeTutor.trick2')}
                {'\n  '}
                {t('becomeTutor.trick3')} {'\n  '}
                {t('becomeTutor.trick4')} {'\n  '}
                {t('becomeTutor.trick5')}
                <Text className="text-red-500">
                  {'\n'}
                  {t('becomeTutor.noteForVideo')}
                </Text>
              </Text>
            </View>
            <View>
              <Button
                title={t('becomeTutor.chooseVideo')}
                onPress={async () => {
                  try {
                    const pickerResult = await DocumentPicker.pickSingle({
                      presentationStyle: 'fullScreen',
                      copyTo: 'cachesDirectory',
                    });
                    setVideo(pickerResult);
                  } catch (e) {
                    handleError(e);
                  }
                }}
                style={{
                  color: colors.primary,
                  borderWidth: 1,
                  borderColor: colors.primary,
                  fontWeight: '500',
                  marginTop: 24,
                  paddingHorizontal: 20,
                  alignSelf: 'center',
                }}
              />
              {video.fileCopyUri !== '' && (
                <CustomVideo
                  uri={video?.fileCopyUri}
                  isFullscreen={isFullScreen}
                  onChangeOrientation={setIsFullScreen}
                />
              )}
            </View>
            <View className="flex-row justify-between">
              <Button
                title={t('back')}
                onPress={() => setTab(1)}
                style={{
                  color: colors.primary,
                  borderWidth: 1,
                  borderColor: colors.primary,
                  fontWeight: '500',
                  marginTop: 24,
                  paddingHorizontal: 20,
                }}
              />
              <Button
                title={t('finish')}
                onPress={() => {
                  handleSubmitApplication();
                  setTab(3);
                }}
                style={{
                  backgroundColor: colors.primary,
                  color: colors.white,
                  fontWeight: '500',
                  marginTop: 24,
                  paddingHorizontal: 20,
                }}
              />
            </View>
          </View>
        </View>
      )}
      {tab == 3 && (
        <View className="px-2.5 mt-4 items-center">
          <FontAwesome name="smile-o" size={120} color={colors.primary} />
          <Text className="text-gray-700 text-xl mt-1 px-8 text-center">
            {t('becomeTutor.finishSubmission')}
          </Text>
          <Button
            title={t('home')}
            onPress={() => navigation.navigate('Tutor')}
            style={{
              backgroundColor: colors.primary,
              color: colors.white,
              fontWeight: '500',
              marginTop: 24,
              paddingHorizontal: 20,
            }}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default BecomeTutor;
