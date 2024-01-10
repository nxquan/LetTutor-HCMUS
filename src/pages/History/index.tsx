import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {useColorScheme} from 'nativewind';
import {useNavigation} from '@react-navigation/native';

import Header from '@/components/Header';
import styles from './styles';
import {images} from '@/assets';
import {colors} from '@/constants';
import HistoryItem from './components/HistoryItem';
import DrawerButton from '@/components/DrawerButton';
import {useTranslations} from '@/hooks';
import Button from '@/components/Button';
import BEPagination from '@/components/BEPagination';
import ToastManager from 'toastify-react-native';
import {toastConfig} from '@/config';
import StackProps from '@/types/type';
import MessageIcon from '@/components/MessageIcon';
import CStatusBar from '@/components/CStatusBar';

import * as bookingService from '@/services/bookingService';
const width = Dimensions.get('window').width;
const History = () => {
  const {t} = useTranslations();
  const {colorScheme} = useColorScheme();
  const navigation: any = useNavigation<StackProps>();
  const [loading, setLoading] = useState(false);

  const [schedules, setSchedules] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);

  const [page, setPage] = useState({
    current: 1,
    total: 0,
  });

  const onChangePage = (page: number) => {
    setPage((prev: any) => ({...prev, current: page}));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(!refreshing);
  }, []);

  const getHistory = useCallback(async () => {
    setLoading(true);
    const res = await bookingService.getHistoryOfBooking({
      params: {
        page: page.current,
        perPage: 20,
        inFuture: 0,
        orderBy: 'meeting',
        sortBy: 'desc',
      },
    });

    if (res.success) {
      const {data} = res.data;
      setSchedules(data.rows);
      setPage((prev: any) => ({...prev, total: data.count}));
    }
    setLoading(false);
  }, [page.current, refreshing]);

  const handleRefreshPage = () => {
    setRefreshPage(true);
    getHistory();
    setTimeout(() => {
      setRefreshPage(false);
    }, 1000);
  };

  useEffect(() => {
    getHistory();
  }, [page.current, refreshing]);

  return (
    <View className="flex-1">
      <Header style={{zIndex: 50}} drawerBtn={<DrawerButton />} />
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
          <Image source={images.history} style={{width: 120, height: 120}} />
          <View>
            <Text style={styles.heading} className="text-black dark:text-white">
              {t('history.title')}
            </Text>
            <View
              style={{
                borderLeftWidth: 2,
                borderLeftColor: colors.grey400,
                paddingLeft: 10,
              }}>
              <Text style={styles.text} className="text-text dark:text-white">
                {t('history.description')}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.historyList}>
          {loading ? (
            <View className="self-center justify-center">
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
                <HistoryItem data={item} key={index} onRefresh={onRefresh} />
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
      <ToastManager
        {...toastConfig}
        width={width - 24}
        style={{
          position: 'absolute',
          top: 50,
          zIndex: 1000,
        }}
      />
      <MessageIcon />
      <CStatusBar type={colorScheme} />
    </View>
  );
};

export default History;
