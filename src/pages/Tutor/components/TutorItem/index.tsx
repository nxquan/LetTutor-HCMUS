import {View, Text, Image, TouchableOpacity, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import {colors} from '@/constants';
import {images, languageImages} from '@/assets';
import Button from '@/components/Button';
import {useNavigation} from '@react-navigation/native';
import StackProps from '@/types/type';
import {LEARN_TOPICS, TEST_PREPARATIONS} from '@/store/mock-data';
import {useGlobalContext, useTranslations} from '@/hooks';
import {toggleFavoriteTutor} from '@/store';
import RenderRating from '@/components/RenderRating';
import * as tutorService from '@/services/tutorService';
import EncryptedStorage from 'react-native-encrypted-storage';

type Props = {
  data: any;
  onAddFavorite: (tutorId: string) => void;
};

const TutorItem = (props: Props) => {
  const {data, onAddFavorite} = props;
  const navigation = useNavigation<StackProps>();
  const {t} = useTranslations();
  const [country, setCountry] = useState({
    flag: undefined,
    name: '',
  });

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
              paddingVertical: 4,
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
                paddingVertical: 4,
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

  useEffect(() => {
    const getCountryFromCode = async (code: string) => {
      const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
      const data = await res.json();
      if (data) {
        setCountry({
          name: data?.[0]?.name?.common,
          flag: data?.[0]?.flags?.png,
        });
      }
    };
    getCountryFromCode(data?.country);
  }, [data]);

  const handleAddFavorite = async () => {
    const session: any = await EncryptedStorage.getItem('user_session');

    const res = await tutorService.addFavoriteTutor(
      {
        tutorId: data?.id,
      },
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(session).accessToken}`,
        },
      },
    );
    if (res.success) {
      onAddFavorite(data?.id);
    }
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
              src={
                data?.avatar !=
                'https://www.alliancerehabmed.com/wp-content/uploads/icon-avatar-default.png'
                  ? data?.avatar
                  : null
              }
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
                  src={country.flag}
                  style={{width: 24, height: 16}}
                />
                <Text style={styles.nationality}>
                  {country?.name && 'Vietnam'}
                </Text>
              </View>
              <RenderRating rating={data?.rating} size={14} />
            </View>
          </View>
        </Pressable>

        <TouchableOpacity
          onPress={() => {
            handleAddFavorite();
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
