import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import styles from './styles';
import { colors } from '../../../../constants/colors';
import { images, languageImages } from '../../../../../assets';
import Button from '../../../../components/Button';

const TutorItem = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Image
            source={images.avatar}
            style={{
              width: 90,
              height: 90,
              alignSelf: 'center',
              borderRadius: 999,
              borderColor: colors.grey300,
              borderWidth: 1,
            }}
          />
          <View style={styles.infoDes}>
            <Text style={{ fontSize: 22, fontWeight: '600', lineHeight: 1.4 * 22 }}>Abby</Text>
            <View style={{ flexDirection: 'row', marginVertical: 5 }}>
              <Image source={languageImages.vietNam} style={{ width: 30, height: 20 }} />
              <Text style={{ marginLeft: 12 }}>Vietnam</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <AntDesign name='star' size={16} color={colors.yellow} />
              <AntDesign name='star' size={16} color={colors.yellow} style={{ marginLeft: 6 }} />
              <AntDesign name='star' size={16} color={colors.yellow} style={{ marginLeft: 6 }} />
              <AntDesign name='star' size={16} color={colors.yellow} style={{ marginLeft: 6 }} />
              <AntDesign name='staro' size={16} color={colors.yellow} />
            </View>
          </View>
        </View>
        <AntDesign name='hearto' size={24} color={colors.primary} />
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginLeft: -12, marginTop: 20 }}>
        <Button
          title='English for kids'
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
          title='English for kids'
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
          title='English for kids'
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

      <Text style={{ marginBottom: 14, fontSize: 14, lineHeight: 20, color: colors.text }}>
        I was teaching English for almost 3 years. I am a Licensed Professional Teacher and a TESOL
        certified, I teach kids, adult and professionals. I make sure my class is students-centered.
        I will help you with your English goal.
      </Text>
      <TouchableOpacity style={styles.bookBtn}>
        <Image source={images.scheduleIcon} />
        <Text style={{ marginLeft: 8, fontSize: 14, fontWeight: '400', color: colors.primary }}>
          Book
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TutorItem;
