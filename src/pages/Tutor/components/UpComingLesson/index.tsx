import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';

import styles from './styles';
import {
  convertMinutesToHours,
  convertSecondsToMinutes,
  padNumber,
} from '@/utils';
import {useTranslations} from '@/hooks';
import {useNavigation} from '@react-navigation/native';
import StackProps from '@/types/type';
import {colors} from '@/constants';
import * as utilService from '@/services/utilService';
import * as bookingService from '@/services/bookingService';
import {useColorScheme} from 'nativewind';

type Props = {
  refresh?: boolean;
};

const UpComingLesson = (props: Props) => {
  const {refresh: refreshPage} = props;

  const {t} = useTranslations();
  const navigation = useNavigation<StackProps>();
  const [hourTotal, setHourTotal] = useState(0);
  const [upcomingLesson, setUpcomingLesson] = useState<any>(undefined);
  const [remainingTimeForUpcomingLesson, setRemainingTimeForUpcomingLesson] =
    useState<number>(0);
  const [teachingTime, setTeachingTime] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const {colorScheme} = useColorScheme();

  useEffect(() => {
    const fetchUpComingLesson = async () => {
      setLoading(true);
      const res = await utilService.getMinuteTotal();
      if (res.success) {
        setHourTotal(res.data.total);
      }

      const resNextBookings = await bookingService.getNextBookings();
      if (resNextBookings.success) {
        const {data} = resNextBookings.data;
        if (data.length > 0) {
          // let nearestLesson: any = data.find(
          //   (item: any) =>
          //     item.scheduleDetailInfo.startPeriodTimestamp >=
          //     Date.now() - 25 * 60 * 1000,
          // );
          let nearestLesson: any = {
            scheduleDetailInfo: {
              endPeriodTimestamp: 999999999999999,
            },
          };

          data.forEach((item: any) => {
            const {scheduleDetailInfo} = item;
            if (
              scheduleDetailInfo.endPeriodTimestamp <=
                nearestLesson.scheduleDetailInfo.endPeriodTimestamp &&
              scheduleDetailInfo.startPeriodTimestamp >=
                Date.now() - 25 * 60 * 1000
            ) {
              nearestLesson = item;
            }
          });

          if (
            Date.now() >= nearestLesson.scheduleDetailInfo.startPeriodTimestamp
          ) {
            nearestLesson.status = 'TEACHING';
            setRemainingTimeForUpcomingLesson(0);
            setTeachingTime(
              Math.floor(
                (Date.now() -
                  nearestLesson.scheduleDetailInfo.startPeriodTimestamp +
                  2000) /
                  1000,
              ),
            );
          } else {
            nearestLesson.status = 'INIT';
            setRemainingTimeForUpcomingLesson(
              Math.floor(
                (nearestLesson.scheduleDetailInfo.startPeriodTimestamp -
                  Date.now() -
                  1000) /
                  1000,
              ),
            );
          }

          setUpcomingLesson({
            ...nearestLesson,
          });
        }
      }
      setLoading(false);
    };

    fetchUpComingLesson();
  }, [refresh, refreshPage]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setRemainingTimeForUpcomingLesson(prev => {
        if (prev == 0) {
          clearInterval(timerId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  });

  useEffect(() => {
    if (remainingTimeForUpcomingLesson === 0) {
      const timerId = setInterval(() => {
        if (teachingTime === 25 * 60 * 1000) {
          clearInterval(timerId);
          setRefresh(!refresh);
          return;
        }
        setTeachingTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  });

  return (
    <LinearGradient
      start={{x: 0.1, y: 0}}
      end={{x: 0.75, y: 1.0}}
      style={styles.notiContainer}
      colors={
        colorScheme == 'light'
          ? ['rgb(12, 61, 223)', 'rgb(5, 23, 157)']
          : ['black', 'rgba(0,0,0,0.1)']
      }>
      {loading ? (
        <ActivityIndicator className="mr-4" size="large" color={colors.white} />
      ) : upcomingLesson ? (
        <View>
          <Text
            style={styles.notiHeading}
            className="text-white dark:text-white">
            {t('tutor.upcoming')}
          </Text>
          <View className="flex-row items-center mt-2.5">
            <View style={{flex: 1}}>
              <Text
                style={styles.notiDateText}
                className="text-white dark:text-white">
                {new Date(
                  upcomingLesson?.scheduleDetailInfo?.startPeriodTimestamp,
                ).toDateString()}
                ,{' '}
                {padNumber(
                  new Date(
                    upcomingLesson?.scheduleDetailInfo?.startPeriodTimestamp ||
                      0,
                  ).getHours(),
                )}
                :
                {padNumber(
                  new Date(
                    upcomingLesson?.scheduleDetailInfo?.startPeriodTimestamp ||
                      0,
                  ).getMinutes(),
                )}{' '}
                -{' '}
                {padNumber(
                  new Date(
                    upcomingLesson?.scheduleDetailInfo?.endPeriodTimestamp || 0,
                  ).getHours(),
                )}
                :
                {padNumber(
                  new Date(
                    upcomingLesson?.scheduleDetailInfo?.endPeriodTimestamp || 0,
                  ).getMinutes(),
                )}
              </Text>
              {upcomingLesson.status == 'INIT' ? (
                <Text style={styles.notiRemainTimeText}>
                  ({t('tutor.startIn')}{' '}
                  {convertSecondsToMinutes(remainingTimeForUpcomingLesson)})
                </Text>
              ) : (
                <Text
                  style={[styles.notiRemainTimeText, {color: colors.success}]}>
                  ({t('tutor.classTime')}{' '}
                  {convertSecondsToMinutes(teachingTime)})
                </Text>
              )}
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('VideoCall', {data: upcomingLesson})
              }
              activeOpacity={0.8}
              className="flex-row items-center bg-white rounded-full px-3 py-1.5">
              <Feather name="youtube" size={24} color={colors.primary} />
              <Text className="text-first ml-1.5 text-sm">
                {t('tutor.enterUpcomingText')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <Text
            style={[styles.notiHeading, {paddingVertical: 40}]}
            className="text-white">
            You have no upcoming lesson.
          </Text>
        </View>
      )}

      <Text
        style={{
          color: colors.white,
          textAlign: 'center',
          fontSize: 16,
          fontWeight: '500',
          marginTop: 12,
        }}>
        {t('tutor.totalTime')} {convertMinutesToHours(hourTotal)}
      </Text>
    </LinearGradient>
  );
};

export default UpComingLesson;
