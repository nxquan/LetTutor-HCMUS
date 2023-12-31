import {
  View,
  Text,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import {Avatar, Icon} from '@rneui/themed';

import BackButton from '@/components/BackButton';
import {colors} from '@/constants';
import * as messageService from '@/services/messageService';
import RecipientItem from './components/RecpientItem';

const Messages = () => {
  const [recipients, setRecipients] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
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

  return (
    <View className="bg-white flex-1">
      <View className="flex-row items-center justify-between px-3 py-1 bg-white">
        <View className="flex-row items-center">
          <BackButton />
          <Text className="text-lg font-semibold text-black ml-1">
            Communications
          </Text>
        </View>
        <View className="flex-row items-center">
          <Avatar
            size={42}
            rounded
            source={{uri: 'https://randomuser.me/api/portraits/men/36.jpg'}}
          />
          <Icon
            name="dots-three-vertical"
            type="entypo"
            color="#517fa4"
            style={{marginLeft: 8}}
          />
        </View>
      </View>
      <View className="flex-row items-center bg-gray-200 mx-5 mt-3 px-3 py-0 rounded-full">
        <Icon type="antdesign" name="search1" color={colors.grey500} />
        <TextInput
          placeholder="Search"
          selectionColor={colors.message}
          className="text-base text-black px-2 py-1.5"
        />
      </View>
      <ScrollView className="flex-1 bg-white mt-3 mb-5">
        {recipients.length > 0 &&
          recipients.map((recipient: any) => {
            return <RecipientItem data={recipient} />;
          })}
        {loading && (
          <View>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text className="text-base text-black text-center">Loading...</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Messages;
