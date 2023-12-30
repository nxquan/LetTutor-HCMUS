import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import DrawerButton from '@/components/DrawerButton';
import MessageIcon from '@/components/MessageIcon';

const MyCourse = () => {
  return (
    <>
      <View className="flex-1">
        <Header backIcon={<BackButton />} drawerBtn={<DrawerButton />} />
        <View className="flex-1 items-center justify-center">
          <Text className="text-red-600 font-semibold text-base text-center w-2/3">
            Trang này hiện tại chưa làm vì ko có trong checklist của Thầy
          </Text>
        </View>
      </View>
      <MessageIcon />
    </>
  );
};

export default MyCourse;
