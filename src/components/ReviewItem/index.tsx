import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import {images} from '@/assets';
import RenderRating from '@/components/RenderRating';
import {getDateAgo} from '@/utils';

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
        <Text style={styles.name} className="text-text dark:text-white">
          {data?.firstInfo?.name}
        </Text>
        <View style={styles.stars}>
          <RenderRating rating={data?.rating} size={16} />
          <Text
            style={{color: 'rgba(0,0,0,0.4)', fontSize: 13, marginLeft: 12}}>
            {getDateAgo(new Date(data.createdAt).getTime(), Date.now())}
          </Text>
        </View>
        {data?.content && (
          <Text
            style={styles.description}
            className="text-black dark:text-white">
            {data?.content}
          </Text>
        )}
      </View>
    </View>
  );
};

export default ReviewItem;
