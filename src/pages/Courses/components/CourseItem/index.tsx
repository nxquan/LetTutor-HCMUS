import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './styles';
import { images } from '@/assets';

const CourseItem = (props: any) => {
  const { src } = props;
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={src} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>Life in the Internet Age</Text>
        <Text style={styles.des}>
          Let's discuss how technology is changing the way we live
        </Text>
        <Text style={styles.addition}>Intermediate - 9 Lessons</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CourseItem;
