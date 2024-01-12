import {View, Text, TouchableOpacity, Pressable, TextInput} from 'react-native';
import React, {useState} from 'react';
import {colors} from '@/constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import CheckBox from '@react-native-community/checkbox';
import Button from '@/components/Button';

import * as utilService from '@/services/utilService';
import {Toast} from 'toastify-react-native';
import {useColorScheme} from 'nativewind';

const REPORTS = [
  'This tutor is annoying me',
  'This profile is pretending be someone or is fake',
  'Inappropriate profile photo',
];
type Props = {
  tutorDetail: any;
  toggleModal: (value: boolean) => void;
};
const ReportForm = (props: Props) => {
  const {colorScheme} = useColorScheme();
  const {tutorDetail, toggleModal} = props;
  const [reports, setReports] = useState<number[]>([]);
  const handleReport = async () => {
    const res = await utilService.reportTutor({
      tutorId: tutorDetail?.User.id,
      content: reports
        .sort((a, b) => a - b)
        .map((item, index) => {
          return REPORTS[item] + '\n';
        })
        .join(''),
    });

    if (res.success) {
      toggleModal(false);
      Toast.success('Report successfully');
    }
  };
  return (
    <View className="w-full">
      <View className="flex-row justify-between items-center">
        <Text className="text-black dark:text-white text-base font-medium">
          Report {tutorDetail?.User?.name}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setReports([]);
            toggleModal(false);
          }}>
          <AntDesign
            name="close"
            size={24}
            color={colorScheme == 'light' ? colors.black : colors.white}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginVertical: 16,
          height: 1,
          backgroundColor: colors.grey300,
        }}
      />
      <View className="w-full mt-3">
        <View className="flex-row items-center">
          <AntDesign
            name="exclamationcircle"
            size={20}
            color={colors.primary}
          />
          <Text className="text-black dark:text-white text-sm font-medium ml-1.5">
            Help us understand what's happening
          </Text>
        </View>
        <View className="w-full py-2">
          {REPORTS.map((item: any, index: number) => {
            return (
              <Pressable
                key={index}
                onPress={() => {
                  setReports((prev: any) => {
                    if (prev.includes(index)) {
                      return reports.filter(i => i !== index);
                    } else {
                      return [...prev, index];
                    }
                  });
                }}>
                <View className="flex-row items-center">
                  <CheckBox
                    value={reports.includes(index)}
                    onValueChange={() => {
                      setReports((prev: any) => {
                        if (prev.includes(index)) {
                          return reports.filter(i => i !== index);
                        } else {
                          return [...prev, index];
                        }
                      });
                    }}
                    tintColors={{
                      true:
                        colorScheme == 'light' ? colors.primary : colors.white,
                      false:
                        colorScheme == 'light'
                          ? 'rgba(0,0,0,0.5)'
                          : colors.white,
                    }}
                  />
                  <Text className="text-[rgba(0,0,0,0.85)] dark:text-white text-sm flex-1 flex-wrap">
                    {item}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        <TextInput
          multiline={true}
          numberOfLines={12}
          textAlignVertical="top"
          placeholder="Please let us know details about your problem"
          placeholderTextColor={colors.grey500}
          className="text-black dark:text-white text-sm text-left p-2 rounded-md mt-4"
          style={{
            borderColor: colors.grey350,
            borderWidth: 1,
            zIndex: -1,
          }}>
          {reports
            .sort((a, b) => a - b)
            .map((item, index) => {
              return REPORTS[item] + '\n';
            })}{' '}
        </TextInput>

        <View className="flex-row justify-end items-center mt-4">
          <Button
            title="Cancel"
            onPress={() => {
              toggleModal(false);
            }}
            style={{
              borderColor:
                colorScheme == 'light' ? colors.primary : colors.white,
              color: colorScheme == 'light' ? colors.primary : colors.white,
            }}
          />

          <Button
            title="Submit"
            onPress={() => {
              handleReport();
            }}
            leftIcon={
              <Feather name="chevrons-right" size={20} color={colors.white} />
            }
            style={{
              backgroundColor: colors.primary,
              color: colors.white,
              marginLeft: 16,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default React.memo(ReportForm);
