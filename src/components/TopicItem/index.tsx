import {View, Text, TouchableHighlight} from 'react-native';
import React from 'react';
import styles from './styles';
type Props = {
  isActive: boolean;
  onSelect?: () => void;
  data: any;
};

function TopicItem(props: Props) {
  const {data, isActive, onSelect} = props;
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="rgba(0, 0, 0, 0.08)"
      onPress={onSelect}
      style={[styles.touchContainer, isActive && styles.active]}>
      <View style={styles.topicItem}>
        <Text style={styles.topicNo}>{data?.orderCourse + 1}</Text>
        <Text style={styles.topicName}>{data?.name}</Text>
      </View>
    </TouchableHighlight>
  );
}

export default TopicItem;
