import {View, Text, Image, TouchableOpacity, Pressable} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import styles from './styles';
import {colors} from '@/constants';
import {images, languageImages} from '@/assets';
import Button from '@/components/Button';
import {useNavigation} from '@react-navigation/native';
import {DrawerProps} from '@/global/type';

const TutorItem = () => {
  const navigation = useNavigation<DrawerProps>();
  const [isLikeHeart, setIsLikeHeart] = useState(false);

  return (
    <View style={styles.wrapper}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Pressable
          onPress={() => {
            navigation.navigate('TutorDetail');
          }}>
          <View style={styles.info}>
            <Image
              source={images.avatar}
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
              <Text style={styles.name}>Abby</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 5,
                }}>
                <Image
                  source={languageImages.vietNam}
                  style={{width: 24, height: 16}}
                />
                <Text style={styles.nationality}>Vietnam</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <AntDesign name="star" size={14} color={colors.yellow} />
                <AntDesign
                  name="star"
                  size={14}
                  color={colors.yellow}
                  style={{marginLeft: 6}}
                />
                <AntDesign
                  name="star"
                  size={14}
                  color={colors.yellow}
                  style={{marginLeft: 6}}
                />
                <AntDesign
                  name="star"
                  size={14}
                  color={colors.yellow}
                  style={{marginLeft: 6}}
                />
                <AntDesign
                  name="staro"
                  size={14}
                  color={colors.yellow}
                  style={{marginLeft: 6}}
                />
              </View>
            </View>
          </View>
        </Pressable>

        <TouchableOpacity onPress={() => setIsLikeHeart(!isLikeHeart)}>
          {isLikeHeart ? (
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
        <Button
          title="English for kids"
          style={{
            color: colors.primary,
            backgroundColor: colors.backgroundActive,
            paddingVertical: 8,
            paddingHorizontal: 12,
            marginBottom: 8,
            borderRadius: 999,
            marginLeft: 12,
          }}
        />
        <Button
          title="English for kids"
          style={{
            color: colors.primary,
            backgroundColor: colors.backgroundActive,
            paddingVertical: 8,
            paddingHorizontal: 12,
            marginBottom: 8,
            borderRadius: 999,
            marginLeft: 12,
          }}
        />
        <Button
          title="English for kids"
          style={{
            color: colors.primary,
            backgroundColor: colors.backgroundActive,
            paddingVertical: 8,
            paddingHorizontal: 12,
            marginBottom: 8,
            borderRadius: 999,
            marginLeft: 12,
          }}
        />
      </View>

      <Text
        style={{
          marginBottom: 14,
          fontSize: 14,
          lineHeight: 20,
          color: colors.text,
        }}>
        I was teaching English for almost 3 years. I am a Licensed Professional
        Teacher and a TESOL certified, I teach kids, adult and professionals. I
        make sure my class is students-centered. I will help you with your
        English goal.
      </Text>
      <TouchableOpacity style={styles.bookBtn}>
        <Image source={images.scheduleIcon} />
        <Text
          style={{
            marginLeft: 8,
            fontSize: 14,
            fontWeight: '400',
            color: colors.primary,
          }}>
          Book
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TutorItem;
