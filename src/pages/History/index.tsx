import {View, Text, Image, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';

import Header from '@/components/Header';
import styles from './styles';
import {images} from '@/assets';
import {colors} from '@/constants';
import Pagination from '@/components/Pagination';
import HistoryItem from './components/HistoryItem';
import DrawerButton from '@/components/DrawerButton';
import {useGlobalContext} from '@/hooks';
import Button from '@/components/Button';
const History = () => {
  const [state, dispatch] = useGlobalContext();
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
          if (!item.isDeleted && startLessonDate - Date.now() < 0) {
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
    <ScrollView
      style={styles.container}
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}>
      <Header drawerBtn={<DrawerButton />} />
      <View style={styles.intro}>
        <Image source={images.history} style={{width: 120, height: 120}} />
        <View>
          <Text style={styles.heading}>History</Text>
          <View
            style={{
              borderLeftWidth: 2,
              borderLeftColor: colors.grey400,
              paddingLeft: 10,
            }}>
            <Text style={styles.text}>
              The following is a list of lessons you have attended. You can
              review the details of the lessons you have attended
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.historyList}>
        {currentSchedules.length > 0 ? (
          currentSchedules.map((item, index) => {
            return <HistoryItem data={item} key={index} />;
          })
        ) : (
          <View className="self-center mt-10 items-center">
            <Image source={images.noData} style={{height: 150}} />
            <Text className="font-normal text-center text-base text-gray-600">
              Empty data
            </Text>
            <Button
              title="Book a lesson"
              onPress={() => {}}
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
      {schedules.length > 0 && (
        <Pagination
          data={schedules}
          ITEMS_PER_PAGE={5}
          style={{paddingHorizontal: 20}}
          onChangeDataInPage={onChangeDataInPage}
        />
      )}
    </ScrollView>
  );
};

export default History;
