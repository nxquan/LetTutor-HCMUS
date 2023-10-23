import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { EvilIcons, Entypo } from '@expo/vector-icons';

import Header from '@/components/Header';
import styles from './styles';
import { images } from '@/assets';
import { colors } from '@/constants';
import DropDownMenu from '@/components/DropdownMenu';
import CourseItem from './components/CourseItem';

const levels = [
  'Any Level',
  'Beginner',
  'Upper-Beginner',
  'Pre-Intermediate',
  'Intermediate',
  'Upper-Intermediate',
  'Pre-advanced',
  'Advanced',
  'Very advanced',
];

const categories = [
  'For studying abroad',
  'English for Traveling',
  'Conversational English',
  'English for Beginners',
  'Business English',
  'STARTERS',
  'English for kids',
  'PET',
  'KET',
  'MOVERS',
  'FLYERS',
  'TOEFL',
  'TOEIC',
  'IELTS',
];
interface SearchState {
  levels: [];
  categories: [];
  sortByLevel: string;
  courseName: string;
}

const sorts = ['Level descending', 'Level ascending'];
const Courses = () => {
  const [isOpenLevelMenu, setIsOpenLevelMenu] = useState(false);
  const [isOpenCategoryMenu, setIsOpenCategoryMenu] = useState(false);
  const [isOpenSortMenu, setIsOpenSortMenu] = useState(false);

  const [searchValue, setSearchValue] = useState<SearchState>({
    levels: [],
    categories: [],
    sortByLevel: '',
    courseName: '',
  });

  const onChangeSearchValue = (item: any, type: string) => {
    setSearchValue((prev: any) => {
      if (type !== 'sortByLevel') {
        if (prev[type].includes(item)) {
          return {
            ...prev,
          };
        } else {
          return {
            ...prev,
            [type]: [...prev[type], item],
          };
        }
      } else {
        return {
          ...prev,
          [type]: item,
        };
      }
    });
  };

  return (
    <ScrollView>
      <Header />
      <View style={styles.intro}>
        <Image source={images.course} style={{ width: 100, height: 100 }} />
        <View>
          <Text style={{ fontSize: 25, fontWeight: '500', marginBottom: 8 }}>
            Discover Courses
          </Text>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: colors.grey300,
              paddingLeft: 12,
              marginBottom: 12,
            }}
          >
            <TextInput
              placeholder='Search course'
              style={{ paddingVertical: 4, flex: 1 }}
            />
            <TouchableOpacity
              style={{
                borderColor: colors.grey300,
                borderWidth: 1,
                height: '100%',
                paddingHorizontal: 8,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <EvilIcons
                name='search'
                size={24}
                color={colors.text}
                style={{ marginTop: -5 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.text}>
          LiveTutor has built the most quality, methodical and scientific
          courses in the fields of life for those who are in need of improving
          their knowledge of the fields.
        </Text>
      </View>

      <View style={styles.search}>
        <DropDownMenu
          isOpen={isOpenLevelMenu}
          data={levels}
          onChangeOpen={setIsOpenLevelMenu}
          onChangeSelected={onChangeSearchValue}
          selectedItem={searchValue.levels}
          typeOfMenu='levels'
        >
          <Pressable
            onPress={() => setIsOpenLevelMenu(!isOpenLevelMenu)}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: colors.grey300,
              borderRadius: 6,
              paddingLeft: 12,
              paddingRight: 6,
              paddingVertical: 4,
            }}
          >
            <Text style={{ fontSize: 14, color: colors.text }}>
              {searchValue.levels.length > 0
                ? searchValue.levels.join(' - ')
                : 'Select levels'}
            </Text>
            {isOpenLevelMenu ? (
              <Entypo name='chevron-small-down' size={24} color='black' />
            ) : (
              <Entypo name='chevron-small-right' size={24} color='black' />
            )}
          </Pressable>
        </DropDownMenu>

        <DropDownMenu
          isOpen={isOpenCategoryMenu}
          data={categories}
          onChangeOpen={setIsOpenCategoryMenu}
          onChangeSelected={onChangeSearchValue}
          selectedItem={null}
          typeOfMenu='categories'
        >
          <Pressable
            onPress={() => setIsOpenCategoryMenu(!isOpenCategoryMenu)}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: colors.grey300,
              borderRadius: 6,
              paddingLeft: 12,
              paddingRight: 6,
              paddingVertical: 4,
            }}
          >
            <Text style={{ fontSize: 14, color: colors.text }}>
              {searchValue.categories.length > 0
                ? searchValue.categories.join(' - ')
                : 'Select categories'}
            </Text>
            {isOpenCategoryMenu ? (
              <Entypo name='chevron-small-down' size={24} color='black' />
            ) : (
              <Entypo name='chevron-small-right' size={24} color='black' />
            )}
          </Pressable>
        </DropDownMenu>

        <DropDownMenu
          isOpen={isOpenSortMenu}
          data={sorts}
          onChangeOpen={setIsOpenSortMenu}
          onChangeSelected={onChangeSearchValue}
          selectedItem={searchValue.sortByLevel}
          typeOfMenu='sortByLevel'
        >
          <Pressable
            onPress={() => setIsOpenSortMenu(!isOpenSortMenu)}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: colors.grey300,
              borderRadius: 6,
              paddingLeft: 12,
              paddingRight: 6,
              paddingVertical: 4,
            }}
          >
            <Text style={{ fontSize: 14, color: colors.text }}>
              {searchValue.sortByLevel.length > 0
                ? searchValue.sortByLevel
                : 'Sort by level'}
            </Text>
            {isOpenSortMenu ? (
              <Entypo name='chevron-small-down' size={24} color='black' />
            ) : (
              <Entypo name='chevron-small-right' size={24} color='black' />
            )}
          </Pressable>
        </DropDownMenu>
      </View>

      <View style={styles.courseTabs}></View>
      <View style={styles.courseSection}>
        <Text style={styles.courseHeading}>English For Traveling</Text>
        <View style={styles.courseList}>
          <CourseItem src={images.courseItem1} />
          <CourseItem src={images.courseItem1} />
          <CourseItem src={images.courseItem1} />
          <CourseItem src={images.courseItem1} />
          <CourseItem src={images.courseItem1} />
        </View>
      </View>
      <View style={styles.courseSection}>
        <Text style={styles.courseHeading}>English For Beginners</Text>
        <View style={styles.courseList}>
          <CourseItem src={images.courseItem2} />
          <CourseItem src={images.courseItem2} />
          <CourseItem src={images.courseItem2} />
          <CourseItem src={images.courseItem2} />
          <CourseItem src={images.courseItem2} />
        </View>
      </View>
      <View style={styles.courseSection}>
        <Text style={styles.courseHeading}>Business English</Text>
        <View style={styles.courseList}>
          <CourseItem src={images.courseItem3} />
          <CourseItem src={images.courseItem3} />
          <CourseItem src={images.courseItem3} />
          <CourseItem src={images.courseItem3} />
          <CourseItem src={images.courseItem3} />
        </View>
      </View>
      <View style={styles.courseSection}>
        <Text style={styles.courseHeading}>English For Kid</Text>
        <View style={styles.courseList}>
          <CourseItem src={images.courseItem4} />
          <CourseItem src={images.courseItem4} />
          <CourseItem src={images.courseItem4} />
          <CourseItem src={images.courseItem4} />
          <CourseItem src={images.courseItem4} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Courses;
