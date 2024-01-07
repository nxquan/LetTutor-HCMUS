import {
  View,
  Text,
  ScrollView,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {Avatar, Icon} from '@rneui/themed';

import BackButton from '@/components/BackButton';
import {colors} from '@/constants';
import * as messageService from '@/services/messageService';
import RecipientItem from './components/RecpientItem';
import {useGlobalContext} from '@/hooks';
import {useNavigation} from '@react-navigation/native';
import {DrawerProps} from '@/types/type';
import DrawerButton from '@/components/DrawerButton';
import useDebounce from '@/hooks/useDebound';
import {useColorScheme} from 'nativewind';

const Messages = () => {
  const {colorScheme} = useColorScheme();
  const [state, dispatch] = useGlobalContext();
  const navigation = useNavigation<DrawerProps>();
  const [recipients, setRecipients] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const searchDebounce = useDebounce(searchValue, 300);
  const socketRef: any = useRef();

  useEffect(() => {
    const fetchRecipients = async () => {
      setLoading(true);
      const res = await messageService.getAllRecipients();
      if (res.success) {
        setRecipients(res.data.messages);
      }
      setLoading(false);
    };
    fetchRecipients();
  }, []);

  useEffect(() => {
    const fetchRecipients = async () => {
      setLoading(true);
      if (searchDebounce.length === 0) {
        const res = await messageService.getAllRecipients();
        if (res.success) {
          setRecipients(res.data.messages);
        }
      } else {
        const data = [...recipients];
        const result = data.filter((item: any) =>
          item.toInfo.name.includes(searchDebounce),
        );
        setRecipients(result);
      }
      setLoading(false);
    };
    fetchRecipients();
  }, [searchDebounce]);

  // useEffect(() => {
  //   socketRef.current = io(REACT_APP_DEV_API_URL);
  //   socketRef.current.on('connect', () => {
  //     socketRef.current.emit('add-user', state.currentUser?.id);
  //   });

  //   socketRef.current.on('receive-status', (onlineUsers: any[]) => {
  //     console.log('onlineUsers: ', onlineUsers);
  //     //onlineUsers: []
  //   });
  // }, []);

  // useEffect(() => {
  //   socketRef.current.on('receive-status', (onlineUsers: any[]) => {
  //     console.log('onlineUsers: ', onlineUsers);
  //     //onlineUsers: []
  //   });
  // }, []);

  return (
    <View className="bg-white dark:bg-black flex-1 pt-1">
      <View className="flex-row items-center justify-between px-3 py-1 bg-white dark:bg-black">
        <View className="flex-row items-center">
          <BackButton />
          <Text className="text-lg font-semibold text-black dark:text-white ml-1">
            Communications
          </Text>
        </View>
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Profile');
            }}>
            <Avatar
              size={42}
              rounded
              source={{uri: state.currentUser?.avatar}}
            />
          </TouchableOpacity>
          <DrawerButton />
        </View>
      </View>
      <View className="flex-row items-center bg-gray-200 dark:bg-black mx-5 mt-3 px-3 py-0 rounded-full dark:border dark:border-gray-400">
        <Icon
          type="antdesign"
          name="search1"
          color={colorScheme == 'light' ? colors.grey500 : colors.white}
        />
        <TextInput
          placeholder="Search"
          placeholderTextColor={
            colorScheme == 'light' ? colors.grey500 : colors.white
          }
          cursorColor={colors.primary}
          className="text-base text-black dark:text-white px-2 py-1.5 flex-1"
          value={searchValue}
          onChangeText={t => setSearchValue(t)}
        />
        {searchValue.length > 0 && (
          <Pressable
            onPress={() => {
              setSearchValue('');
            }}>
            <Icon
              type="antdesign"
              size={18}
              name="closecircle"
              color={colors.primary}
            />
          </Pressable>
        )}
      </View>
      <ScrollView className="flex-1 bg-white dark:bg-black mt-3">
        {recipients.length > 0 &&
          recipients.map((recipient: any) => {
            return <RecipientItem key={recipient.id} data={recipient} />;
          })}
        {loading && (
          <View>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text className="text-base text-black dark:text-white text-center">
              Loading...
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Messages;
