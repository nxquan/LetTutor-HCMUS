import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import styles from './styles';
import Header from '@/components/Header';
import {images} from '@/assets';
import {colors} from '@/constants';
import {DrawerActions, useNavigation, useRoute} from '@react-navigation/native';
import StackProps, {DrawerProps} from '@/types/type';
import DrawerButton from '@/components/DrawerButton';
import BackButton from '@/components/BackButton';
import {useGlobalContext, useTranslations} from '@/hooks';

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

const CourseDetail = (props: any) => {
  const {} = props;

  const {t} = useTranslations();
  const [state, dispatch] = useGlobalContext();
  const navigation = useNavigation<DrawerProps>();
  const route: any = useRoute();
  const [course, setCourse] = useState<any>({});

  useEffect(() => {
    const _course = state.courses.find(
      (item: any) => item.id === route.params?.courseId,
    );
    const topics = _course?.topics.sort(
      (a: any, b: any) => a.orderCourse - b.orderCourse,
    );

    setCourse({
      ..._course,
      topics,
    });
  }, [route.params?.courseId]);

  const getLevelName = (level: number) => {
    return levels.find((item: any) => item.id === Number(level))?.title;
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[0]}
      style={styles.container}>
      <Header drawerBtn={<DrawerButton />} backIcon={<BackButton />} />
      <View style={styles.inner}>
        <View style={styles.intro}>
          <Image
            source={{
              uri:
                course?.imageUrl ||
                'https://camblycurriculumicons.s3.amazonaws.com/5e0e8b212ac750e7dc9886ac?h=d41d8cd98f00b204e9800998ecf8427e',
            }}
            style={styles.image}
          />
          <View style={styles.info}>
            <Text style={styles.title}>{course?.name}</Text>
            <Text style={styles.des}>{course?.description}</Text>
            <TouchableOpacity
              style={styles.discoverBtn}
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('CourseTopic', {
                  course: course,
                  selectedTopic: undefined,
                });
              }}>
              <Text style={{fontSize: 16, color: colors.white}}>
                {t('discover')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.detail}>
          <View style={styles.detailContent}>
            <View style={styles.detailHeading}>
              <Text style={styles.heading}>{t('courseDetail.overview')}</Text>
              <View style={styles.line} />
            </View>
            <View style={styles.detailItem}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AntDesign
                  name="questioncircleo"
                  size={18}
                  color={colors.error}
                />
                <Text style={styles.detailItemHeading}>
                  {t('courseDetail.question1')}
                </Text>
              </View>
              <Text style={styles.detailItemText}>{course?.reason}</Text>
            </View>
            <View style={styles.detailItem}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AntDesign
                  name="questioncircleo"
                  size={18}
                  color={colors.error}
                />
                <Text style={styles.detailItemHeading}>
                  {t('courseDetail.question2')}
                </Text>
              </View>
              <Text style={styles.detailItemText}>{course?.purpose}</Text>
            </View>
          </View>
          <View style={styles.detailContent}>
            <View style={styles.detailHeading}>
              <Text style={styles.heading}>
                {t('courseDetail.experienceLevel')}
              </Text>
              <View style={styles.line}></View>
            </View>
            <View style={styles.detailItem}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AntDesign
                  name="addusergroup"
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.detailItemHeading}>
                  {getLevelName(course?.level)}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.detailContent}>
            <View style={styles.detailHeading}>
              <Text style={styles.heading}>
                {t('courseDetail.courseLength')}
              </Text>
              <View style={styles.line}></View>
            </View>
            <View style={styles.detailItem}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AntDesign name="book" size={18} color={colors.primary} />
                <Text style={styles.detailItemHeading}>
                  {course?.topics?.length} {t('topics')}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.detailContent}>
            <View style={styles.detailHeading}>
              <Text style={styles.heading}>{t('courseDetail.listTopics')}</Text>
              <View style={styles.line}></View>
            </View>
            <View style={[styles.detailItem]}>
              {course?.topics?.map((topic: any) => {
                return (
                  <TouchableOpacity
                    key={topic.id}
                    style={styles.topicItem}
                    activeOpacity={0.7}
                    onPress={() =>
                      navigation.navigate('CourseTopic', {
                        course: course,
                        selectedTopic: topic,
                      })
                    }>
                    <Text style={[styles.detailItemHeading, styles.topic]}>
                      {topic?.orderCourse + 1}. {topic?.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={styles.detailContent}>
            <View style={styles.detailHeading}>
              <Text style={styles.heading}>
                {t('courseDetail.suggestedTutors')}
              </Text>
              <View style={styles.line} />
            </View>
            <View style={styles.detailItem}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AntDesign name="link" size={18} color={colors.primary} />
                <Text style={[styles.detailItemHeading]}>Keegan</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('TutorDetail')}>
                  <Text
                    style={{
                      color: colors.primary,
                      fontSize: 14,
                      fontWeight: '400',
                      marginLeft: 6,
                    }}>
                    More info
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default CourseDetail;
