import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useState } from 'react';
import { EvilIcons, Entypo, AntDesign } from '@expo/vector-icons';

import Header from '@/components/Header';
import styles from './styles';
import { images } from '@/assets';
import { colors } from '@/constants';
import DropdownMenu from '@/components/DropdownMenu';
import CourseItem from './components/CourseItem';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
type SearchState = {
  levels: [];
  categories: [];
  sortByLevel: string;
  courseName: string;
};

const sorts = ['Level descending', 'Level ascending'];
const Courses = () => {
  const [isOpenLevelMenu, setIsOpenLevelMenu] = useState(false);
  const [isOpenCategoriesMenu, setIsOpenCategoriesMenu] = useState(false);
  const [isOpenSortMenu, setIsOpenSortMenu] = useState(false);
  const [tab, setTab] = useState('course');

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

  const renderSearchItems = (type: string) => {
    let items: [] = [];
    if (type === 'categories') {
      items = searchValue.categories;
    } else if (type === 'levels') {
      items = searchValue.levels;
    }

    return items.map((item, index) => {
      return (
        <View
          key={index}
          style={{
            backgroundColor: 'rgba(0,0,0,0.1)',
            borderRadius: 4,
            flexDirection: 'row',
            padding: 2,
            marginLeft: 4,
            marginTop: 4,
          }}
        >
          <Text style={{ fontSize: 14, color: colors.text }}>{item}</Text>
          <TouchableWithoutFeedback
            onPress={() => {
              setIsOpenCategoriesMenu(false);
              setSearchValue((prev: any) => {
                return {
                  ...prev,
                  [type]: prev[type].filter((e: string) => e !== item),
                };
              });
            }}
          >
            <AntDesign
              name='close'
              size={20}
              color='rgba(0,0,0,0.8)'
              style={{ marginLeft: 4 }}
            />
          </TouchableWithoutFeedback>
        </View>
      );
    });
  };

  return (
    <ScrollView
      style={styles.container}
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}
    >
      <Header />
      <View style={styles.intro}>
        <Image source={images.course} style={{ width: 100, height: 100 }} />
        <View>
          <Text style={{ fontSize: 25, fontWeight: '500', marginBottom: 8 }}>
            Discover Courses
          </Text>
          <View style={styles.courseSearch}>
            <TextInput placeholder='Search course' style={styles.courseInput} />
            <TouchableHighlight
              style={styles.searchBtn}
              onPress={() => {}}
              underlayColor='rgba(0,0,0,0.1)'
              activeOpacity={0.8}
            >
              <EvilIcons
                name='search'
                size={24}
                color={colors.text}
                style={{ marginTop: -5 }}
              />
            </TouchableHighlight>
          </View>
        </View>
        <Text style={styles.text}>
          LiveTutor has built the most quality, methodical and scientific
          courses in the fields of life for those who are in need of improving
          their knowledge of the fields.
        </Text>
      </View>

      <View style={styles.search}>
        <DropdownMenu
          isOpen={isOpenLevelMenu}
          data={levels}
          onChangeOpen={setIsOpenLevelMenu}
          onChangeSelected={onChangeSearchValue}
          selectedItem={searchValue.levels}
          typeOfMenu='levels'
          style={{ zIndex: 3, marginTop: 16 }}
        >
          <Pressable
            onPress={() => setIsOpenLevelMenu(!isOpenLevelMenu)}
            style={styles.dropdownMenuBtn}
          >
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginLeft: -4,
                marginTop: -4,
              }}
            >
              {searchValue.levels.length > 0 ? (
                renderSearchItems('levels')
              ) : (
                <Text style={{ fontSize: 14, color: colors.text }}>
                  Select levels
                </Text>
              )}
            </View>
            {isOpenLevelMenu ? (
              <Entypo name='chevron-small-down' size={24} color='black' />
            ) : (
              <Entypo name='chevron-small-right' size={24} color='black' />
            )}
          </Pressable>
        </DropdownMenu>

        <DropdownMenu
          isOpen={isOpenCategoriesMenu}
          data={categories}
          onChangeOpen={setIsOpenCategoriesMenu}
          onChangeSelected={onChangeSearchValue}
          selectedItem={null}
          typeOfMenu='categories'
          style={{ zIndex: 2, marginTop: 16 }}
        >
          <Pressable
            onPress={() => {
              setIsOpenCategoriesMenu(!isOpenCategoriesMenu);
            }}
            style={styles.dropdownMenuBtn}
          >
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginLeft: -4,
                marginTop: -4,
              }}
            >
              {searchValue.categories.length > 0 ? (
                renderSearchItems('categories')
              ) : (
                <Text style={{ fontSize: 14, color: colors.text }}>
                  Select categories
                </Text>
              )}
            </View>
            {isOpenCategoriesMenu ? (
              <Entypo name='chevron-small-down' size={24} color='black' />
            ) : (
              <Entypo name='chevron-small-right' size={24} color='black' />
            )}
          </Pressable>
        </DropdownMenu>

        <DropdownMenu
          isOpen={isOpenSortMenu}
          data={sorts}
          onChangeOpen={setIsOpenSortMenu}
          onChangeSelected={onChangeSearchValue}
          selectedItem={searchValue.sortByLevel}
          typeOfMenu='sortByLevel'
          style={{ zIndex: 1, marginTop: 16 }}
        >
          <Pressable
            onPress={() => setIsOpenSortMenu(!isOpenSortMenu)}
            style={styles.dropdownMenuBtn}
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
        </DropdownMenu>
      </View>

      <View style={styles.courseTabs}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setTab('course')}>
          <Text
            style={[
              styles.courseTabText,
              tab === 'course' && { color: colors.primary },
            ]}
          >
            Course
          </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setTab('e-book')}>
          <Text
            style={[
              styles.courseTabText,
              tab === 'e-book' && { color: colors.primary },
            ]}
          >
            E-book
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setTab('interactive e-book')}
        >
          <Text
            style={[
              styles.courseTabText,
              tab === 'interactive e-book' && { color: colors.primary },
            ]}
          >
            Interactive E-book
          </Text>
        </TouchableOpacity>
      </View>
      {tab === 'course' && (
        <View style={{ marginBottom: 32 }}>
          <View style={styles.courseSection}>
            <Text style={styles.courseHeading}>English For Traveling</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.courseList}>
                <CourseItem src={images.courseItem1} />
                <CourseItem src={images.courseItem1} />
                <CourseItem src={images.courseItem1} />
                <CourseItem src={images.courseItem1} />
                <CourseItem src={images.courseItem1} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.courseSection}>
            <Text style={styles.courseHeading}>English For Beginners</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.courseList}>
                <CourseItem src={images.courseItem2} />
                <CourseItem src={images.courseItem2} />
                <CourseItem src={images.courseItem2} />
                <CourseItem src={images.courseItem2} />
                <CourseItem src={images.courseItem2} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.courseSection}>
            <Text style={styles.courseHeading}>Business English</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.courseList}>
                <CourseItem src={images.courseItem3} />
                <CourseItem src={images.courseItem3} />
                <CourseItem src={images.courseItem3} />
                <CourseItem src={images.courseItem3} />
                <CourseItem src={images.courseItem3} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.courseSection}>
            <Text style={styles.courseHeading}>English For Kid</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.courseList}>
                <CourseItem src={images.courseItem4} />
                <CourseItem src={images.courseItem4} />
                <CourseItem src={images.courseItem4} />
                <CourseItem src={images.courseItem4} />
                <CourseItem src={images.courseItem4} />
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default Courses;
