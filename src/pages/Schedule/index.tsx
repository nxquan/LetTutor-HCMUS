import {View, Text, Image, ScrollView} from 'react-native';
import React from 'react';
import Header from '@/components/Header';
import styles from './styles';
import {images} from '@/assets';
import {colors} from '@/constants';
import ScheduleItem from './components/ScheduleItem';
import Pagination from '@/components/Pagination';
import DrawerButton from '@/components/DrawerButton';

const Schedule = () => {
  return (
    <ScrollView
      style={styles.container}
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}>
      <Header drawerBtn={<DrawerButton />} />
      <View style={styles.intro}>
        <Image
          source={images.calendarCheck}
          style={{width: 120, height: 120}}
        />
        <View>
          <Text
            style={{
              color: colors.black,
              fontSize: 30,
              fontWeight: '500',
              marginBottom: 8,
            }}>
            Schedule
          </Text>
          <View
            style={{
              borderLeftWidth: 2,
              borderLeftColor: colors.grey400,
              paddingLeft: 10,
            }}>
            <Text style={styles.text}>
              Here is a list of the sessions you have booked
            </Text>
            <Text style={styles.text}>
              You can track when the meeting starts, join the meeting with one
              click or can cancel the meeting before 2 hours
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.bookContainer}>
        <Text
          style={[
            styles.text,
            {fontWeight: '500', color: colors.black, marginBottom: 8},
          ]}>
          Latest books
        </Text>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableCol, {width: '30%'}]}>Name</Text>
          <Text
            style={[
              styles.tableCol,
              {width: '40%', backgroundColor: colors.white},
            ]}>
            Sample.pdf
          </Text>
          <Text style={[styles.tableCol, {width: '18%'}]}>Page</Text>
          <Text
            style={[
              styles.tableCol,
              {width: '12%', backgroundColor: colors.white},
            ]}>
            0
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCol, {width: '30%'}]}>Description</Text>
          <Text
            style={[
              styles.tableCol,
              {width: '70%', backgroundColor: colors.white, lineHeight: 20},
            ]}>
            Sample.pdfDescriptionDescriptionDescriptionDescriptionDescription
          </Text>
        </View>
      </View>

      <View style={styles.scheduleList}>
        <ScheduleItem />
        <ScheduleItem />
        <ScheduleItem />
      </View>
      <Pagination style={{paddingHorizontal: 20}} />
    </ScrollView>
  );
};

export default Schedule;
