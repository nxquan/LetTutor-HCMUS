import { View, Text, Image } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { images } from '@/assets';
import { colors } from '@/constants';

type Props = {
  name: string;
  time: string;
  stars: number;
  description: string;
};

const ReviewItem = (props: Props) => {
  const { name, time, stars, description } = props;

  return (
    <View style={styles.container}>
      <Image source={images.avatar} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>
          {name}
          {'   '}
          <Text style={{ color: '#ccc', fontSize: 13 }}>{time}</Text>
        </Text>
        <View style={styles.stars}>
          <AntDesign name='star' size={16} color={colors.yellow} />
          <AntDesign name='star' size={16} color={colors.yellow} />
          <AntDesign name='star' size={16} color={colors.yellow} />
          <AntDesign name='star' size={16} color={colors.yellow} />
          <AntDesign name='staro' size={16} color={colors.yellow} />
        </View>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
