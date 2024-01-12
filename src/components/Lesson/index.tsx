import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import styles from './styles';
import {colors} from '@/constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

import {images, languageImages} from '@/assets';
import {getCountryNameFromCode, getDateAgo} from '@/utils';
import {useTranslations} from '@/hooks';
import StackProps from '@/types/type';
import {useColorScheme} from 'nativewind';
type Props = {
  children: any;
  data: any;
  history?: boolean;
  numberOfLesson?: number;
};

const Lesson = (props: Props) => {
  const navigation = useNavigation<StackProps>();
  const {children, data, history, numberOfLesson} = props;
  const {scheduleDetailInfo} = data;
  const {scheduleInfo} = scheduleDetailInfo;
  const {t} = useTranslations();
  const [country, setCountry] = useState<any>({
    flag: undefined,
    name: '',
  });
  const {colorScheme} = useColorScheme();

  useLayoutEffect(() => {
    const getCountry = async () => {
      const res: any = await getCountryNameFromCode(
        scheduleInfo.tutorInfo.country,
      );
      setCountry(res);
    };
    getCountry();
  }, [data]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colorScheme == 'light' ? '#f1f1f1' : colors.black,
          borderColor:
            colorScheme == 'light'
              ? 'rgba(0,0,0,0.05)'
              : 'rgba(255,255,255,0.4)',
        },
      ]}>
      <View style={styles.infoLesson}>
        <View>
          <Text className="text-black dark:text-white font-medium text-lg">
            {new Date(scheduleDetailInfo.startPeriodTimestamp).toDateString()}
          </Text>
          <Text className="text-text dark:text-white text-sm">
            {history === true
              ? getDateAgo(scheduleDetailInfo?.startPeriodTimestamp, Date.now())
              : numberOfLesson == 1
              ? `1 ${t('lesson')}`
              : `${numberOfLesson} consecutive lessons`}
          </Text>
        </View>
        <View className="flex-row items-center">
          <Image
            source={images.defaultAvatar}
            src={scheduleInfo?.tutorInfo?.avatar}
            style={styles.avatar}
          />
          <View>
            <Text className="text-base text-black dark:text-white font-semibold">
              {scheduleInfo.tutorInfo.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 4,
              }}>
              <Image
                source={languageImages.vietNam}
                src={country.flag}
                style={{width: 24, height: 16, marginRight: 4}}
              />
              <Text className="text-sm text-gray-700 dark:text-white">
                {country.name}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Messages');
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AntDesign
                  name="message1"
                  size={16}
                  color={colors.primary}
                  style={{width: 24}}
                />
                <Text
                  numberOfLines={2}
                  style={{fontSize: 14, color: colors.primary, marginLeft: 4}}>
                  {t('message')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={[styles.content]} className="bg-white dark:bg-black">
        {children}
      </View>
    </View>
  );
};

export default Lesson;
