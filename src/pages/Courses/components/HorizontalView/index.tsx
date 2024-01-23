import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState, useCallback, useRef} from 'react';
import {Icon} from '@rneui/themed';

import styles from './styles';
import {useColorScheme} from 'nativewind';
import CourseItem from '../CourseItem';

type Props = {
  category: any;
  courses: any[];
};

const HorizontalView = (props: Props) => {
  const {category, courses} = props;
  const {colorScheme} = useColorScheme();
  const [currentPositionScroll, setCurrentPositionScroll] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const childRef = useRef<any>(null);

  const handlePreviousAction = () => {
    scrollViewRef.current?.scrollTo({
      x: currentPositionScroll - 280 > 0 ? currentPositionScroll - 280 : 0,
      y: 0,
      animated: true,
    });
  };
  const handleNextAction = () => {
    scrollViewRef.current?.scrollTo({
      x: currentPositionScroll + 280 > 0 ? currentPositionScroll + 280 : 0,
      y: 0,
      animated: true,
    });
  };

  return (
    <View style={styles.courseSection} key={category?.id}>
      <Text style={styles.courseHeading} className="text-black dark:text-white">
        {category?.title}
      </Text>
      <View className="flex-row">
        {courses.length > 1 && (
          <TouchableOpacity
            onPress={() => {
              handlePreviousAction();
            }}
            style={{
              position: 'absolute',
              zIndex: 50,
              left: -12,
              top: '50%',
            }}>
            <Icon
              type="antdesign"
              name="leftcircleo"
              size={36}
              color={
                colorScheme == 'light'
                  ? 'rgba(0,0,0,0.6)'
                  : 'rgba(255,255,255,0.9)'
              }
            />
          </TouchableOpacity>
        )}

        <ScrollView
          onScroll={e => {
            setCurrentPositionScroll(e.nativeEvent.contentOffset.x);
          }}
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}>
          <View style={styles.courseList} ref={childRef}>
            {courses.map((item: any) => (
              <CourseItem key={item.id} data={item} />
            ))}
          </View>
        </ScrollView>
        {courses.length > 1 && (
          <TouchableOpacity
            onPress={() => {
              handleNextAction();
            }}
            style={{
              position: 'absolute',
              zIndex: 50,
              right: -12,
              top: '50%',
            }}>
            <Icon
              type="antdesign"
              name="rightcircleo"
              size={36}
              color={
                colorScheme == 'light'
                  ? 'rgba(0,0,0,0.6)'
                  : 'rgba(255,255,255,0.9)'
              }
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default HorizontalView;
