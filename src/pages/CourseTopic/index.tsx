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

const defaultSource = {
  uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
  cache: true,
};

const CourseTopic = () => {
  const route: any = useRoute();
  const [topics, setTopics] = useState<any>([]);
  const [selectedTopic, setSelectedTopic] = useState<any>({});
  const [isOpenModal, setIsOpenModal] = useState(false);

  const onChangeShowModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  useEffect(() => {
    setTopics(route.params?.topic);
    setSelectedTopic(route.params?.selectedTopic);
    setIsOpenModal(true);
  }, [route.params]);

  return (
    <ScrollView
      style={styles.container}
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}>
      <Header drawerBtn={<DrawerButton />} backIcon={<BackButton />} />
      <View style={styles.inner}>
        <View style={styles.courseInfo}>
          <Image source={images.courseItem1} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.title}>Life in the Internet Age</Text>
            <Text style={styles.des}>
              Let's discuss how technology is changing the way we live
            </Text>
          </View>
          <View style={styles.topicList}>
            <Text style={styles.topicHeading}>List Topic</Text>
            {topics?.map((topic: any) => {
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 12,
              marginLeft: 12,
            }}>
            <TouchableOpacity
              onPress={() => {
                setIsOpenModal(false);
              }}
              activeOpacity={0.6}>
              <Entypo
                name="chevron-with-circle-left"
                size={30}
                color={colors.black}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: colors.black,
                fontSize: 18,
                fontWeight: '500',
                textAlign: 'center',
                marginLeft: 16,
              }}>
              {selectedTopic?.orderCourse}. {selectedTopic?.name}
            </Text>
          </View>
          <View style={styles.pdfHeader}>
            <View style={styles.pdfActions}>
              <TouchableHighlight
                style={[styles.pdfBtn, {marginRight: 6}]}
                activeOpacity={0.7}
                underlayColor="rgba(0,0,0,0.3)"
                onPress={() => {}}>
                <Feather name="chevron-up" size={20} color={colors.text} />
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
              <Text style={{fontSize: 14, color: colors.black}}>/17</Text>
              <TouchableHighlight
                style={[styles.pdfBtn, {marginLeft: 6}]}
                activeOpacity={0.7}
                underlayColor="rgba(0,0,0,0.3)"
                onPress={() => {}}>
                <Feather name="chevron-down" size={20} color={colors.text} />
              </TouchableHighlight>
            </View>
            <View style={styles.pdfActions}>
              <TouchableHighlight
                style={styles.pdfBtn}
                activeOpacity={0.7}
                underlayColor="rgba(0,0,0,0.3)"
                onPress={() => {}}>
                <Feather name="zoom-in" size={20} color={colors.text} />
              </TouchableHighlight>
              <View style={[styles.pdfActions, {marginHorizontal: 4}]}>
                <Text style={{color: colors.black}}>100%</Text>
                <Feather
                  name="chevron-down"
                  size={20}
                  color={colors.text}
                  style={{marginLeft: 4}}
                />
              </View>
              <TouchableHighlight
                style={styles.pdfBtn}
                activeOpacity={0.7}
                underlayColor="rgba(0,0,0,0.3)"
                onPress={() => {}}>
                <Feather name="zoom-out" size={20} color={colors.text} />
              </TouchableHighlight>
            </View>
            <View style={styles.pdfActions}>
              <TouchableHighlight
                style={styles.pdfBtn}
                activeOpacity={0.7}
                underlayColor="rgba(0,0,0,0.3)"
                onPress={() => {}}>
                <MaterialIcons
                  name="zoom-out-map"
                  size={20}
                  color={colors.text}
                />
              </TouchableHighlight>
              <TouchableHighlight
                style={[styles.pdfBtn, {marginLeft: 4}]}
                activeOpacity={0.7}
                underlayColor="rgba(0,0,0,0.3)"
                onPress={() => {}}>
                <AntDesign name="download" size={20} color={colors.text} />
              </TouchableHighlight>
            </View>
          </View>
          <View style={styles.pdfBody}>
            <View style={styles.pdfSidebar}>
              <View style={{paddingHorizontal: 2, paddingTop: 4}}>
                <TouchableHighlight
                  style={[styles.pdfBtn]}
                  activeOpacity={0.7}
                  underlayColor="rgba(0,0,0,0.3)"
                  onPress={() => {}}>
                  <Feather name="book" size={20} color={colors.text} />
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
      <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
    </ScrollView>
  );
};

export default CourseTopic;
