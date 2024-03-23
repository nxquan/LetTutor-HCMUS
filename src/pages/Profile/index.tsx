import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Pressable,
  ScrollView,
  TextInput,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useState, useEffect, useMemo} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles';
import FormGroup from '@/components/FormGroup';
import {colors} from '@/constants';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import DocumentPicker, {
  isCancel,
  isInProgress,
} from 'react-native-document-picker';

import DropdownMenu from '@/components/DropdownMenu';
import {LEARN_TOPICS} from '@/store/mock-data';
import Header from '@/components/Header';
import Button from '@/components/Button';
import {formatDate} from '@/utils';
import {useGlobalContext, useTranslations} from '@/hooks';
import ModalPopper from '@/components/ModalPopper';
import DrawerButton from '@/components/DrawerButton';
import ReviewModal from './components/ReviewInner';
import ChangePasswordInner from './components/ChangePasswordInner';
import ToastManager, {Toast} from 'toastify-react-native';
import {toastConfig} from '@/config';
import MessageIcon from '@/components/MessageIcon';
import * as userService from '@/services/userService';
import * as utilService from '@/services/utilService';
import {images} from '@/assets';
import {RefreshControl} from 'react-native';
import {useColorScheme} from 'nativewind';
import CStatusBar from '@/components/CStatusBar';
import {Modal} from 'react-native';

const LEVELS = [
  {
    id: 1,
    title: 'Pre A1 (Beginner)',
    key: 'BEGINNER',
  },
  {
    id: 2,
    title: 'A1 (Higher Beginner)',
    key: 'HIGHER_BEGINNER',
  },

  {
    id: 3,
    title: 'A2 (Pre-Intermediate)',
    key: 'PRE_INTERMEDIATE',
  },
  {
    id: 4,
    title: 'B1 (Intermediate)',
    key: 'INTERMEDIATE',
  },
  {
    id: 5,
    title: 'B2 (Upper-Intermediate)',
    key: 'UPPER_INTERMEDIATE',
  },
  {
    id: 6,
    title: 'C1 (Advanced)',
    key: 'ADVANCED',
  },
  {
    id: 7,
    title: 'C2 (Proficiency)',
    key: 'PROFICIENCY',
  },
];

