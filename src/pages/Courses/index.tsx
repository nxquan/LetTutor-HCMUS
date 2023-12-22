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
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Header from '@/components/Header';
import styles from './styles';
import {images} from '@/assets';
import {colors} from '@/constants';
import DropdownMenu from '@/components/DropdownMenu';
import CourseItem from './components/CourseItem';
import EbookItem from './components/EbookItem';
import DrawerButton from '@/components/DrawerButton';
import {useTranslations} from '@/hooks';
import * as courseService from '@/services/courseService';
import BEPagination from '@/components/BEPagination';

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
  const {t} = useTranslations();
  const [isOpenLevelMenu, setIsOpenLevelMenu] = useState(false);
  const [isOpenCategoriesMenu, setIsOpenCategoriesMenu] = useState(false);
  const [isOpenSortMenu, setIsOpenSortMenu] = useState(false);
  const [tab, setTab] = useState('course');
  const [courses, setCourses] = useState<any>([]);
  const [ebooks, setEbooks] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState({
    currentPage: 1,
    totalItems: 0,
  });

  const [searchValue, setSearchValue] = useState<SearchState>({
    levels: [],
    categories: [],
    sortByLevel: {},
    courseName: '',
  });

  const onChangeSearchValue = (type: string, item: any) => {
    setSearchValue((prev: any) => {
      if (type !== 'sortByLevel') {
        if (prev[type].includes(item)) {
          return {
            ...prev,
            [type]: prev[type].filter((_item: any) => _item.id !== item.id),
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
    if (courses.length > 0) {
      const components: any[] = [];
      categories.forEach((category: any) => {
        const _courses = courses.filter((course: any) => {
          const isMatch = course?.categories.find(
            (item: any) => item?.key === category.key,
          );
          return !!isMatch;
        });

        if (_courses.length > 0) {
          components.push(
            <View style={styles.courseSection} key={category.id}>
              <Text style={styles.courseHeading}>{category.title}</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.courseList}>
                  {_courses.map((item: any) => (
                    <CourseItem key={item.id} data={item} />
                  ))}
                </View>
              </ScrollView>
            </View>,
          );
        }
      });

      return components;
    } else {
      return (
        <View>
          <Text className="text-base text-center text-black">
            There no courses here!
          </Text>
        </View>
      );
    }
  };

  const onChangePage = useCallback((page: number) => {
    setPage((prev: any) => ({
      ...prev,
      currentPage: page,
    }));
  }, []);

  const renderEbooks = () => {
    if (ebooks.length > 0) {
      return (
        <View style={[styles.courseSection, {alignSelf: 'center'}]}>
          {ebooks.map((item: any) => (
            <EbookItem key={item.id} data={item} />
          ))}

          <BEPagination
            ITEMS_PER_PAGE={20}
            totalItems={page.totalItems}
            currentPage={page.currentPage}
            onChangePage={onChangePage}
          />
        </View>
      );
    } else {
      return (
        <View>
          <Text className="text-base text-center text-black">
            There no ebooks here!
          </Text>
        </View>
      );
    }
  };

  const fetchCourses = async () => {
    setLoading(true);
    const resContentCategories = await courseService.getContentCategories();
    if (resContentCategories.success) {
      setCategories(resContentCategories.data.rows);
    }

    const params: any = {
      page: 1,
      size: 100,
    };

    if (!!searchValue.sortByLevel?.key) {
      params.order = ['level'];
      params.orderBy = [searchValue.sortByLevel.key];
    }

    if (!!searchValue.courseName) {
      params.q = searchValue.courseName;
    }

    if (searchValue.categories.length > 0) {
      params.categoryId = searchValue.categories.map((item: any) => item.id);
    }

    if (searchValue.levels.length > 0) {
      params.level = searchValue.levels.map((item: any) => item.id);
    }

    const resCourses = await courseService.getCourses({
      params: params,
    });

    if (resCourses.success) {
      const {data} = resCourses.data;
      setCourses(data.rows);
    }
    setLoading(false);
  };

  const fetchEbooks = async () => {
    setLoading(true);
    const params: any = {
      page: page.currentPage,
      size: 20,
    };

    if (!!searchValue.sortByLevel?.key) {
      params.order = ['level'];
      params.orderBy = [searchValue.sortByLevel.key];
    }

    if (!!searchValue.courseName) {
      params.q = searchValue.courseName;
    }

    if (searchValue.categories.length > 0) {
      params.categoryId = searchValue.categories.map((item: any) => item.id);
    }

    if (searchValue.levels.length > 0) {
      params.level = searchValue.levels.map((item: any) => item.id);
    }

    const res = await courseService.getEbooks({
      params: params,
    });

    if (res.success) {
      const {data} = res.data;
      const _rows = data.rows;
      setEbooks(_rows);
      setPage((prev: any) => {
        return {
          ...prev,
          totalItems: data.count,
        };
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (tab === 'course') {
      fetchCourses();
    } else if (tab === 'e-book') {
      fetchEbooks();
    }
  }, [
    tab,
    page.currentPage,
    searchValue.categories,
    searchValue.levels,
    searchValue.sortByLevel,
  ]);

  const handleSearch = () => {
    if (tab === 'course') {
      fetchCourses();
    } else if (tab === 'e-book') {
      fetchEbooks();
    }
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
              onChangeText={text => {
                setSearchValue((prev: any) => {
                  return {
                    ...prev,
                    courseName: text,
                  };
                });
              }}
              value={searchValue.courseName}
            />
            <TouchableHighlight
              style={styles.searchBtn}
              onPress={() => {
                handleSearch();
              }}
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
              <Entypo
                name="chevron-small-down"
                style={{marginLeft: -20}}
                size={24}
                color="black"
              />
            ) : (
              <Entypo
                name="chevron-small-right"
                style={{marginLeft: -20}}
                size={24}
                color="black"
              />
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
              <Entypo
                name="chevron-small-down"
                style={{marginLeft: -12}}
                size={24}
                color="black"
              />
            ) : (
              <Entypo
                name="chevron-small-right"
                style={{marginLeft: -12}}
                size={24}
                color="black"
              />
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
          {loading ? (
            <View className="self-center justify-center">
              <ActivityIndicator
                className="mb-2 mt-5"
                size="large"
                color={colors.primary}
              />
              <Text className="text-base font-normal">Loading...</Text>
            </View>
          ) : (
            renderCourses()
          )}
        </View>
      )}

      {tab === 'e-book' && (
        <View style={{marginBottom: 32}}>
          {loading ? (
            <View className="self-center justify-center">
              <ActivityIndicator
                className="mb-2 mt-5"
                size="large"
                color={colors.primary}
              />
              <Text className="text-base font-normal">Loading...</Text>
            </View>
          ) : (
            renderEbooks()
          )}
        </View>
      )}

      {tab === 'interactive e-book' && (
        <View className="mt-4">
          <Text className="text-base text-center text-black">
            There aren't interactive ebooks here!
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Courses;
