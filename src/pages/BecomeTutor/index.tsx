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
import {useGlobalContext} from '@/hooks';
import {addApplication} from '@/store';

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
    hobbies: '',
    qualification: '',
    experience: '',
    oldExperience: '',
    certificate: [],
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

  const handleSubmitApplication = () => {
    const payload = {
      id: 'f569c202-7bbf-4620-af77-ecc1419a6b28',
      generalInfo,
      cv,
      teaching,
      languages,
      video,
    };
    dispatch(addApplication(payload));
  };

  const radioButtons = useMemo(
    () => [
      {
        id: 1, // acts as primary key, should be unique and non-empty string
        label: 'Người mới bắt đầu',
        value: 'option1',
      },
      {
        id: 2,
        label: 'Trung cấp',
        value: 'option2',
      },
      {
        id: 3,
        label: 'Trình độ cao',
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
    <ScrollView>
      <Header />
      <View className="flex-column mt-4 px-2.5">
        <View className="flex-row items-center">
          <Text
            className="bg-blue-500 rounded-full text-white w-8 h-8 text-center leading-8 font-bold"
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
            Complete profile
          </Text>
        </View>
        <View className="flex-row items-center mt-2.5">
          <Text
            className="border border-gray-400 rounded-full w-8 h-8 text-center leading-8"
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
            Video introduction
          </Text>
        </View>
        <View className="flex-row items-center mt-2.5">
          <Text
            className="border border-gray-400 rounded-full w-8 h-8 text-center leading-8"
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
            Approval
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
              Thiết lập hồ sơ gia sư của bạn
            </Text>
            <Text className="text-base text-gray-700 text-justify">
              Hồ sơ gia sư của bạn là cơ hội tiếp cận với học viên trên
              Tutoring. Bạn có thể sửa lại sau tại trang hồ sơ cá nhân.
            </Text>
            <Text className="text-base text-gray-700 mt-4 text-justify">
              Học viên mới có thể duyệt qua hồ sơ gia sư để tìm một gia sư phù
              hợp với mục tiêu học tập và tính cách của họ. Khi một học viên
              quay trở lại họ có thể tìm từ hồ sơ của gia sư người mà sẵn sàng
              cho họ những trải nghiệm tuyệt vời.
            </Text>
          </View>
          <View className="px-2.5 mb-8">
            <View className="flex-row items-center mt-2">
              <View className="h-px bg-gray-300 w-6" />
              <Text className="text-gray-700 text-xl font-bold px-2">
                Thông tin cơ bản
              </Text>
              <View className="ml-2 h-px bg-gray-300 flex-1" />
            </View>
            <Image
              source={images.becomeTutor}
              style={{width: 200, height: 200}}
              className="self-center my-2"
            />
            <Text className="w-2/3 text-center text-black self-center text-base border border-blue-300 p-4 bg-blue-50 rounded-md">
              Vui lòng tải lên một bức ảnh đại diện. Xem hướng dẫn.
            </Text>

            <View className="px-6 mt-2">
              <FormGroup
                title="Tên gia sư"
                placeholder="Nhập tên gia sư của bạn"
                field="fullName"
                value={generalInfo.fullName}
                onChange={handleChangeGeneralInfo}
              />

              <Text className="text-base mb-1 text-black">Tôi đến từ</Text>
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
                    {generalInfo.country?.name || 'Chọn quốc tịch'}
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
                Ngày sinh
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
                      : 'Chọn ngày sinh'}
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
                Học viên sẽ xem thông tin từ hồ sơ của bạn để quyết định nếu bạn
                phù hợp với nhu cầu của họ.
              </Text>
              <Text className="mt-2.5 text-center text-black self-center text-base border border-blue-300 p-4 bg-blue-50 rounded-md">
                Để bảo mật quyền riêng tư của bạn, vui lòng không chia sẻ bất cứ
                thông tin các nhân như email, số điện thoại, skype,... Trong hồ
                sơ của bạn.
              </Text>
              <View>
                <Text className="text-base mb-2 mt-4 text-black">Sở thích</Text>
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
                <Text className="text-base mb-2 mt-4 text-black">Học vấn</Text>
                <TextInput
                  onChangeText={text => {
                    handleChangeCV('qualification', text);
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
                  {cv.qualification}
                </TextInput>
              </View>
              <View>
                <Text className="text-base mb-2 mt-4 text-black">
                  Kinh nghiệm
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
                  Nghề nghiệp hiện tại hoặc trước đây
                </Text>
                <TextInput
                  onChangeText={text => handleChangeCV('oldExperience', text)}
                  multiline={true}
                  numberOfLines={8}
                  textAlignVertical="top"
                  placeholderTextColor={colors.grey500}
                  className="text-black text-left text-base px-3 rounded-md border"
                  style={{
                    borderRadius: 6,
                    borderColor: colors.grey300,
                  }}>
                  {cv.oldExperience}
                </TextInput>
              </View>
              <View>
                <Text className="text-base mb-2 mt-4 text-black">
                  Chứng nhận
                </Text>
              </View>
            </View>

            <View className="px-2.5">
              <View className="flex-row items-center mt-2">
                <View className="h-px bg-gray-300 w-6" />
                <Text className="text-gray-700 text-xl font-bold px-2">
                  Về ngôn ngữ
                </Text>
                <View className="ml-2 h-px bg-gray-300 flex-1" />
              </View>
              <View>
                <Text className="text-base mb-2 mt-4 text-black">
                  Chứng nhận
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
                  Về việc dạy
                </Text>
                <View className="ml-2 h-px bg-gray-300 flex-1" />
              </View>
              <Text className="mt-2.5 text-center text-black self-center text-base border border-blue-300 p-4 bg-blue-50 rounded-md">
                Để bảo mật quyền riêng tư của bạn, vui lòng không chia sẻ bất cứ
                thông tin các nhân như email, số điện thoại, skype,... Trong hồ
                sơ của bạn.
              </Text>
              <Text className="text-base mb-2 mt-4 text-black">Giới thiệu</Text>
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
                Tôi giỏi nhất trong việc dạy những học viên
              </Text>
              <View>
                {radioButtons.map((item, index) => {
                  return (
                    <RadioButton
                      key={String(index)}
                      onPress={() => handleChangeTeaching('skill', item)}
                      id={String(item.id)}
                      label={item.label}
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
                Chuyên ngành của tôi là
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
                      {item.name}
                    </Text>
                  </View>
                );
              })}
              <Text className="text-base text-red-500">
                Vui lòng nhập các chuyên ngành của bạn!
              </Text>
            </View>
            <Button
              title="Tiếp theo"
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
              style={{width: 140, height: 140}}
            />
            <Text className="text-gray-700 text-xl font-bold mt-1">
              Giới thiệu bản thân
            </Text>
            <Text className="text-base text-gray-700 text-justify">
              Hãy để học viên biết những gì họ có thể mong đợi từ khoá học của
              bạn bằng việc quay lại video điểm nhấn về việc dạy, chuyên môn và
              tính cách của bạn. Học viên có thể lo lắng khi nói chuyện với
              người bản xứ, vì vậy sẽ thực sự hữu ích khi có một video thân
              thiện giới thiệu bản thân và mời học viên gọi điện cho bạn.
            </Text>
          </View>
          <View className="px-2.5 mb-8">
            <View className="px-2.5">
              <View className="flex-row items-center mt-2">
                <View className="h-px bg-gray-300 w-6" />
                <Text className="text-gray-700 text-xl font-bold px-2">
                  Video giới thiệu
                </Text>
                <View className="ml-2 h-px bg-gray-300 flex-1" />
              </View>

              <Text className="mt-2.5 text-black self-center text-base border border-blue-300 p-4 bg-blue-50 rounded-md">
                Một số mẹo hữu dụng: {'\n  '}1. Tìm một không gian trong lành và
                yên tĩnh {'\n  '}2. Cười thật tự nhiên, nhìn vào camera {'\n  '}
                3. Ăn mặc lịch sự {'\n  '}4. Nói trong 1-3 phút {'\n  '}5. Brand
                yourself and have fun!
                <Text className="text-red-500">
                  {'\n'}Lưu ý: Chúng tôi chỉ hỗ trợ tải lên video có kích thước
                  nhỏ hơn 64 MB.
                </Text>
              </Text>
            </View>
            <View>
              <Button
                title="Chọn video"
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
                title="Trở lại"
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
                title="Hoàn tất"
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
            Bạn đã hoàn thành đăng ký Vui lòng đợi phê duyệt
          </Text>
          <Button
            title="Trang chủ"
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
