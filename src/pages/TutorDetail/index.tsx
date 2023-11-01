import {
  View,
  Text,
  ScrollView,
  Image,
  StatusBar,
  Button,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from 'react-native-table-component';
import Video from 'react-native-video';

import styles from './styles';
import Header from '@/components/Header';
import {images, languageImages} from '@/assets';
import {colors} from '@/constants';
import InfoPart from './components/InfoPart';
import ButtonItem from '@/components/Button';
import ReviewItem from './components/ReviewItem';
import Pagination from '@/components/Pagination';
import BookButton from './components/BookBtn';

const types = [
  'All',
  'English for kids',
  'English for Business',
  'Conversational',
  'STARTERS',
  'MOVERS',
  'FLYERS',
  'KET',
  'PET',
  'IELTS',
  'TOEFL',
  'TOEIC',
];

const reviews = [
  {
    name: 'Quan',
    time: '5 months ago',
    stars: 3,
    description: 'great tutor great lesson',
  },
  {
    name: 'Quan 1',
    time: '5 months ago',
    stars: 3,
    description: 'great tutor great lesson',
  },
  {
    name: 'Quan 2',
    time: '5 months ago',
    stars: 3,
    description: 'great tutor great lesson',
  },
  {
    name: 'Quan 3',
    time: '5 months ago',
    stars: 3,
    description: 'great tutor great lesson',
  },
];
const tableHead = ['', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const tableTitle = [
  '10:00 - 10:25',
  '10:30 - 10:55',
  '11:00 - 11:25',
  '11:30 - 11:55',
  '12:00 - 12:25',
  '12:30 - 12:55',
  '13:00 - 13:25',
  '13:30 - 13:55',
  '14:00 - 14:25',
  '14:30 - 14:55',
  '15:00 - 15:25',
  '15:30 - 15:55',
  '16:00 - 16:25',
  '16:30 - 16:55',
  '17:00 - 17:25',
  '17:30 - 17:55',
  '18:00 - 18:25',
  '18:30 - 18:55',
  '19:00 - 19:25',
  '19:30 - 19:55',
  '20:00 - 20:25',
  '20:30 - 20:55',
  '21:00 - 21:25',
  '21:30 - 21:55',
  '22:00 - 22:25',
  '22:30 - 22:55',
  '23:00 - 23:25',
  '23:30 - 23:55',
];

const rowData = tableTitle.map(() => [
  <BookButton disabled onPress={() => {}} />,
  <BookButton onPress={() => {}} />,
  <Text
    style={{
      fontSize: 13,
      fontWeight: '500',
      color: 'rgb(48 191 109)',
      textAlign: 'center',
    }}>
    Book
  </Text>,
  '',
  '',
  '',
  '',
]);

const TutorDetail = () => {
  const [isLike, setIsLike] = useState(false);

  const renderItem = (items: any[]) => {
    return items.map((item, index) => {
      return (
        <ButtonItem
          key={index}
          title={item}
          style={{
            paddingVertical: 6,
            paddingHorizontal: 10,
            marginLeft: 10,
            marginBottom: 8,
            borderRadius: 99,
            color: colors.primary,
            backgroundColor: colors.backgroundActive,
          }}
        />
      );
    });
  };

  const renderReviews = (reviews: any[]) => {
    return reviews.map((review, index) => {
      return (
        <ReviewItem
          key={index}
          name={review.name}
          time={review.time}
          stars={review.stars}
          description={review.description}
        />
      );
    });
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[0]}>
      <Header />
      <View style={styles.inner}>
        <View style={styles.info}>
          <View style={{flexDirection: 'row'}}>
            <Image source={images.avatar} style={styles.avatar} />
            <View>
              <Text
                style={{color: colors.black, fontSize: 22, fontWeight: '500'}}>
                Keegan
              </Text>
              <View style={{flexDirection: 'row', marginVertical: 4}}>
                <AntDesign name="star" size={18} color={colors.yellow} />
                <AntDesign name="star" size={18} color={colors.yellow} />
                <AntDesign name="star" size={18} color={colors.yellow} />
                <AntDesign name="star" size={18} color={colors.yellow} />
                <AntDesign name="staro" size={18} color={colors.yellow} />
                <Text style={{marginLeft: 6}}>(128)</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={languageImages.unitedState}
                  style={{width: 20, height: 15}}
                />
                <Text style={{fontSize: 14, color: colors.text, marginLeft: 6}}>
                  Vietnam
                </Text>
              </View>
            </View>
          </View>
          <Text
            style={{
              paddingTop: 15,
              marginBottom: 12,
              textAlign: 'justify',
              fontSize: 15,
              color: colors.text,
            }}>
            I am passionate about running and fitness, I often compete in
            trail/mountain running events and I love pushing myself. I am
            training to one day take part in ultra-endurance events. I also
            enjoy watching rugby on the weekends, reading and watching podcasts
            on Youtube. My most memorable life experience would be living in and
            traveling around Southeast Asia.
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                setIsLike(!isLike);
              }}
              style={{padding: 8}}
              activeOpacity={0.8}>
              <View style={{alignItems: 'center'}}>
                {isLike ? (
                  <AntDesign name="heart" size={24} color={colors.error} />
                ) : (
                  <AntDesign name="hearto" size={24} color={colors.primary} />
                )}
                <Text
                  style={{
                    marginTop: 4,
                    color: isLike ? colors.error : colors.primary,
                  }}>
                  Favorite
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsLike(!isLike);
              }}
              style={{padding: 8}}
              activeOpacity={0.7}>
              <View style={{alignItems: 'center', marginLeft: 54}}>
                <AntDesign
                  name="exclamationcircleo"
                  size={24}
                  color={colors.primary}
                />
                <Text style={{marginTop: 4, color: colors.primary}}>
                  Report
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{marginVertical: 12}}>
            <Video
              source={{
                uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
              }} // Can be a URL or a local file.
              style={styles.video}
              resizeMode="cover"
            />
          </View>

          <InfoPart title="Education">
            <Text style={{fontSize: 14, color: colors.text, marginLeft: 12}}>
              BA
            </Text>
          </InfoPart>
          <InfoPart title="Languages">
            <View style={{flexDirection: 'row'}}>
              {renderItem(['English'])}
            </View>
          </InfoPart>
          <InfoPart title="Specialties">
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {renderItem(types)}
            </View>
          </InfoPart>
          <InfoPart title="Interests">
            <Text style={{marginLeft: 10, fontSize: 14, color: colors.text}}>
              I am a fun, talkative person who loves to find out about others
              cultures and experience.
            </Text>
          </InfoPart>
          <InfoPart title="Interests">
            <Text style={{marginLeft: 10, fontSize: 14, color: colors.text}}>
              Acadsoc - English Language Instruction Chinese based online
              English teaching platform. I taught EILTS as well as a wide age
              range of Children and adults of all levels. Sincewin - English
              Language Instruction Online English lessons for whole kindergarten
              classes. I taught basic phonics and vocabulary using songs, TPR
              and puppets
            </Text>
          </InfoPart>
          <InfoPart title="Others review">
            <View
              style={{
                paddingTop: 12,
              }}>
              {renderReviews(reviews)}
              <Pagination />
            </View>
          </InfoPart>
        </View>

        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 15,
            }}>
            <Button title="Today" />
            <TouchableHighlight
              style={[styles.actionBtn, {marginLeft: 12}]}
              activeOpacity={0.7}
              underlayColor="rgba(0,0,0,0.3)"
              onPress={() => {}}>
              <Entypo name="chevron-small-left" size={24} color="black" />
            </TouchableHighlight>
            <TouchableHighlight
              style={[styles.actionBtn, {marginHorizontal: 12}]}
              activeOpacity={0.7}
              underlayColor="rgba(0,0,0,0.3)"
              onPress={() => {}}>
              <Entypo name="chevron-small-right" size={24} color="black" />
            </TouchableHighlight>
            <Text style={{fontSize: 16, color: colors.text}}>
              Oct - Nov, 2023
            </Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Table
              borderStyle={{
                borderWidth: 2,
                borderColor: '#c8e1ff',
              }}>
              <Row
                data={tableHead}
                style={styles.head}
                textStyle={{textAlign: 'center'}}
                widthArr={[100, 80, 80, 80, 80, 80, 80, 80]}
              />
              <TableWrapper style={styles.wrapper}>
                <Col
                  data={tableTitle}
                  heightArr={tableTitle.map(() => 40)}
                  width={100}
                  textStyle={{textAlign: 'center'}}
                />

                <Rows
                  data={rowData}
                  style={styles.row}
                  widthArr={[80, 80, 80, 80, 80, 80, 80]}
                />
              </TableWrapper>
            </Table>
          </ScrollView>
        </View>
      </View>

      <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
    </ScrollView>
  );
};

export default TutorDetail;
