import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import {colors} from '@/constants';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {images, languageImages} from '@/assets';

const Lesson = (props: any) => {
  const {children} = props;
  return (
    <View style={styles.container}>
      <View style={styles.infoLesson}>
        <View>
          <Text style={styles.meetDate}>Sat, 21 Oct 23</Text>
          <Text style={{fontSize: 14, color: colors.text}}>1 lesson</Text>
        </View>
        <View style={styles.info}>
          <Image source={images.avatar} style={styles.avatar} />
          <View>
            <Text style={styles.name}>Keegan</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 4,
              }}>
              <Image
                source={languageImages.vietNam}
                style={{width: 24, height: 16, marginRight: 4}}
              />
              <Text style={styles.nationality}>Vietname</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <AntDesign name="message1" size={14} color={colors.primary} />
              <Text
                numberOfLines={2}
                style={{fontSize: 14, color: colors.primary, marginLeft: 4}}>
                Message
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={[styles.content]}>{children}</View>
    </View>
  );
};

export default Lesson;
