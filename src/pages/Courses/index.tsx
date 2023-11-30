import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Header from '@/components/Header';
import styles from './styles';
import {images} from '@/assets';
import {colors} from '@/constants';
import DropdownMenu from '@/components/DropdownMenu';
import CourseItem from './components/CourseItem';
import DrawerButton from '@/components/DrawerButton';
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

const categories = [
  {
    id: 1,
    title: 'For studying abroad',
    key: '',
  },
  {
    id: 2,
    title: 'English for Traveling',
    key: '',
  },
  {
    id: 3,
    title: 'Conversational English',
    key: '',
  },
  {
    id: 4,
    title: 'English for Beginners',
    key: '',
  },
  {
    id: 5,
    title: 'Business English',
    key: '',
  },
  {
    id: 6,
    title: 'STARTERS',
    key: '',
  },
  {
    id: 7,
    title: 'English for kids',
    key: '',
  },
  {
    id: 8,
    title: 'PET',
    key: '',
  },
  {
    id: 9,
    title: 'KET',
    key: '',
  },
  {
    id: 10,
    title: 'MOVERS',
    key: '',
  },
  {
    id: 11,
    title: 'FLYERS',
    key: '',
  },
  {
    id: 12,
    title: 'TOEFL',
    key: '',
  },
  {
    id: 13,
    title: 'TOEIC',
    key: '',
  },
  {
    id: 14,
    title: 'IELTS',
    key: '',
  },
];

type SearchState = {
  levels: [];
  categories: [];
  sortByLevel: any;
  courseName: string;
};

const sorts = [
  {
    id: 1,
    title: 'Level descending',
    key: 'DESC',
  },
  {
    id: 2,
    title: 'Level ascending',
    key: 'ASC',
  },
];

