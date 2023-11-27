import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useCallback, useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles';
import {images} from '@/assets';
import FormGroup from '@/components/FormGroup';
import {colors} from '@/constants';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isCancel,
  isInProgress,
  types,
} from 'react-native-document-picker';

import DropdownMenu from '@/components/DropdownMenu';
import {TEST_PREPARATIONS, LEARN_TOPICS} from '@/store/mock-data';
import Header from '@/components/Header';
import Button from '@/components/Button';
import {formatDate} from '@/utils';
import {useGlobalContext} from '@/hooks';
import {changePassword, changeProfile} from '@/store';
import ModalPopper from '@/components/ModalPopper';
import ReviewList from '@/components/ReviewList';

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
    key: 'PREV_INTERMEDIATE',
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
  {
    id: 8,
    title: 'Upper A1 (High Beginner)',
    key: 'HIGH_BEGINNER',
  },
  {
    id: 9,
    title: 'A2 (Pre-Intermediate)',
    key: 'PREV_INTERMEDIATE',
  },
];

const SPECIALTIES = [...LEARN_TOPICS, ...TEST_PREPARATIONS];

const Profile = () => {
  const [state, dispatch] = useGlobalContext();
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  const [isOpenLevelMenu, setIsOpenLevelMenu] = useState(false);
  const [isOpenSpecialtyMenu, setIsOpenSpecialtyMenu] = useState(false);
  const [isOpenPasswordModal, setIsOpenPasswordModal] = useState(false);
  const [isOpenReviewModal, setIsOpenReviewModal] = useState(false);

  const [feedbacks, setFeedbacks] = useState([]);
  const [profile, setProfile] = useState<any>(undefined);
  const [passwordState, setPasswordState] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isChange, setIsChange] = useState(false);
  const [avatar, setAvatar] = React.useState<any>();

  useEffect(() => {
    if (avatar) {
      onChangeProfile('avatar', avatar?.[0]?.fileCopyUri);
    }
  }, [avatar]);

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const {type} = event;
    if (type == 'set') {
      setProfile((prev: any) => {
        const currentDate = selectedDate;
        return {...prev, birthday: currentDate?.toDateString()};
      });

      setIsShowDatePicker(false);
    } else {
      setIsShowDatePicker(false);
    }
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

  const onChangePasswordState = (key: string, value: string) => {
    setPasswordState((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const renderSpecialties = () => {
    if (profile?.testPreparations || profile?.learnTopics) {
      const specialties = [
        ...profile?.testPreparations,
        ...profile?.learnTopics,
      ];
      return specialties.map((item: any) => (
        <View
          key={item.key}
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
            }}>
            <AntDesign
              name="close"
              size={20}
              color="rgba(0,0,0,0.8)"
              style={{marginLeft: 4}}
            />
          </TouchableWithoutFeedback>
        </View>
      ));
    } else {
      return <Text className="text-sm text-gray-800">Select levels</Text>;
    }
  };

  useEffect(() => {
    const userId = 'f569c202-7bbf-4620-af77-ecc1419a6b28';

    const user = state.userInfos.find((item: any) => item?.id === userId);
    if (user) {
      setProfile(user);
    }

    const feedbacks = state.feedbacks.filter(
      (item: any) => item?.secondId === 'f23c4d9f-6043-4cb8-a038-9538a609f5ca',
    );
    setFeedbacks(feedbacks);
  }, [state]);

  const handleSubmit = () => {
    dispatch(changeProfile(profile));
  };

  const handleChangePassword = () => {
    dispatch(
      changePassword({
        currentPassword: passwordState.currentPassword,
        newPassword: passwordState.newPassword,
      }),
    );
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

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[0]}>
      <Header />
      <View
        style={styles.inner}
        className="border border-gray-300 rounded-md mx-4 my-8">
        <View className="flex justify-center px-6 py-4">
          <View style={{width: 140, height: 140}} className="self-center">
            <Image
              className="self-center rounded-full"
              resizeMode="cover"
              resizeMethod="auto"
              source={{
                uri:
                  profile?.avatar ||
                  'https://sandbox.api.lettutor.com/avatar/f569c202-7bbf-4620-af77-ecc1419a6b28avatar1700296337596.jpg',
              }}
              style={{
                width: 140,
                height: 140,
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.1)',
              }}
            />
            <TouchableOpacity
              onPress={async () => {
                try {
                  const pickerResult = await DocumentPicker.pickSingle({
                    presentationStyle: 'fullScreen',
                    copyTo: 'cachesDirectory',
                  });
                  setAvatar([pickerResult]);
                } catch (e) {
                  handleError(e);
                }
              }}
              className="bg-blue-500 rounded-full flex justify-center items-center"
              style={{
                width: 36,
                height: 36,
                position: 'absolute',
                top: '65%',
                right: 5,
              }}>
              <FontAwesome5 name="pen" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
          <Text className="font-bold text-blue-500 text-2xl text-center mt-1">
            Hai pham
          </Text>
          <Text className="text-base text-grey-500 mt-1">
            Account ID: f569c202-7bbf-4620-af77-ecc1419a6b28
          </Text>
          <TouchableOpacity
            onPress={() => setIsOpenReviewModal(true)}
            className="my-1">
            <Text className="text-base text-blue-500 font-medium">
              Others review you
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsOpenPasswordModal(true)}>
            <Text className="text-base text-blue-500 font-medium">
              Change password
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-base text-black font-medium p-3 bg-gray-200">
          Account
        </Text>
        <View className="px-6 pt-6 pb-9">
          <FormGroup
            required={true}
            title="Name"
            field="name"
            value={profile?.name}
            onChange={onChangeProfile}
          />
          <FormGroup
            editable={false}
            title="Email Address"
            field="email"
            value={profile?.email}
            onChange={onChangeProfile}
          />
          <FormGroup
            required
            title="Country"
            field="name"
            value="Hai pham"
            onChange={() => {}}
          />
          <FormGroup
            required
            title="Phone Number"
            type="phone"
            field="phone"
            value={profile?.phone}
            onChange={onChangeProfile}
          />

          <Text className="text-base font-normal text-gray-800">
            <Text className="text-red-500">* </Text>
            Birthday
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
                {profile?.birthday
                  ? formatDate(new Date(profile?.birthday))
                  : 'Select a day'}
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

          <Text className="text-base font-normal text-gray-800 mt-2.5 mb-1.5">
            <Text className="text-red-500">* </Text>
            My Level
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
                <Text className="text-sm text-gray-800">
                  {profile?.level
                    ? LEVELS.find((level: any) => level.key === profile?.level)
                        ?.title
                    : 'Select level'}
                </Text>
              </View>
              {isOpenLevelMenu ? (
                <Entypo name="chevron-small-down" size={24} color="black" />
              ) : (
                <Entypo name="chevron-small-right" size={24} color="black" />
              )}
            </Pressable>
          </DropdownMenu>

          <Text className="text-base font-normal text-gray-800 mt-2.5 mb-1.5">
            <Text className="text-red-500">* </Text>
            Want To Learn
          </Text>
          <DropdownMenu
            isOpen={isOpenSpecialtyMenu}
            data={SPECIALTIES}
            onChangeOpen={setIsOpenSpecialtyMenu}
            onChangeSelected={onChangeProfile}
            selectedItem={null}
            typeOfMenu="learnTopics"
            style={{zIndex: 2}}>
            <Pressable
              onPress={() => setIsOpenSpecialtyMenu(!isOpenSpecialtyMenu)}
              className="flex-row justify-between items-center w-full px-3 py-2.5 rounded-md border"
              style={styles.dropdownMenuBtn}>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  marginLeft: -4,
                  marginTop: -4,
                }}>
                {renderSpecialties()}
              </View>
              {isOpenLevelMenu ? (
                <Entypo
                  name="chevron-small-down"
                  size={24}
                  color="black"
                  style={{marginLeft: -22}}
                />
              ) : (
                <Entypo
                  style={{marginLeft: -22}}
                  name="chevron-small-right"
                  size={24}
                  color="black"
                />
              )}
            </Pressable>
          </DropdownMenu>

          <View className="mt-3">
            <Text className="text-base text-gray-800 font-normal mb-1.5">
              <Text className="text-red-500">* </Text>
              Study Schedule
            </Text>
            <TextInput
              multiline={true}
              numberOfLines={12}
              textAlignVertical="top"
              placeholder="Please let us know details about your problem"
              placeholderTextColor={colors.grey600}
              className="text-black text-left py-3 px-2.5 border rounded-md text-base"
              onChangeText={text => onChangeProfile('studySchedule', text)}
              style={{
                borderColor: colors.grey350,
              }}>
              {profile?.studySchedule}
            </TextInput>
          </View>

          <Button
            title="Save changes"
            onPress={isChange ? handleSubmit : undefined}
            style={{
              backgroundColor: colors.primary,
              color: colors.white,
              fontWeight: '500',
              marginTop: 24,
            }}
          />
        </View>
      </View>
      <ModalPopper visible={isOpenPasswordModal} transparent={true}>
        <View style={{width: '100%'}}>
          <View className="flex-row justify-between items-center">
            <Text className="text-black text-base font-semibold">
              Change password
            </Text>
            <TouchableOpacity
              onPress={() => {
                setIsOpenPasswordModal(false);
              }}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View className="h-px mt-4 bg-gray-300" />
          <View className="w-full pt-3">
            <FormGroup
              required
              title="Mật khẩu cũ"
              type="password"
              field="currentPassword"
              value={passwordState.currentPassword}
              onChange={onChangePasswordState}
            />
            <FormGroup
              required
              title="Mật khẩu mới"
              type="password"
              field="newPassword"
              value={passwordState.newPassword}
              onChange={onChangePasswordState}
            />

            <FormGroup
              required
              title="Nhập lại mật khẩu mới"
              type="password"
              value={passwordState.confirmPassword}
              field="confirmPassword"
              onChange={onChangePasswordState}
              duplicateValue={passwordState.newPassword}
            />
            <View className="flex-row self-end mt-4">
              <Button
                title="Cancel"
                onPress={() => {
                  setIsOpenPasswordModal(false);
                }}
                style={{
                  borderColor: colors.primary,
                  color: colors.primary,
                }}
              />
              <Button
                title="Save"
                onPress={() => {
                  handleChangePassword();
                  setIsOpenPasswordModal(false);
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
        </View>
      </ModalPopper>

      <ModalPopper visible={isOpenReviewModal} transparent={true}>
        <View style={{width: '100%'}}>
          <View className="flex-row justify-between items-center">
            <Text className="text-black text-base font-semibold">
              Others review
            </Text>

            <TouchableOpacity
              onPress={() => {
                setIsOpenReviewModal(false);
              }}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View className="h-px mt-4 bg-gray-300" />
          <View className="w-full pt-3">
            <ReviewList data={feedbacks} ITEMS_PER_PAGE={6} />
          </View>
        </View>
      </ModalPopper>
    </ScrollView>
  );
};

export default Profile;
