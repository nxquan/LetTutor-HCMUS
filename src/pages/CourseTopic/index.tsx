import { View, Text, Image, TouchableHighlight } from 'react-native';
import React, { useState } from 'react';
import Header from '@/components/Header';
import styles from './styles';
import { images } from '@/assets';
import { colors } from '@/constants';
import TopicItem from '@/components/TopicItem';

const CourseTopic = () => {
  const [topics, setTopics] = useState([1, 2, 3, 4, 5]);

  return (
    <View>
      <Header />
      <View style={styles.inner}>
        <View style={styles.infoContainer}>
          <Image source={images.courseItem1} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.title}>Life in the Internet Age</Text>
            <Text style={styles.des}>
              Let's discuss how technology is changing the way we live
            </Text>
          </View>
          <View style={styles.topicList}>
            <Text style={styles.topicHeading}>List Topic</Text>
            {topics.map((topic, index) => {
              return <TopicItem isActive={index == 0} key={index} />;
            })}
          </View>
        </View>
        <View style={styles.showPdfContainer}></View>
      </View>
    </View>
  );
};

export default CourseTopic;
