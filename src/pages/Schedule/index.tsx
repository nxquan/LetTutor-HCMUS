import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
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
import ToastManager, {Toast} from 'toastify-react-native';
import {toastConfig} from '@/config';
import {useColorScheme} from 'nativewind';

export const width = Dimensions.get('window').width;

const Schedule = () => {
  const navigation: any = useNavigation<StackProps>();
  const {t} = useTranslations();
  const {colorScheme} = useColorScheme();
  const [schedules, setSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);
  const [page, setPage] = useState({
    current: 1,
    total: 0,
  });

  const onChangePage = (page: number) => {
    setPage((prev: any) => ({...prev, current: page}));
  };

  const getHistory = useCallback(async () => {
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
      const groupedSchedule = groupSchedule(data.rows);
      setSchedules(groupedSchedule);
      setPage((prev: any) => ({...prev, total: data.count}));
    }
    setLoading(false);
  }, [page.current, refreshing]);

  useEffect(() => {
    getHistory();
  }, [page.current, refreshing]);

  const groupSchedule = useCallback((schedules: any[]) => {
    const result: any = [];
    for (let i = 0; i < schedules.length; i++) {
      const peers = [schedules[i]];
      for (let j = i + 1; j < schedules.length; j++) {
        if (
          peers[peers.length - 1].scheduleDetailInfo.endPeriodTimestamp +
            5 * 60 * 1000 ===
          schedules[j].scheduleDetailInfo.startPeriodTimestamp
        ) {
          peers.push(schedules[j]);
        } else {
          break;
        }
      }

      if (peers.length > 1) {
        i += peers.length - 1;
        result.push(peers);
      } else {
        result.push(peers[0]);
      }
    }

    return result;
  }, []);

  const onChangeRefresh = () => {
    setRefreshing(!refreshing);
  };

  const handleRefreshPage = () => {
    setRefreshPage(true);
    getHistory();
    setTimeout(() => {
      setRefreshPage(false);
    }, 800);
  };

  return (
    <View className="flex-1">
      <Header style={{zIndex: 100}} drawerBtn={<DrawerButton />} />
      <ScrollView
        className="bg-white dark:bg-black"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshPage}
            onRefresh={() => {
              handleRefreshPage();
            }}
            colors={[colors.primary]}
          />
        }>
        <View style={styles.intro}>
          <Image
            source={images.calendarCheck}
            style={{width: 120, height: 120}}
          />
          <View>
            <Text className="text-black dark:text-white text-3xl text-medium mb-2">
              {t('schedule.title')}
            </Text>
            <View
              style={{
                borderLeftWidth: 2,
                borderLeftColor: colors.grey400,
                paddingLeft: 10,
              }}>
              <Text style={styles.text} className="text-text dark:text-white">
                {t('schedule.description1')}
              </Text>
              <Text style={styles.text} className="text-text dark:text-white">
                {t('schedule.description2')}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bookContainer}>
          <Text
            className="text-black dark:text-white text-medium mb-2"
            style={styles.text}>
            {t('schedule.latestBook')}
          </Text>
          <View style={styles.tableHeader}>
            <Text
              className="text-text dark:text-white"
              style={[
                styles.tableCol,
                {
                  width: '30%',
                  backgroundColor:
                    colorScheme == 'light' ? colors.grey200 : colors.black,
                },
              ]}>
              {t('schedule.name')}
            </Text>
            <Text
              className="text-text dark:text-white"
              style={[
                styles.tableCol,
                {
                  width: '40%',
                  backgroundColor:
                    colorScheme == 'light' ? colors.white : colors.black,
                },
              ]}></Text>
            <Text
              className="text-text dark:text-white"
              style={[styles.tableCol, {width: '18%'}]}>
              {t('schedule.page')}
            </Text>
            <Text
              className="text-text dark:text-white"
              style={[
                styles.tableCol,
                {
                  width: '12%',
                  backgroundColor:
                    colorScheme == 'light' ? colors.white : colors.black,
                },
              ]}>
              0
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text
              className="text-text dark:text-white"
              style={[styles.tableCol, {width: '30%'}]}>
              {t('schedule.description')}
            </Text>
            <Text
              className="text-text dark:text-white"
              style={[
                styles.tableCol,
                {
                  width: '70%',
                  backgroundColor:
                    colorScheme == 'light' ? colors.white : colors.black,
                  lineHeight: 20,
                },
              ]}></Text>
          </View>
        </View>

        <View style={styles.scheduleList}>
          {loading ? (
            <View className="self-center justify-center bg-white dark:bg-black">
              <ActivityIndicator
                className="mb-2 mt-5"
                size="large"
                color={colors.primary}
              />
              <Text className="text-base font-normal text-black dark:text-white">
                Loading...
              </Text>
            </View>
          ) : schedules.length > 0 ? (
            schedules.map((item, index) => {
              return (
                <ScheduleItem
                  key={index}
                  data={item}
                  isSingle={item.length === undefined}
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
          {schedules.length > 0 && !loading && (
            <BEPagination
              ITEMS_PER_PAGE={20}
              totalItems={page.total}
              currentPage={page.current}
              style={{paddingHorizontal: 20}}
              onChangePage={onChangePage}
            />
          )}
        </View>
      </ScrollView>
      <MessageIcon />
      <ToastManager
        {...toastConfig}
        width={width - 24}
        style={{
          position: 'absolute',
          top: 50,
          zIndex: 1000,
        }}
      />
    </View>
  );
};

export default Schedule;
