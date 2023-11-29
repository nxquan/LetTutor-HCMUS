import {View, Text, Image, TouchableOpacity, Pressable} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import {colors} from '@/constants';
import {images, languageImages} from '@/assets';
import Button from '@/components/Button';
import {useNavigation} from '@react-navigation/native';
import StackProps from '@/types/type';
import {getCountryNameFromCode} from '@/utils';
import {LEARN_TOPICS, TEST_PREPARATIONS} from '@/store/mock-data';
import {useGlobalContext, useTranslations} from '@/hooks';
import {toggleFavoriteTutor} from '@/store';
import RenderRating from '@/components/RenderRating';

type Props = {
  data: any;
};

const TutorItem = (props: Props) => {
  const {data} = props;
  const navigation = useNavigation<StackProps>();
  const [state, dispatch] = useGlobalContext();
  const {t} = useTranslations();

  const renderSpecialties = () => {
    const _specialties = String(data?.specialties).split(',');
    const specialties: any = [];
    _specialties.forEach(key => {
      //Check in LEARN_TOPICS
      const topic = LEARN_TOPICS.find((_topic: any) => _topic.key === key);
      if (topic) {
        specialties.push(
          <Button
            key={topic.key}
            title={t(topic.key)}
            style={{
              color: colors.primary,
              backgroundColor: colors.backgroundActive,
              paddingVertical: 8,
              paddingHorizontal: 12,
              marginBottom: 8,
              borderRadius: 999,
              marginLeft: 12,
            }}
          />,
        );
      } else {
        //Check in TEST_PREPARATIONS
        const testItem = TEST_PREPARATIONS.find(
          (_topic: any) => _topic.key === key,
        );
        if (testItem) {
          specialties.push(
            <Button
              key={testItem.key}
              title={t(testItem.key)}
              style={{
                color: colors.primary,
                backgroundColor: colors.backgroundActive,
                paddingVertical: 8,
                paddingHorizontal: 12,
                marginBottom: 8,
                borderRadius: 999,
                marginLeft: 12,
              }}
            />,
          );
        }
      }
    });

    return specialties;
  };
  return (
    <View style={styles.wrapper}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Pressable
          onPress={() => {
            navigation.navigate('TutorDetail', {tutorId: data.id});
          }}>
          <View style={styles.info}>
            <Image
              source={images.defaultAvatar}
              src={data?.avatar}
              style={{
                width: 80,
                height: 80,
                alignSelf: 'center',
                borderRadius: 999,
                borderColor: colors.grey300,
                borderWidth: 1,
              }}
            />

            <View style={styles.infoDes}>
              <Text style={styles.name}>{data?.name}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 5,
                }}>
                <Image
                  source={languageImages.vietNam}
                  src={`https://flagsapi.com/${data?.country}/flat/64.png`}
                  style={{width: 24, height: 16}}
                />
                <Text style={styles.nationality}>
                  {getCountryNameFromCode(data?.country)}
                </Text>
              </View>
              <RenderRating rating={data?.rating} size={14} />
            </View>
          </View>
        </Pressable>

        <TouchableOpacity
          onPress={() => {
            const payload: any = {
              tutorId: data?.id,
            };
            dispatch(toggleFavoriteTutor(payload));
          }}>
          {data?.isFavoriteTutor ? (
            <AntDesign name="heart" size={24} color={colors.heart} />
          ) : (
            <AntDesign name="hearto" size={24} color={colors.primary} />
          )}
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginLeft: -12,
          marginTop: 20,
        }}>
        {renderSpecialties()}
      </View>

      <Text
        style={{
          marginBottom: 14,
          fontSize: 14,
          lineHeight: 20,
          color: colors.text,
          textAlign: 'justify',
        }}>
        {data?.bio}
      </Text>
      <TouchableOpacity
        style={styles.bookBtn}
        onPress={() => navigation.navigate('TutorDetail')}>
        <Image source={images.scheduleIcon} />
        <Text
          style={{
            marginLeft: 8,
            fontSize: 14,
            fontWeight: '400',
            color: colors.primary,
          }}>
          {t('tutor.book')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TutorItem;
