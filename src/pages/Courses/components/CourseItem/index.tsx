import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import StackProps from '@/types/type';
import {useNavigation} from '@react-navigation/native';

type Props = {
  data: any;
};

const levels = [
  {
    id: 0,
    title: 'Any Level',
    key: '',
  },
  {
    id: 1,
    title: 'Beginner',
    key: '',
  },
  {
    id: 2,
    title: 'Upper-Beginner',
    key: '',
  },
  {
    id: 3,
    title: 'Pre-Intermediate',
    key: '',
  },
  {
    id: 4,
    title: 'Intermediate',
    key: '',
  },
  {
    id: 5,
    title: 'Upper-Intermediate',
    key: '',
  },
  {
    id: 6,
    title: 'Pre-advanced',
    key: '',
  },
  {
    id: 7,
    title: 'Advanced',
    key: '',
  },
  {
    id: 8,
    title: 'Very Advanced',
    key: '',
  },
];

const CourseItem = (props: Props) => {
  const {data} = props;
  const navigation = useNavigation<StackProps>();

  const getLevelName = (level: number) => {
    return levels.find((item: any) => item.id === Number(level))?.title;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('CourseDetail', {courseId: data.id})}>
      <Image source={{uri: data.imageUrl}} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{data.name}</Text>
        <Text style={styles.des}>{data.description}</Text>
        <Text style={styles.addition}>
          {getLevelName(data.level)} - {data.topics.length} Lessons
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CourseItem;