const Courses = () => {
  const [state, dispatch] = useGlobalContext();
  const {t} = useTranslations();
  const [isOpenLevelMenu, setIsOpenLevelMenu] = useState(false);
  const [isOpenCategoriesMenu, setIsOpenCategoriesMenu] = useState(false);
  const [isOpenSortMenu, setIsOpenSortMenu] = useState(false);
  const [tab, setTab] = useState('course');

  const [searchValue, setSearchValue] = useState<SearchState>({
    levels: [],
    categories: [],
    sortByLevel: {},
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

    return items.map((item: any, index) => {
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
          }}>
          <Text style={{fontSize: 14, color: colors.text}}>{item.title}</Text>
          <TouchableWithoutFeedback
            onPress={() => {
              setIsOpenCategoriesMenu(false);
              setSearchValue((prev: any) => {
                return {
                  ...prev,
                  [type]: prev[type].filter((e: any) => e.title !== item.title),
                };
              });
            }}>
            <AntDesign
              name="close"
              size={20}
              color="rgba(0,0,0,0.8)"
              style={{marginLeft: 4}}
            />
          </TouchableWithoutFeedback>
        </View>
      );
    });
  };

  const renderCourses = () => {
    const categories = state.courseCategories;
    const result: any[] = [];
    categories.forEach((category: any) => {
      const courses = state.courses.filter((course: any) => {
        const isMatch = course?.categories.find(
          (item: any) => item?.key === category.key,
        );
        return !!isMatch;
      });

      if (courses.length > 0) {
        result.push(
          <View style={styles.courseSection} key={category.id}>
            <Text style={styles.courseHeading}>{category.title}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.courseList}>
                {courses.map((item: any) => (
                  <CourseItem key={item.id} data={item} />
                ))}
              </View>
            </ScrollView>
          </View>,
        );
      }
    });

    return result;
  };

  return (
    <ScrollView
      style={styles.container}
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}>
      <Header style={{zIndex: 10}} drawerBtn={<DrawerButton />} />
      <View style={styles.intro}>
        <Image source={images.course} style={{width: 100, height: 100}} />
        <View>
          <Text style={styles.headingText}>{t('courses.title')}</Text>
          <View style={styles.courseSearch}>
            <TextInput
              placeholderTextColor={colors.text}
              placeholder={t('courses.searchCourse')}
              style={styles.courseInput}
            />
            <TouchableHighlight
              style={styles.searchBtn}
              onPress={() => {}}
              underlayColor="rgba(0,0,0,0.1)"
              activeOpacity={0.8}>
              <EvilIcons
                name="search"
                size={24}
                color={colors.text}
                style={{marginTop: -5}}
              />
            </TouchableHighlight>
          </View>
        </View>
        <Text style={styles.text}>{t('courses.des')}</Text>
      </View>

      <View style={styles.search}>
        <DropdownMenu
          isOpen={isOpenLevelMenu}
          data={levels}
          onChangeOpen={setIsOpenLevelMenu}
          onChangeSelected={onChangeSearchValue}
          selectedItem={searchValue.levels}
          typeOfMenu="levels"
          style={{zIndex: 3, marginTop: 16}}>
          <Pressable
            onPress={() => setIsOpenLevelMenu(!isOpenLevelMenu)}
            style={styles.dropdownMenuBtn}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginLeft: -4,
                marginTop: -4,
              }}>
              {searchValue.levels.length > 0 ? (
                renderSearchItems('levels')
              ) : (
                <Text style={{fontSize: 14, color: colors.text}}>
                  {t('profile.selectLevel')}
                </Text>
              )}
            </View>
            {isOpenLevelMenu ? (
              <Entypo name="chevron-small-down" size={24} color="black" />
            ) : (
              <Entypo name="chevron-small-right" size={24} color="black" />
            )}
          </Pressable>
        </DropdownMenu>

        <DropdownMenu
          isOpen={isOpenCategoriesMenu}
          data={categories}
          onChangeOpen={setIsOpenCategoriesMenu}
          onChangeSelected={onChangeSearchValue}
          selectedItem={null}
          typeOfMenu="categories"
          style={{zIndex: 2, marginTop: 16}}>
          <Pressable
            onPress={() => {
              setIsOpenCategoriesMenu(!isOpenCategoriesMenu);
            }}
            style={styles.dropdownMenuBtn}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginLeft: -4,
                marginTop: -4,
              }}>
              {searchValue.categories.length > 0 ? (
                renderSearchItems('categories')
              ) : (
                <Text style={{fontSize: 14, color: colors.text}}>
                  {t('courses.selectCategories')}
                </Text>
              )}
            </View>
            {isOpenCategoriesMenu ? (
              <Entypo name="chevron-small-down" size={24} color="black" />
            ) : (
              <Entypo name="chevron-small-right" size={24} color="black" />
            )}
          </Pressable>
        </DropdownMenu>

        <DropdownMenu
          isOpen={isOpenSortMenu}
          data={sorts}
          onChangeOpen={setIsOpenSortMenu}
          onChangeSelected={onChangeSearchValue}
          selectedItem={searchValue.sortByLevel}
          typeOfMenu="sortByLevel"
          style={{zIndex: 1, marginTop: 16}}>
          <Pressable
            onPress={() => setIsOpenSortMenu(!isOpenSortMenu)}
            style={styles.dropdownMenuBtn}>
            <Text style={{fontSize: 14, color: colors.text}}>
              {searchValue.sortByLevel?.title?.length > 0
                ? searchValue.sortByLevel?.title
                : t('courses.sortByLevel')}
            </Text>
            {isOpenSortMenu ? (
              <Entypo name="chevron-small-down" size={24} color="black" />
            ) : (
              <Entypo name="chevron-small-right" size={24} color="black" />
            )}
          </Pressable>
        </DropdownMenu>
      </View>

      <View style={styles.courseTabs}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setTab('course')}>
          <Text
            style={[
              styles.courseTabText,
              tab === 'course' && {color: colors.primary},
            ]}>
            {t('courses.courses')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setTab('e-book')}>
          <Text
            style={[
              styles.courseTabText,
              tab === 'e-book' && {color: colors.primary},
            ]}>
            E-book
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setTab('interactive e-book')}>
          <Text
            style={[
              styles.courseTabText,
              tab === 'interactive e-book' && {color: colors.primary},
            ]}>
            Interactive E-book
          </Text>
        </TouchableOpacity>
      </View>
      {tab === 'course' && (
        <View style={{marginBottom: 32}}>
          {/* <View style={styles.courseSection}>
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
          </View> */}
          {renderCourses()}
        </View>
      )}
    </ScrollView>
  );
};

export default Courses;
