import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import {colors} from '@/constants';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {images} from '@/assets';
import {getCountryNameFromCode} from '@/utils';
type Props = {
  children: any;
  data: any;
};

const Lesson = (props: Props) => {
  const {children, data} = props;
  const {scheduleDetailInfo} = data;
  const {scheduleInfo} = scheduleDetailInfo;

  return (
    <View style={styles.container}>
      <View style={styles.infoLesson}>
        <View>
          <Text style={styles.meetDate}>
            {new Date(scheduleDetailInfo.startPeriodTimestamp).toDateString()}
          </Text>
          <Text style={{fontSize: 14, color: colors.text}}>1 lesson</Text>
        </View>
        <View style={styles.info}>
          <Image
            source={{uri: scheduleInfo.tutorInfo.avatar}}
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
                source={{
                  uri: `https://flagsapi.com/${scheduleInfo.tutorInfo.country}/flat/64.png`,
                }}
                style={{width: 24, height: 16, marginRight: 4}}
              />
              <Text className="text-sm text-gray-700">
                {getCountryNameFromCode(scheduleInfo.tutorInfo.country)}
              </Text>
            </View>
            <TouchableOpacity onPress={() => {}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AntDesign name="message1" size={14} color={colors.primary} />
                <Text
                  numberOfLines={2}
                  style={{fontSize: 14, color: colors.primary, marginLeft: 4}}>
                  Message
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
