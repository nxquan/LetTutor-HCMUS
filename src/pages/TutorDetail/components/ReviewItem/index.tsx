import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import {images} from '@/assets';
import RenderRating from '@/components/RenderRating';

type Props = {
  data: any;
};

const ReviewItem = (props: Props) => {
  const {data} = props;

  return (
    <View style={styles.container}>
      <Image
        source={images.defaultAvatar}
        src={data?.firstInfo?.avatar}
        style={styles.avatar}
      />
      <View style={styles.info}>
        <Text style={styles.name}>
          {data?.firstInfo?.name}
          {'   '}
        </Text>
        <Text style={{color: '#ccc', fontSize: 13}}>
          {new Date(data?.updatedAt).getMonth() + 1} months ago
        </Text>
        <View style={styles.stars}>
          <RenderRating rating={data?.rating} size={16} />
        </View>
        <Text style={styles.description}>{data?.content}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
