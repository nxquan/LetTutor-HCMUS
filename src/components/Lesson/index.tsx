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
type Props = {
  children: any;
  data: any;
  history?: boolean;
};

const Lesson = (props: Props) => {
  const navigation = useNavigation<StackProps>();
  const {children, data, history} = props;
  const {scheduleDetailInfo} = data;
  const {scheduleInfo} = scheduleDetailInfo;
  const {t} = useTranslations();
  const [country, setCountry] = useState<any>({
    flag: undefined,
    name: '',
  });

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
    <View style={styles.container}>
      <View style={styles.infoLesson}>
        <View>
          <Text style={styles.meetDate}>
            {new Date(scheduleDetailInfo.startPeriodTimestamp).toDateString()}
          </Text>
          <Text style={{fontSize: 14, color: colors.text}}>
            {history === true
              ? getDateAgo(scheduleDetailInfo?.startPeriodTimestamp, Date.now())
              : t('lesson')}
          </Text>
        </View>
        <View style={styles.info}>
          <Image
            source={images.defaultAvatar}
            src={scheduleInfo?.tutorInfo?.avatar}
            style={styles.avatar}
          />
          <View>
            <Text className="text-base text-black font-semibold">
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
              <Text className="text-sm text-gray-700">{country.name}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Message');
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

      <View style={[styles.content]}>{children}</View>
    </View>
  );
};

export default Lesson;
