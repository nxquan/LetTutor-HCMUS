import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

import styles from './styles';
import {images} from '@/assets';
import {colors} from '@/constants';
import Header from '@/components/Header';
import ScheduleItem from './components/ScheduleItem';
import DrawerButton from '@/components/DrawerButton';
import Button from '@/components/Button';
import BEPagination from '@/components/BEPagination';
import {useTranslations} from '@/hooks';
import * as bookingService from '@/services/bookingService';
import StackProps from '@/types/type';
import MessageIcon from '@/components/MessageIcon';

const Schedule = () => {
  const navigation: any = useNavigation<StackProps>();
  const {t} = useTranslations();
  const [schedules, setSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState({
    current: 1,
    total: 0,
  });

  const onChangePage = (page: number) => {
    setPage((prev: any) => ({...prev, current: page}));
  };

  useEffect(() => {
    const getHistory = async () => {
      setLoading(true);
      const res = await bookingService.getHistoryOfBooking({
        params: {
          page: page.current,
          perPage: 20,
          inFuture: 1,
          orderBy: 'meeting',
          sortBy: 'asc',
        },
      });

      if (res.success) {
        const {data} = res.data;
        setSchedules(data.rows);
        setPage((prev: any) => ({...prev, total: data.count}));
      }
      setLoading(false);
    };

    getHistory();
  }, [page.current, refreshing]);

  const onChangeRefresh = () => {
    setRefreshing(!refreshing);
  };

  return (
    <>
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
              ]}></Text>
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
              ]}></Text>
          </View>
        </View>

        <View style={styles.scheduleList}>
          {loading ? (
            <View className="self-center justify-center">
              <ActivityIndicator
                className="mb-2 mt-5"
                size="large"
                color={colors.primary}
              />
              <Text className="text-base font-normal">Loading...</Text>
            </View>
          ) : schedules.length > 0 ? (
            schedules.map((item, index) => {
              return (
                <ScheduleItem
                  data={item}
                  key={index}
                  onChangeRefresh={onChangeRefresh}
                />
              );
            })
          ) : (
            <View className="self-center mt-10 items-center">
              <Image source={images.noData} style={{height: 150}} />
              <Text className="font-normal text-center text-base text-gray-600">
                Empty data
              </Text>
              <Button
                title="Book a lesson"
                onPress={() => {
                  navigation.navigate('Tutor');
                }}
                style={{
                  color: colors.white,
                  fontWeight: '500',
                  backgroundColor: colors.primary,
                  marginTop: 16,
                  paddingHorizontal: 20,
                }}
              />
            </View>
          )}
        </View>

        {schedules.length > 0 && !loading && (
          <BEPagination
            ITEMS_PER_PAGE={20}
            totalItems={page.total}
            currentPage={page.current}
            style={{paddingHorizontal: 20}}
            onChangePage={onChangePage}
          />
        )}
      </ScrollView>
      <MessageIcon />
    </>
  );
};

export default Schedule;
