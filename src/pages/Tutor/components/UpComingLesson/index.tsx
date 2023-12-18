import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import EncryptedStorage from 'react-native-encrypted-storage';
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

const UpComingLesson = () => {
  const {t} = useTranslations();
  const navigation = useNavigation<StackProps>();
  const [hourTotal, setHourTotal] = useState(0);
  const [upcomingLesson, setUpcomingLesson] = useState<any>(undefined);
  const [remainingTimeForUpcomingLesson, setRemainingTimeForUpcomingLesson] =
    useState<number>(0);
  const [teachingTime, setTeachingTime] = useState<number>(0);

  useEffect(() => {
    const fetchUpComingLesson = async () => {
      let session: any = await EncryptedStorage.getItem('user_session');

      const res = await utilService.getMinuteTotal({
        headers: {
          Authorization: `Bearer ${JSON.parse(session).accessToken}`,
        },
      });
      if (res.success) {
        setHourTotal(res.data.total);
      }

      const resNextBookings = await bookingService.getNextBookings({
        headers: {
          Authorization: `Bearer ${JSON.parse(session).accessToken}`,
        },
      });
      if (resNextBookings.success) {
        const {data} = resNextBookings.data;
        if (data.length > 0) {
          const nearestLesson = data[0];
          setUpcomingLesson({
            ...nearestLesson,
            status: 'INIT',
          });
          setRemainingTimeForUpcomingLesson(
            Math.floor(
              (nearestLesson.scheduleDetailInfo.startPeriodTimestamp -
                Date.now()) /
                1000,
            ),
          );
        }
      }
    };

    fetchUpComingLesson();
  }, []);

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
  }, []);

  useEffect(() => {
    if (remainingTimeForUpcomingLesson === 0) {
      const timerId = setInterval(() => {
        setTeachingTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [remainingTimeForUpcomingLesson]);

  return (
    <LinearGradient
      start={{x: 0.1, y: 0}}
      end={{x: 0.75, y: 1.0}}
      style={styles.notiContainer}
      colors={['rgb(12, 61, 223)', 'rgb(5, 23, 157)']}>
      {upcomingLesson ? (
        <View>
          <Text style={styles.notiHeading}>{t('tutor.upcoming')}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <View style={{flex: 1}}>
              <Text style={styles.notiDateText}>
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
                  ({t('tutor.teachingIn')}{' '}
                  {convertSecondsToMinutes(teachingTime)})
                </Text>
              )}
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('VideoCall')}
              activeOpacity={0.8}
              className="flex-row items-center bg-white rounded-full px-3 py-1.5">
              <Feather name="youtube" size={24} color={colors.primary} />
              <Text
                style={{marginLeft: 6, color: colors.primary, fontSize: 14}}>
                {t('tutor.enterUpcomingText')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <Text style={[styles.notiHeading, {paddingVertical: 40}]}>
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
