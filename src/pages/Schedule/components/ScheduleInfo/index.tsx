import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '@/constants';
import {useTranslations} from '@/hooks';
import {renderStartAndEndHourOnLearning} from '@/utils';

import styles from './styles';
import {useColorScheme} from 'nativewind';

type Props = {
  data: any;
  orderSession?: number;
  onOpenRequestModal: (value: boolean) => void;
  onOpenCancelModal: (value: boolean) => void;
  onChangeSelectedItem: (value: any) => void;
};

const ScheduleInfo = (props: Props) => {
  const {
    data,
    orderSession,
    onOpenRequestModal,
    onOpenCancelModal,
    onChangeSelectedItem,
  } = props;
  const {t} = useTranslations();
  const [isOpenRequest, setIsOpenRequest] = useState(true);
  const {colorScheme} = useColorScheme();

  const toggleOpenRequest = () => {
    setIsOpenRequest(!isOpenRequest);
  };

  return (
    <View style={styles.requestContainer} className="bg-white dark:bg-black">
      <View style={styles.requestHeader}>
        <Text className="text-base font-normal text-black dark:text-white">
          {orderSession && `Session ${orderSession}: `}
          {renderStartAndEndHourOnLearning(
            data.scheduleDetailInfo.startPeriodTimestamp,
            data.scheduleDetailInfo.endPeriodTimestamp,
          )}
        </Text>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => {
            onOpenCancelModal(true);
            onChangeSelectedItem(data);
          }}>
          <MaterialIcons
            name="cancel-presentation"
            size={16}
            color={colors.error}
          />
          <Text className="ml-1 text-sm" style={{color: colors.error}}>
            {t('schedule.cancel')}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.requestTime,
          {
            backgroundColor:
              colorScheme == 'light' ? colors.grey200 : colors.grey800,
          },
        ]}>
        <TouchableOpacity
          onPress={() => toggleOpenRequest()}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          {isOpenRequest ? (
            <Entypo
              name="chevron-small-right"
              size={24}
              color={colorScheme == 'light' ? 'black' : 'white'}
            />
          ) : (
            <Entypo
              name="chevron-small-down"
              size={24}
              color={colorScheme == 'light' ? 'black' : 'white'}
            />
          )}
          <Text style={{fontSize: 14}} className="text-black dark:text-white">
            {t('schedule.requestForLesson')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onChangeSelectedItem(data);
            onOpenRequestModal(true);
          }}>
          <Text style={styles.requestBtn}>{t('schedule.editRequest')}</Text>
        </TouchableOpacity>
      </View>
      {isOpenRequest && (
        <View style={{paddingHorizontal: 12, marginTop: 8}}>
          <Text className="text-sm text-text dark:text-white">
            {data.studentRequest !== null
              ? data.studentRequest
              : t('schedule.request')}
          </Text>
        </View>
      )}
    </View>
  );
};

export default ScheduleInfo;
