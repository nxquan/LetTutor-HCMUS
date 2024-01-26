import {View, Text, Image, TouchableOpacity, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Toast} from 'toastify-react-native';
import styles from './styles';
import {colors} from '@/constants';
import {images, languageImages} from '@/assets';
import Button from '@/components/Button';
import {useNavigation} from '@react-navigation/native';
import StackProps from '@/types/type';
import {LEARN_TOPICS, TEST_PREPARATIONS} from '@/store/mock-data';
import {useTranslations} from '@/hooks';
import RenderRating from '@/components/RenderRating';
import * as tutorService from '@/services/tutorService';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useColorScheme} from 'nativewind';

type Props = {
  data: any;
  onAddFavorite: (tutorId: string, isFavorite?: boolean) => void;
};

const TutorItem = (props: Props) => {
  const {colorScheme} = useColorScheme();
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
            activeOpacity={1}
            onPress={() => {}}
            style={{
              color: colors.primary,
              backgroundColor:
                colorScheme == 'light' ? colors.backgroundActive : colors.white,
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
              activeOpacity={1}
              onPress={() => {}}
              style={{
                color: colors.primary,
                backgroundColor:
                  colorScheme == 'light'
                    ? colors.backgroundActive
                    : colors.white,
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
    const res = await tutorService.addFavoriteTutor({
      tutorId: data?.id,
    });
    if (res.success) {
      if (res.data.result != 1) {
        onAddFavorite(data?.id, true);
      } else {
        onAddFavorite(data?.id);
      }
    }
  };

  return (
    <View
      style={styles.wrapper}
      className="bg-white dark:bg-black border-gray-200 dark:border-white">
      <View className="flex-row justify-between">
        <Pressable
          onPress={() => {
            navigation.navigate('TutorDetail', {tutorId: data.id});
          }}>
          <View className="flex-row">
            <Image
              source={images.defaultAvatar}
              src={
                data?.avatar !=
                'https://www.alliancerehabmed.com/wp-content/uploads/icon-avatar-default.png'
                  ? data?.avatar
                  : null
              }
              className="w-20 h-20 self-center rounded-full border"
              style={{
                borderColor: colors.grey300,
              }}
            />

            <View className="flex-col ml-3 pr-8">
              <Text style={styles.name} className="text-black dark:text-white">
                {data?.name}
              </Text>
              <View className="flex-row items-center mx-1.5">
                <Image
                  source={languageImages.vietNam}
                  src={country.flag}
                  className="w-6 h-4"
                />
                <Text className="text-text dark:text-white ml-1.5">
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

      <Text className="text-text text-justify text-sm mb-3.5 leading-5 dark:text-white">
        {data?.bio}
      </Text>
      <TouchableOpacity
        style={styles.bookBtn}
        onPress={() => navigation.navigate('TutorDetail', {tutorId: data.id})}>
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
