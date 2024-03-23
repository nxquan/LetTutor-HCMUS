import {View, Text} from 'react-native';
import React from 'react';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import DrawerButton from '@/components/DrawerButton';
import MessageIcon from '@/components/MessageIcon';
import {useColorScheme} from 'nativewind';
import CStatusBar from '@/components/CStatusBar';

const MyCourse = () => {
  const {colorScheme} = useColorScheme();
  return (
    <>
      <View className="flex-1">
        <Header backIcon={<BackButton />} drawerBtn={<DrawerButton />} />
        <View className="flex-1 items-center justify-center">
          <Text className="text-red-600 font-semibold text-base text-center w-2/3">
            Trang này hiện tại chưa phát triển vì ko có trong checklist của Thầy
          </Text>
        </View>
      </View>
      <MessageIcon />
      <CStatusBar type={colorScheme} />
    </>
  );
};

export default MyCourse;
