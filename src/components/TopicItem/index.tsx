import {View, Text, TouchableHighlight} from 'react-native';
import React from 'react';
import styles from './styles';
interface TopicProps {
  isActive: boolean;
  onSelect?: () => void;
}
const TopicItem = (props: TopicProps) => {
  const {isActive, onSelect} = props;
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="rgba(0, 0, 0, 0.08)"
      onPress={onSelect}
      style={[styles.touchContainer, isActive && styles.active]}>
      <View style={styles.topicItem}>
        <Text style={styles.topicNo}>1.</Text>
        <Text style={styles.topicName}>The Internet</Text>
      </View>
    </TouchableHighlight>
  );
};

export default TopicItem;
