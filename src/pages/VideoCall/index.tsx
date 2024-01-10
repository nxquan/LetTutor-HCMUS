import {
  View,
  Text,
  TouchableHighlight,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './styles';
import {colors} from '@/constants';

import {JitsiMeeting} from '@jitsi/react-native-sdk/index';

import {useNavigation, useRoute} from '@react-navigation/native';
import StackProps, {DrawerProps} from '@/types/type';
import {useGlobalContext} from '@/hooks';
import {convertSecondsToMinutes} from '@/utils';
import CStatusBar from '@/components/CStatusBar';
import {useColorScheme} from 'nativewind';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const VideoCall = () => {
  const route: any = useRoute();
  const {colorScheme} = useColorScheme();
  const [state, dispatch] = useGlobalContext();
  const navigation = useNavigation<StackProps>();
  const jitsiMeeting = useRef(null);
  const [remainingTimeForUpcomingLesson, setRemainingTimeForUpcomingLesson] =
    useState<number>(0);
  const [teachingTime, setTeachingTime] = useState<number>(0);

  const onReadyToClose = useCallback(() => {
    navigation.navigate('HomeDrawerRouter', {screen: 'Tutor'});
  }, []);

  const eventListeners = {
    onReadyToClose,
    // onConferenceLeft,
  };

  useEffect(() => {
    if (
      route.params.data.scheduleDetailInfo.startPeriodTimestamp > Date.now()
    ) {
      // HAVEN'T STARTED YET
      setRemainingTimeForUpcomingLesson(prev => {
        return Math.floor(
          (route.params.data.scheduleDetailInfo.startPeriodTimestamp -
            Date.now() -
            2000) /
            1000,
        );
      });
      setTeachingTime(0);
    } else {
      // HAVE STARTED
      setRemainingTimeForUpcomingLesson(0);
      setTeachingTime(
        Math.floor(
          -(
            Date.now() -
            route.params.data.scheduleDetailInfo.startPeriodTimestamp -
            2000
          ) / 1000,
        ),
      );
    }
  }, [route.params]);

  useEffect(() => {
    let timerId: any;
    if (remainingTimeForUpcomingLesson > 0) {
      timerId = setInterval(() => {
        setRemainingTimeForUpcomingLesson(prev => {
          return prev - 1;
        });
      }, 1000);
    } else if (teachingTime > 0) {
      timerId = setInterval(() => {
        setTeachingTime(prev => {
          return prev + 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerId);
  });

  return (
    <>
      <JitsiMeeting
        eventListeners={eventListeners as any}
        userInfo={{
          displayName: state.currentUser.name,
          email: state.currentUser.email,
          avatarURL: state.currentUser.avatar,
        }}
        config={{
          enableNoisyMicDetection: true,
          hideConferenceTimer: true,
        }}
        ref={jitsiMeeting}
        style={{flex: 1}}
        room={`${route.params?.data?.userId}-${route.params?.data?.scheduleDetailInfo?.scheduleInfo?.tutorId}`}
        token={
          route.params?.data?.userId === state.currentUser.id
            ? route.params?.data?.studentMeetingLink.split('token=')[1]
            : route.params?.data?.tutorMeetingLink.split('token=')[1]
        }
        serverURL={'https://meet.lettutor.com/'}
        flags={{
          'notifications.enabled': false,
        }}
      />
      <CStatusBar type={colorScheme} />
      {remainingTimeForUpcomingLesson > 0 && (
        <View
          style={{
            position: 'absolute',
            height: 40,
            width: '80%',
            top: height / 4 - 40 / 2,
            left: width / 2 - width * 0.4,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 9999,
            paddingHorizontal: 4,
          }}>
          <Text className="text-white text-sm font-medium">
            {convertSecondsToMinutes(remainingTimeForUpcomingLesson)} until
            lesson start{' '}
            {new Date(
              route.params.data.scheduleDetailInfo.startPeriodTimestamp,
            ).toDateString()}
          </Text>
        </View>
      )}

      {teachingTime > 0 && (
        <View
          style={{
            position: 'absolute',
            height: 40,
            top: 40,
            left: 10,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 9999,
            paddingHorizontal: 8,
          }}>
          <Text className="text-white text-sm font-medium">
            Teaching time: {convertSecondsToMinutes(teachingTime)}
          </Text>
        </View>
      )}
    </>
  );
};

export default VideoCall;
