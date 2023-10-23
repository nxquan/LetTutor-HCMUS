import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';

import styles from './styles';
import Header from '@/components/Header';
import CourseItem from '../CourseItem';
import { images } from '@/assets';
import { colors } from '@/constants';

const CourseDetail = (props: any) => {
  const {} = props;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Header />
      <View style={styles.inner}>
        <View style={styles.intro}>
          <Image source={images.courseItem1} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.title}>Life in the Internet Age</Text>
            <Text style={styles.des}>
              Let's discuss how technology is changing the way we live
            </Text>
            <TouchableOpacity style={styles.discoverBtn} activeOpacity={0.7}>
              <Text style={{ fontSize: 16, color: colors.white }}>
                Discover
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.detail}>
          <View style={styles.detailContent}>
            <View style={styles.detailHeading}>
              <Text style={styles.heading}>Overview</Text>
              <View style={styles.line}></View>
            </View>
            <View>
              <View style={styles.detailItem}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <AntDesign
                    name='questioncircleo'
                    size={18}
                    color={colors.error}
                  />
                  <Text style={styles.detailItemHeading}>
                    Why take this course
                  </Text>
                </View>
                <Text style={styles.detailItemText}>
                  Our world is rapidly changing thanks to new technology, and
                  the vocabulary needed to discuss modern life is evolving
                  almost daily. In this course you will learn the most
                  up-to-date terminology from expertly crafted lessons as well
                  from your native-speaking tutor.
                </Text>
              </View>
              <View style={styles.detailItem}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <AntDesign
                    name='questioncircleo'
                    size={18}
                    color={colors.error}
                  />
                  <Text style={styles.detailItemHeading}>
                    What will you be able to do
                  </Text>
                </View>
                <Text style={styles.detailItemText}>
                  You will learn vocabulary related to timely topics like remote
                  work, artificial intelligence, online privacy, and more. In
                  addition to discussion questions, you will practice
                  intermediate level speaking tasks such as using data to
                  describe trends.
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.detailContent}>
            <View style={styles.detailHeading}>
              <Text style={styles.heading}>Experience Level</Text>
              <View style={styles.line}></View>
            </View>
            <View style={styles.detailItem}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AntDesign
                  name='addusergroup'
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.detailItemHeading}>Intermediate</Text>
              </View>
            </View>
          </View>
          <View style={styles.detailContent}>
            <View style={styles.detailHeading}>
              <Text style={styles.heading}>Course Length</Text>
              <View style={styles.line}></View>
            </View>
            <View style={styles.detailItem}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AntDesign name='book' size={18} color={colors.primary} />
                <Text style={styles.detailItemHeading}>9 topics</Text>
              </View>
            </View>
          </View>
          <View style={styles.detailContent}>
            <View style={styles.detailHeading}>
              <Text style={styles.heading}>List Topics</Text>
              <View style={styles.line}></View>
            </View>
            <View style={[styles.detailItem]}>
              <TouchableOpacity style={styles.topicItem} activeOpacity={0.7}>
                <Text style={[styles.detailItemHeading, styles.topic]}>
                  1. Internet
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.topicItem} activeOpacity={0.7}>
                <Text style={[styles.detailItemHeading, styles.topic]}>
                  2. Internet
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.topicItem} activeOpacity={0.7}>
                <Text style={[styles.detailItemHeading, styles.topic]}>
                  3. Internet
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.detailContent}>
            <View style={styles.detailHeading}>
              <Text style={styles.heading}>Suggested Tutors</Text>
              <View style={styles.line}></View>
            </View>
            <View style={styles.detailItem}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AntDesign name='link' size={18} color={colors.primary} />
                <Text style={[styles.detailItemHeading]}>
                  Keegan
                  <Text
                    style={{
                      marginLeft: 10,
                      color: colors.primary,
                      fontWeight: '400',
                    }}
                  >
                    {' '}
                    More info
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default CourseDetail;
