import {
  View,
  Text,
  Image,
  TouchableHighlight,
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
  TextInput,
  StatusBar,
} from 'react-native';
import React, { useState } from 'react';
import Pdf from 'react-native-pdf';
import { Feather, MaterialIcons, AntDesign } from '@expo/vector-icons';

import Header from '@/components/Header';
import styles from './styles';
import { images } from '@/assets';
import { colors } from '@/constants';
import TopicItem from '@/components/TopicItem';
import ReadPdf from './ReadPdf';

const source = {
  uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
  cache: true,
};

const CourseTopic = () => {
  const [topics, setTopics] = useState([1, 2, 3, 4, 5]);

  return (
    <ScrollView
      style={styles.container}
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}
      //nestedScrollEnabled={true}
    >
      <Header />
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
            {topics.map((topic, index) => {
              return <TopicItem isActive={index == 0} key={index} />;
            })}
          </View>
        </View>
        <View style={styles.pdfContainer}>
          <View style={styles.pdfHeader}>
            <View style={styles.pdfActions}>
              <TouchableHighlight
                style={styles.pdfBtn}
                activeOpacity={0.7}
                underlayColor='rgba(0,0,0,0.3)'
                onPress={() => {}}
              >
                <Feather name='chevron-up' size={20} color={colors.text} />
              </TouchableHighlight>
              <TextInput
                style={{
                  borderRadius: 4,
                  borderWidth: 1,
                  borderColor: 'rgba(0,0,0,0.1)',
                  backgroundColor: colors.white,
                  fontSize: 14,
                  width: 32,
                  marginRight: 2,
                  textAlign: 'center',
                }}
              />
              <Text style={{ fontSize: 14 }}>/17</Text>
              <TouchableHighlight
                style={[styles.pdfBtn, { marginLeft: 4 }]}
                activeOpacity={0.7}
                underlayColor='rgba(0,0,0,0.3)'
                onPress={() => {}}
              >
                <Feather name='chevron-down' size={20} color={colors.text} />
              </TouchableHighlight>
            </View>
            <View style={styles.pdfActions}>
              <TouchableHighlight
                style={styles.pdfBtn}
                activeOpacity={0.7}
                underlayColor='rgba(0,0,0,0.3)'
                onPress={() => {}}
              >
                <Feather name='zoom-in' size={20} color={colors.text} />
              </TouchableHighlight>
              <View style={[styles.pdfActions, { marginHorizontal: 4 }]}>
                <Text>100%</Text>
                <Feather
                  name='chevron-down'
                  size={20}
                  color={colors.text}
                  style={{ marginLeft: 4 }}
                />
              </View>
              <TouchableHighlight
                style={styles.pdfBtn}
                activeOpacity={0.7}
                underlayColor='rgba(0,0,0,0.3)'
                onPress={() => {}}
              >
                <Feather name='zoom-out' size={20} color={colors.text} />
              </TouchableHighlight>
            </View>
            <View style={styles.pdfActions}>
              <TouchableHighlight
                style={styles.pdfBtn}
                activeOpacity={0.7}
                underlayColor='rgba(0,0,0,0.3)'
                onPress={() => {}}
              >
                <MaterialIcons
                  name='zoom-out-map'
                  size={20}
                  color={colors.text}
                />
              </TouchableHighlight>
              <TouchableHighlight
                style={[styles.pdfBtn, { marginLeft: 4 }]}
                activeOpacity={0.7}
                underlayColor='rgba(0,0,0,0.3)'
                onPress={() => {}}
              >
                <AntDesign name='download' size={20} color={colors.text} />
              </TouchableHighlight>
            </View>
          </View>
          <View style={styles.pdfBody}>
            <View style={styles.pdfSidebar}>
              <View style={{ paddingHorizontal: 2, paddingTop: 4 }}>
                <TouchableHighlight
                  style={[styles.pdfBtn]}
                  activeOpacity={0.7}
                  underlayColor='rgba(0,0,0,0.3)'
                  onPress={() => {}}
                >
                  <Feather name='book' size={20} color={colors.text} />
                </TouchableHighlight>
              </View>
            </View>
            {/* <ReadPdf /> */}
            {/* <ScrollView nestedScrollEnabled={true}> */}

            {/* </ScrollView> */}
            <Pdf
              source={source}
              trustAllCerts={true}
              onLoadComplete={(number, filePath) => {}}
              onPageChanged={(page, numberOfPages) => {
                console.log(`Current page: ${page}`);
              }}
              onError={(error) => {
                console.log(error);
              }}
              onPressLink={(uri) => {
                console.log(`Link pressed: ${uri}`);
              }}
              style={styles.pdf}
            />
          </View>
        </View>
      </View>

      <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
    </ScrollView>

    // <View style={{ flex: 1 }}>
    //   <Pdf
    //     source={source}
    //     trustAllCerts={true}
    //     onLoadComplete={(number, filePath) => {}}
    //     onPageChanged={(page, numberOfPages) => {
    //       console.log(`Current page: ${page}`);
    //     }}
    //     onError={(error) => {
    //       console.log(error);
    //     }}
    //     onPressLink={(uri) => {
    //       console.log(`Link pressed: ${uri}`);
    //     }}
    //     style={styles.pdf}
    //   />
    // </View>
  );
};

export default CourseTopic;
