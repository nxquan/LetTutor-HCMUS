import {View, Text, TouchableHighlight} from 'react-native';
import React from 'react';
import styles from './styles';
import {useColorScheme} from 'nativewind';
type Props = {
  isActive: boolean;
  onSelect?: () => void;
  data: any;
};

function TopicItem(props: Props) {
  const {data, isActive, onSelect} = props;
  const {colorScheme} = useColorScheme();
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor={
        colorScheme == 'light'
          ? 'rgba(0, 0, 0, 0.08)'
          : 'rgba(255, 255, 255, 0.3)'
      }
      onPress={onSelect}
      style={[
        styles.touchContainer,
        isActive && {
          backgroundColor:
            colorScheme == 'light'
              ? 'rgba(0, 0, 0, 0.08)'
              : 'rgba(255, 255, 255, 0.3)',
        },
      ]}>
      <View style={styles.topicItem}>
        <Text className="text-black dark:text-white" style={styles.topicNo}>
          {data?.orderCourse + 1}
        </Text>
        <Text className="text-black dark:text-white" style={styles.topicName}>
          {data?.name}
        </Text>
      </View>
    </TouchableHighlight>
  );
}

export default TopicItem;
