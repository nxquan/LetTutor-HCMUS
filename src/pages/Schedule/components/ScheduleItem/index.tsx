import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import React, { useState } from 'react';
import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';

import styles from './styles';
import { images, languageImages } from '@/assets';
import { colors } from '@/constants';

const index = () => {
  const [isOpenRequest, setIsOpenRequest] = useState(true);

  const toggleOpenRequest = () => {
    setIsOpenRequest(!isOpenRequest);
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoLesson}>
        <View>
          <Text style={styles.meetDate}>Sat, 21 Oct 23</Text>
          <Text style={{ fontSize: 14, color: colors.text }}>1 lesson</Text>
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
              }}
            >
              <Image
                source={languageImages.vietNam}
                style={{ width: 24, height: 16, marginRight: 4 }}
              />
              <Text style={styles.nationality}>Vietname</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <AntDesign name='message1' size={14} color={colors.primary} />
              <Text
                style={{ fontSize: 14, color: colors.primary, marginLeft: 4 }}
              >
                Direct Message
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.requestContainer}>
        <View style={styles.requestHeader}>
          <Text style={{ fontSize: 16, fontWeight: '500' }}>01:00 - 01:25</Text>
          <TouchableOpacity style={styles.cancelBtn}>
            <MaterialIcons
              name='cancel-presentation'
              size={18}
              color={colors.error}
            />
            <Text style={{ marginLeft: 4, color: colors.error }}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.requestTime}>
            <TouchableOpacity
              onPress={() => toggleOpenRequest()}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Entypo name='chevron-small-right' size={24} color='black' />
              {/* <Entypo name='chevron-small-down' size={24} color='black' /> */}
              <Text style={{ fontSize: 14 }}>Request for lesson</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.requestBtn}>Edit Request</Text>
            </TouchableOpacity>
          </View>
          {isOpenRequest && (
            <View style={{ paddingHorizontal: 12, marginTop: 8 }}>
              <Text style={styles.requestText}>
                Currently there are no requests for this class. Please write
                down any requests for the teacher.
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default index;
