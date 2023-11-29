import {View, Text, Image, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '@/components/Header';
import styles from './styles';
import {images} from '@/assets';
import {colors} from '@/constants';
import ScheduleItem from './components/ScheduleItem';
import Pagination from '@/components/Pagination';
import DrawerButton from '@/components/DrawerButton';
import {useGlobalContext, useTranslations} from '@/hooks';

const Schedule = () => {
  const [state, dispatch] = useGlobalContext();
  const {t} = useTranslations();
  const [schedules, setSchedules] = useState<any[]>([]);
  const [currentSchedules, setCurrentSchedules] = useState<any[]>([]);

  const onChangeDataInPage = (data: any) => {
    setCurrentSchedules(data);
  };

  useEffect(() => {
    setSchedules(() => {
      const bookings = state.bookings;
      const result: any[] = [];

      bookings.forEach((item: any) => {
        if (item.userId === 'f569c202-7bbf-4620-af77-ecc1419a6b28') {
          const startLessonDate =
            item.scheduleDetailInfo.startPeriodTimestamp - 7 * 60 * 60 * 1000;
          if (!item.isDeleted && startLessonDate - Date.now() >= 0) {
            result.push({
              ...item,
            });
          }
        }
      });

      result.sort(
        (a, b) =>
          a.scheduleDetailInfo.startPeriodTimestamp -
          b.scheduleDetailInfo.startPeriodTimestamp,
      );

      return result;
    });
  }, [state]);

  return (
    <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
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
            {t('schedule.title')}
          </Text>
          <View
            style={{
              borderLeftWidth: 2,
              borderLeftColor: colors.grey400,
              paddingLeft: 10,
            }}>
            <Text style={styles.text}>{t('schedule.description1')}</Text>
            <Text style={styles.text}>{t('schedule.description2')}</Text>
          </View>
        </View>
      </View>

      <View style={styles.bookContainer}>
        <Text
          style={[
            styles.text,
            {fontWeight: '500', color: colors.black, marginBottom: 8},
          ]}>
          {t('schedule.latestBook')}
        </Text>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableCol, {width: '30%'}]}>
            {t('schedule.name')}
          </Text>
          <Text
            style={[
              styles.tableCol,
              {width: '40%', backgroundColor: colors.white},
            ]}>
            Sample.pdf
          </Text>
          <Text style={[styles.tableCol, {width: '18%'}]}>
            {t('schedule.page')}
          </Text>
          <Text
            style={[
              styles.tableCol,
              {width: '12%', backgroundColor: colors.white},
            ]}>
            0
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCol, {width: '30%'}]}>
            {t('schedule.description')}
          </Text>
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
        {currentSchedules.length > 0 &&
          currentSchedules.map((item, index) => {
            return <ScheduleItem data={item} key={index} />;
          })}
      </View>
      <Pagination
        data={schedules}
        ITEMS_PER_PAGE={5}
        style={{paddingHorizontal: 20}}
        onChangeDataInPage={onChangeDataInPage}
      />
    </ScrollView>
  );
};

export default Schedule;
