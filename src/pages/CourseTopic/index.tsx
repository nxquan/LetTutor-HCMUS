import {
  View,
  Text,
  Image,
  TouchableHighlight,
  ScrollView,
  TextInput,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Pdf from 'react-native-pdf';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import Header from '@/components/Header';
import styles from './styles';
import {images} from '@/assets';
import {colors} from '@/constants';
import TopicItem from '@/components/TopicItem';
import ModalPopper from '@/components/ModalPopper';
import DrawerButton from '@/components/DrawerButton';
import BackButton from '@/components/BackButton';
import {useRoute} from '@react-navigation/native';
import {useTranslations} from '@/hooks';
import {useColorScheme} from 'nativewind';
import CStatusBar from '@/components/CStatusBar';
import MessageIcon from '@/components/MessageIcon';

const defaultSource = {
  uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
  cache: true,
};

const CourseTopic = () => {
  const {t} = useTranslations();
  const route: any = useRoute();
  const [course, setCourse] = useState<any>({});
  const [selectedTopic, setSelectedTopic] = useState<any>({});
  const [isOpenModal, setIsOpenModal] = useState(false);
  const {colorScheme} = useColorScheme();

  const onChangeShowModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  useEffect(() => {
    setCourse(route.params?.course);
    if (route.params?.selectedTopic != undefined) {
      setSelectedTopic(route.params?.selectedTopic);
      // setIsOpenModal(true);
    } else {
      const topic = route.params?.course?.topics.find(
        (item: any) => item.orderCourse === 0,
      );
      setSelectedTopic(topic);
    }
  }, [route.params]);

  return (
    <View className="flex-1">
      <Header
        style={{zIndex: 50}}
        drawerBtn={<DrawerButton />}
        backIcon={<BackButton />}
      />
      <ScrollView
        className="bg-white dark:bg-black"
        showsVerticalScrollIndicator={false}>
        <View style={styles.inner}>
          <View
            style={[
              styles.courseInfo,
              {
                shadowColor:
                  colorScheme === 'light' ? colors.black : colors.white,
              },
            ]}
            className="bg-white dark:bg-black">
            <Image
              source={{
                uri:
                  course?.imageUrl ||
                  'https://camblycurriculumicons.s3.amazonaws.com/5e0e8b212ac750e7dc9886ac?h=d41d8cd98f00b204e9800998ecf8427e',
              }}
              style={styles.image}
            />
            <View style={styles.info}>
              <Text className="text-black dark:text-white" style={styles.title}>
                {course?.name}
              </Text>
              <Text className="text-black dark:text-white" style={styles.des}>
                {course?.description}
              </Text>
            </View>
            <View style={styles.topicList}>
              <Text
                style={styles.topicHeading}
                className="text-black dark:text-white">
                {t('courseDetail.listTopics')}
              </Text>
              {course?.topics?.map((topic: any) => {
                return (
                  <TopicItem
                    data={topic}
                    isActive={topic.orderCourse === selectedTopic?.orderCourse}
                    key={topic.id}
                    onSelect={() => {
                      setSelectedTopic(topic);
                      setIsOpenModal(true);
                    }}
                  />
                );
              })}
            </View>
          </View>
        </View>

        <ModalPopper
          visible={isOpenModal && selectedTopic !== undefined}
          onChangeShowModal={() => {}}
          modalInnerStyle={{height: '100%', width: '100%', padding: 8}}>
          <View style={styles.pdfContainer}>
            <View className="flex-row items-center mb-3 ml-3">
              <TouchableOpacity
                onPress={() => {
                  setIsOpenModal(false);
                }}
                activeOpacity={0.6}>
                <Entypo
                  name="chevron-with-circle-left"
                  size={30}
                  color={colorScheme == 'light' ? colors.black : colors.white}
                />
              </TouchableOpacity>
              <Text className="text-black dark:text-white text-lg text-medium text-center ml-4">
                {selectedTopic?.orderCourse + 1}. {selectedTopic?.name}
              </Text>
            </View>
            <View style={styles.pdfHeader} className="bg-[#eee] dark:bg-black">
              <View style={styles.pdfActions}>
                <TouchableHighlight
                  style={[styles.pdfBtn, {marginRight: 6}]}
                  activeOpacity={0.7}
                  underlayColor={
                    colorScheme == 'light'
                      ? 'rgba(0,0,0,0.3)'
                      : 'rgba(255,255,255,0.4)'
                  }
                  onPress={() => {}}>
                  <Feather
                    name="chevron-up"
                    size={20}
                    color={colorScheme == 'light' ? colors.text : colors.white}
                  />
                </TouchableHighlight>
                <TextInput
                  placeholderTextColor={colors.black}
                  style={{
                    borderRadius: 4,
                    borderWidth: 1,
                    borderColor: 'rgba(0,0,0,0.1)',
                    backgroundColor: colors.white,
                    color: colors.black,
                    fontSize: 14,
                    width: 32,
                    marginRight: 2,
                    textAlign: 'center',
                  }}
                />
                <Text className="text-black dark:text-white text-sm">/17</Text>
                <TouchableHighlight
                  style={[styles.pdfBtn, {marginLeft: 6}]}
                  activeOpacity={0.7}
                  underlayColor={
                    colorScheme == 'light'
                      ? 'rgba(0,0,0,0.3)'
                      : 'rgba(255,255,255,0.4)'
                  }
                  onPress={() => {}}>
                  <Feather
                    name="chevron-down"
                    size={20}
                    color={colorScheme == 'light' ? colors.text : colors.white}
                  />
                </TouchableHighlight>
              </View>
              <View style={styles.pdfActions}>
                <TouchableHighlight
                  style={styles.pdfBtn}
                  activeOpacity={0.7}
                  underlayColor={
                    colorScheme == 'light'
                      ? 'rgba(0,0,0,0.3)'
                      : 'rgba(255,255,255,0.4)'
                  }
                  onPress={() => {}}>
                  <Feather
                    name="zoom-in"
                    size={20}
                    color={colorScheme == 'light' ? colors.text : colors.white}
                  />
                </TouchableHighlight>
                <View style={[styles.pdfActions, {marginHorizontal: 4}]}>
                  <Text className="text-black dark:text-white">100%</Text>
                  <Feather
                    name="chevron-down"
                    size={20}
                    color={colorScheme == 'light' ? colors.text : colors.white}
                    style={{marginLeft: 4}}
                  />
                </View>
                <TouchableHighlight
                  style={styles.pdfBtn}
                  activeOpacity={0.7}
                  underlayColor={
                    colorScheme == 'light'
                      ? 'rgba(0,0,0,0.3)'
                      : 'rgba(255,255,255,0.4)'
                  }
                  onPress={() => {}}>
                  <Feather
                    name="zoom-out"
                    size={20}
                    color={colorScheme == 'light' ? colors.text : colors.white}
                  />
                </TouchableHighlight>
              </View>
              <View style={styles.pdfActions}>
                <TouchableHighlight
                  style={styles.pdfBtn}
                  activeOpacity={0.7}
                  underlayColor={
                    colorScheme == 'light'
                      ? 'rgba(0,0,0,0.3)'
                      : 'rgba(255,255,255,0.4)'
                  }
                  onPress={() => {}}>
                  <MaterialIcons
                    name="zoom-out-map"
                    size={20}
                    color={colorScheme == 'light' ? colors.text : colors.white}
                  />
                </TouchableHighlight>
                <TouchableHighlight
                  style={[styles.pdfBtn, {marginLeft: 4}]}
                  activeOpacity={0.7}
                  underlayColor={
                    colorScheme == 'light'
                      ? 'rgba(0,0,0,0.3)'
                      : 'rgba(255,255,255,0.4)'
                  }
                  onPress={() => {}}>
                  <AntDesign
                    name="download"
                    size={20}
                    color={colorScheme == 'light' ? colors.text : colors.white}
                  />
                </TouchableHighlight>
              </View>
            </View>
            <View style={styles.pdfBody}>
              <View style={styles.pdfSidebar}>
                <View style={{paddingHorizontal: 2, paddingTop: 4}}>
                  <TouchableHighlight
                    style={[styles.pdfBtn]}
                    activeOpacity={0.7}
                    underlayColor={
                      colorScheme == 'light'
                        ? 'rgba(0,0,0,0.3)'
                        : 'rgba(255,255,255,0.4)'
                    }
                    onPress={() => {}}>
                    <Feather
                      name="book"
                      size={20}
                      color={
                        colorScheme == 'light' ? colors.text : colors.white
                      }
                    />
                  </TouchableHighlight>
                </View>
              </View>
              <View style={{flex: 1}}>
                <Pdf
                  source={{
                    uri: selectedTopic?.nameFile || defaultSource.uri,
                    cache: true,
                  }}
                  trustAllCerts={false}
                  style={styles.pdf}
                />
              </View>
            </View>
          </View>
        </ModalPopper>
        <CStatusBar type={colorScheme} />
        <MessageIcon />
      </ScrollView>
    </View>
  );
};

export default CourseTopic;