const width = Dimensions.get('window').width;
const Profile = () => {
  const {t} = useTranslations();
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  const [isOpenLevelMenu, setIsOpenLevelMenu] = useState(false);
  const [isOpenSpecialtyMenu, setIsOpenSpecialtyMenu] = useState(false);
  const [isOpenPasswordModal, setIsOpenPasswordModal] = useState(false);
  const [isOpenReviewModal, setIsOpenReviewModal] = useState(false);
  const [isOpenUploadModal, setIsOpenUploadModal] = useState(false);
  const [countries, setCountries] = useState<any[]>([]);
  const [isOpenCountryModal, setIsOpenCountryModal] = useState(false);
  const [profile, setProfile] = useState<any>(undefined);
  const [isChange, setIsChange] = useState(false);
  const [avatar, setAvatar] = React.useState<any>({
    fileCopyUri: '',
    isChange: false,
  });
  const [curName, setCurName] = useState('');
  const [specialties, setSpecialties] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(false);
  const {colorScheme} = useColorScheme();
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useGlobalContext();

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const {type} = event;
    setIsShowDatePicker(false);
    if (type == 'set') {
      setProfile((prev: any) => {
        const currentDate = selectedDate;
        return {...prev, birthday: currentDate?.toDateString()};
      });
    }
    setAvatar(true);
  };

  const onChangeProfile = useCallback((key: string, value: any) => {
    setProfile((prev: any) => {
      const newState = {
        ...prev,
      };
      if (Array.isArray(prev[key])) {
        const isExisting = prev[key].find(
          (item: any) => item.key === value?.key,
        );
        if (!!isExisting) {
          newState[key] = prev[key].filter(
            (item: any) => item.key !== value?.key,
          );
        } else {
          newState[key] = [...prev[key], value];
        }
      } else {
        if (key === 'level') {
          newState[key] = value?.key;
        } else {
          newState[key] = value;
        }
      }
      return newState;
    });
    setIsChange(true);
  }, []);

  const renderSpecialties = () => {
    if (
      profile?.testPreparations.length > 0 ||
      profile?.learnTopics.length > 0
    ) {
      const specialties = [
        ...profile?.testPreparations,
        ...profile?.learnTopics,
      ];
      return specialties.map((item: any) => (
        <View
          key={item.key}
          style={{
            backgroundColor:
              colorScheme == 'light'
                ? 'rgba(0,0,0,0.1)'
                : 'rgba(255,255,255,0.3)',
            borderRadius: 4,
            flexDirection: 'row',
            padding: 2,
            marginLeft: 4,
            marginTop: 4,
          }}>
          <Text className="text-black text-sm dark:text-white">
            {item.name}
          </Text>
          <TouchableWithoutFeedback
            onPress={() => {
              setIsOpenSpecialtyMenu(false);
              setProfile((prev: any) => {
                if (
                  !!LEARN_TOPICS.find((_item: any) => _item.key === item.key)
                ) {
                  return {
                    ...prev,
                    learnTopics: prev['learnTopics'].filter(
                      (e: any) =>
                        e.key?.toLowerCase() !== item.key?.toLowerCase(),
                    ),
                  };
                } else {
                  return {
                    ...prev,
                    testPreparations: prev['testPreparations'].filter(
                      (e: any) =>
                        e.key?.toLowerCase() !== item.key?.toLowerCase(),
                    ),
                  };
                }
              });
              setIsChange(true);
            }}>
            <AntDesign
              name="close"
              size={20}
              color={
                colorScheme == 'light'
                  ? 'rgba(0,0,0,0.8)'
                  : 'rgba(255,255,255,0.3)'
              }
              style={{marginLeft: 4}}
            />
          </TouchableWithoutFeedback>
        </View>
      ));
    } else {
      return (
        <Text className="text-sm text-gray-800 dark:text-white">
          Select levels
        </Text>
      );
    }
  };

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

  const renderDrawerButton: JSX.Element = useMemo(() => {
    return <DrawerButton />;
  }, []);

  const handleChangeProfile = async () => {
    const payload = {
      name: profile?.name,
      birthday: profile?.birthday,
      country: profile?.country?.key ? profile?.country?.key : profile?.country,
      level: profile?.level,
      phone: profile?.phone,
      studySchedule: profile?.studySchedule,
      learnTopics: profile.learnTopics.map((item: any) => item.id),
      testPreparations: profile.testPreparations.map((item: any) => item.id),
    };
    const res = await userService.updateUserInfo(payload);
    if (res.success) {
      const {user} = res.data;
      setProfile(user);
      setIsChange(false);
      setCurName(profile.name);
      Toast.success('Update profile successfully');
    } else {
      Toast.error('Update profile failed', 'top');
    }
  };

  const handleUploadAvatar = async () => {
    var data = new FormData();
    data.append('avatar', {
      uri: avatar.fileCopyUri,
      name: avatar.name,
      type: avatar.type,
    });
    const res = await userService.uploadUserAvatar(data);
    if (res.success) {
      setProfile((prev: any) => ({...prev, avatar: res.data.avatar}));
      setAvatar({fileCopyUri: res.data.avatar, isChange: false});
      Toast.success('Upload avatar successfully');
    } else {
      Toast.error('Upload avatar failed', 'top');
    }
    setIsOpenUploadModal(false);
  };

  const fetchInfo = async (isLoadingPage = false) => {
    isLoadingPage && setLoading(true);
    const res = await userService.getUserInfo();
    if (res.success) {
      const {user} = res.data;
      setProfile(user);
      setAvatar({fileCopyUri: user.avatar, isChange: false});
      setCurName(user.name);
    }
    isLoadingPage && setLoading(false);
  };

  const handleRefresh = () => {
    setRefresh(true);
    fetchInfo();
    setTimeout(() => setRefresh(false), 800);
  };

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

    const fetchSpecialties = async () => {
      const learnTopics = await utilService.getLearnTopics();
      const testPreparations = await utilService.getTestPreparations();

      const _specialties: any[] = [
        ...learnTopics.data.map((item: any) => ({
          ...item,
          parentType: 'learnTopics',
        })),
        ...testPreparations.data.map((item: any) => ({
          ...item,
          parentType: 'testPreparations',
        })),
      ];

      setSpecialties(_specialties);
    };
    fetchInfo(true);
    fetchSpecialties();
  }, []);

  return (
    <View className="flex-1">
      <Header style={{zIndex: 50}} drawerBtn={renderDrawerButton} />
      <ScrollView
        className="bg-white dark:bg-black"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            colors={[colors.primary]}
            onRefresh={handleRefresh}
          />
        }>
        <View
          style={styles.inner}
          className="border border-gray-300 rounded-md mx-4 my-8">
          <View className="flex justify-center px-6 py-4">
            <View style={{width: 140, height: 140}} className="self-center">
              <Image
                className="self-center rounded-full"
                resizeMode="cover"
                resizeMethod="auto"
                src={
                  profile?.avatar ==
                  'https://www.alliancerehabmed.com/wp-content/uploads/icon-avatar-default.png'
                    ? undefined
                    : profile?.avatar
                }
                source={images.defaultAvatar}
                style={{
                  width: 140,
                  height: 140,
                  borderWidth: 1,
                  borderColor:
                    colorScheme == 'light'
                      ? 'rgba(0,0,0,0.1)'
                      : 'rgba(255,255,255,0.4)',
                }}
              />
              <TouchableOpacity
                onPress={async () => {
                  setIsOpenUploadModal(true);
                }}
                className="bg-blue-500 rounded-full flex justify-center items-center"
                style={{
                  width: 36,
                  height: 36,
                  position: 'absolute',
                  top: '65%',
                  right: 0,
                }}>
                <FontAwesome5 name="pen" size={20} color={colors.white} />
              </TouchableOpacity>
            </View>
            <Text className="font-medium text-blue-500 text-3xl text-center mt-2">
              {curName}
            </Text>
            <Text
              className="text-base text-grey-500 dark:text-white mt-1"
              numberOfLines={1}>
              Account ID: {profile?.id}
            </Text>
            <TouchableOpacity
              onPress={() => setIsOpenReviewModal(true)}
              className="my-1">
              <Text className="text-base text-blue-500 font-medium">
                {t('profile.othersReviewYou')}
              </Text>
            </TouchableOpacity>
            {state.currentUser.type == '' && (
              <TouchableOpacity onPress={() => setIsOpenPasswordModal(true)}>
                <Text className="text-base text-blue-500 font-medium">
                  {t('signin.changePassword')}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <Text className="text-base text-black dark:text-white font-medium p-3 bg-gray-200 dark:bg-gray-800">
            {t('profile.account')}
          </Text>
          <View className="px-6 pt-6 pb-9">
            <FormGroup
              required={true}
              title={t('profile.name')}
              field="name"
              value={profile?.name}
              onChange={onChangeProfile}
            />
            <FormGroup
              editable={false}
              title={t('profile.emailAddress')}
              field="email"
              value={profile?.email}
              onChange={onChangeProfile}
            />

            <Text className="text-base mb-1 font-normal text-gray-800 dark:text-white">
              <Text className="text-red-500">* </Text>
              {t('profile.country')}
            </Text>
            <DropdownMenu
              isOpen={isOpenCountryModal}
              data={countries}
              onChangeOpen={setIsOpenCountryModal}
              onChangeSelected={onChangeProfile}
              selectedItem={{key: profile?.country}}
              typeOfMenu="country"
              style={{zIndex: 4}}>
              <Pressable
                className="py-2.5 mb-2.5"
                onPress={() => setIsOpenCountryModal(!isOpenCountryModal)}
                style={styles.dropdownMenuBtn}>
                <Text className="text-text dark:text-white text-sm">
                  {countries.find((country: any) => {
                    if (profile?.country?.key) {
                      return country.key == profile?.country?.key;
                    }
                    return profile?.country == country.key;
                  })?.name || t('tutor.selectNationalities')}
                </Text>
                {isOpenCountryModal ? (
                  <Entypo
                    name="chevron-small-down"
                    size={24}
                    color={colorScheme == 'light' ? colors.black : colors.white}
                  />
                ) : (
                  <Entypo
                    name="chevron-small-right"
                    size={24}
                    color={colorScheme == 'light' ? colors.black : colors.white}
                  />
                )}
              </Pressable>
            </DropdownMenu>

            <FormGroup
              required
              editable={false}
              title={t('profile.phoneNumber')}
              type="phone"
              field="phone"
              value={profile?.phone}
              onChange={onChangeProfile}
            />
            {profile?.isPhoneActivated && (
              <Text className="px-2 py-1 bg-green-50 rounded text-green-600 border border-green-500 self-end">
                Verified
              </Text>
            )}
            <Text className="text-base font-normal text-gray-800 dark:text-white">
              <Text className="text-red-500">* </Text>
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
                <Text className="text-black dark:text-white py-0.5">
                  {profile?.birthday
                    ? formatDate(new Date(profile?.birthday))
                    : t('tutor.selectADay')}
                </Text>
                <TouchableWithoutFeedback
                  onPress={() =>
                    setProfile((prev: any) => ({...prev, birthday: undefined}))
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

            <Text className="text-base font-normal text-gray-800 dark:text-white mt-2.5 mb-1.5">
              <Text className="text-red-500">* </Text>
              {t('profile.myLevel')}
            </Text>
            <DropdownMenu
              isOpen={isOpenLevelMenu}
              data={LEVELS}
              onChangeOpen={setIsOpenLevelMenu}
              onChangeSelected={onChangeProfile}
              selectedItem={{key: profile?.level}}
              typeOfMenu="level"
              style={{zIndex: 3}}>
              <Pressable
                onPress={() => setIsOpenLevelMenu(!isOpenLevelMenu)}
                className="flex-row justify-between items-center w-full px-3 py-2.5 rounded-md border"
                style={styles.dropdownMenuBtn}>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginLeft: -4,
                    marginTop: -4,
                  }}>
                  <Text className="text-sm text-gray-800 dark:text-white">
                    {profile?.level
                      ? LEVELS.find(
                          (level: any) => level.key === profile?.level,
                        )?.title
                      : t('profile.selectLevel')}
                  </Text>
                </View>
                {isOpenLevelMenu ? (
                  <Entypo
                    name="chevron-small-down"
                    size={24}
                    color={colorScheme == 'light' ? colors.black : colors.white}
                  />
                ) : (
                  <Entypo
                    name="chevron-small-right"
                    size={24}
                    color={colorScheme == 'light' ? colors.black : colors.white}
                  />
                )}
              </Pressable>
            </DropdownMenu>

            <Text className="text-base font-normal text-gray-800 dark:text-white mt-2.5 mb-1.5">
              <Text className="text-red-500">* </Text>
              {t('profile.wantToLearn')}
            </Text>
            <DropdownMenu
              isOpen={isOpenSpecialtyMenu}
              data={specialties}
              onChangeOpen={setIsOpenSpecialtyMenu}
              onChangeSelected={onChangeProfile}
              selectedItem={null}
              typeOfMenu="learnTopics"
              useKey={true}
              style={{zIndex: 2}}>
              <Pressable
                onPress={() => setIsOpenSpecialtyMenu(!isOpenSpecialtyMenu)}
                className="flex-row justify-between items-center w-full px-3 py-2.5 rounded-md border"
                style={styles.dropdownMenuBtn}>
                <View
                  className="flex-row flex-wrap"
                  style={{
                    marginLeft: -4,
                    marginTop: -4,
                  }}>
                  {renderSpecialties()}
                </View>
                {isOpenLevelMenu ? (
                  <Entypo
                    name="chevron-small-down"
                    size={24}
                    color={colorScheme == 'light' ? colors.black : colors.white}
                    style={{marginLeft: -22}}
                  />
                ) : (
                  <Entypo
                    style={{marginLeft: -22}}
                    name="chevron-small-right"
                    size={24}
                    color={colorScheme == 'light' ? colors.black : colors.white}
                  />
                )}
              </Pressable>
            </DropdownMenu>

            <View className="mt-3">
              <Text className="text-base text-gray-800 dark:text-white font-normal mb-1.5">
                <Text className="text-red-500">* </Text>
                {t('profile.studySchedule')}
              </Text>
              <TextInput
                multiline={true}
                numberOfLines={12}
                textAlignVertical="top"
                placeholder={t('profile.noteForStudySchedule')}
                placeholderTextColor={colors.grey600}
                className="text-black dark:text-white text-left py-3 px-2.5 border rounded-md text-base"
                onChangeText={text => onChangeProfile('studySchedule', text)}
                style={{
                  borderColor: colors.grey350,
                }}>
                {profile?.studySchedule}
              </TextInput>
            </View>

            <Button
              title={t('profile.saveChanges')}
              onPress={isChange ? handleChangeProfile : undefined}
              style={{
                backgroundColor: colors.primary,
                color: colors.white,
                fontWeight: '500',
                marginTop: 24,
              }}
            />
          </View>
        </View>

        {state.currentUser.type == '' && (
          <ModalPopper visible={isOpenPasswordModal} transparent={true}>
            <ChangePasswordInner toggleModal={setIsOpenPasswordModal} />
          </ModalPopper>
        )}

        <ModalPopper visible={isOpenReviewModal} transparent={true}>
          <ReviewModal
            toggleModal={setIsOpenReviewModal}
            tutorId={profile?.id}
          />
        </ModalPopper>

        <ModalPopper visible={isOpenUploadModal} transparent={true}>
          <View style={{width: '100%'}}>
            <View className="flex-row items-center justify-between">
              <Text className="text-black dark:text-white text-lg font-semibold">
                Upload avatar
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setIsOpenUploadModal(false);
                }}>
                <AntDesign
                  name="close"
                  size={24}
                  color={colorScheme == 'light' ? colors.black : colors.white}
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

            <View
              style={{width: 200, height: 200, marginVertical: 20}}
              className="self-center">
              <Image
                className="w-[160px] h-[160px] self-center rounded-full"
                resizeMode="cover"
                resizeMethod="auto"
                src={avatar?.fileCopyUri}
                style={{
                  borderColor:
                    colorScheme == 'light'
                      ? 'rgba(0,0,0,0.1)'
                      : 'rgba(255,255,255,0.4)',
                  borderWidth: 1,
                }}
                source={{
                  uri:
                    avatar?.fileCopyUri ||
                    'https://sandbox.api.lettutor.com/avatar/f569c202-7bbf-4620-af77-ecc1419a6b28avatar1700296337596.jpg',
                }}
              />
              <TouchableOpacity
                onPress={async () => {
                  try {
                    const pickerResult = await DocumentPicker.pickSingle({
                      presentationStyle: 'fullScreen',
                      copyTo: 'documentDirectory',
                      type: [DocumentPicker.types.images],
                      mode: 'import',
                    });
                    setAvatar({...pickerResult, isChange: true});
                  } catch (e) {
                    handleError(e);
                  }
                }}
                className="bg-blue-500 rounded-full flex justify-center items-center"
                style={{
                  width: 36,
                  height: 36,
                  position: 'absolute',
                  top: '60%',
                  right: 20,
                }}>
                <FontAwesome5 name="pen" size={20} color={colors.white} />
              </TouchableOpacity>
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
                  setIsOpenUploadModal(false);
                }}
                style={{
                  borderColor: colors.primary,
                  color: colors.primary,
                }}
              />
              <Button
                title="Upload"
                onPress={avatar?.isChange ? handleUploadAvatar : undefined}
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
        </ModalPopper>
      </ScrollView>
      <ToastManager
        {...toastConfig}
        width={width - 24}
        style={{
          position: 'absolute',
          top: 50,
          zIndex: 1000,
        }}
      />
      <MessageIcon />
      <CStatusBar type={colorScheme} />
      {loading && (
        <Modal visible={loading} transparent>
          <View
            className="flex-1 justify-center items-center"
            style={{backgroundColor: 'rgba(255,255,255,0.5)'}}>
            <View className="self-center justify-center">
              <ActivityIndicator
                className="mb-2 mt-5"
                size="large"
                color={colors.primary}
              />
              <Text className="text-base font-normal text-black dark:text-white">
                Loading...
              </Text>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Profile;
