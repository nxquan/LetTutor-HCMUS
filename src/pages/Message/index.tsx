import React, {useState, useCallback, useEffect} from 'react';
import {SafeAreaView, Text, TouchableHighlight, View} from 'react-native';

// import uuid from 'react-native-uuid';
import {GiftedChat} from 'react-native-gifted-chat';

import {
  renderBubble,
  renderInputToolbar,
  scrollToBottomComponent,
} from './components/Utils';
import {colors} from '@/constants';
import {useRoute} from '@react-navigation/native';
import * as messageService from '@/services/messageService';
import {useGlobalContext} from '@/hooks';
import BackButton from '@/components/BackButton';
import {Avatar} from 'react-native-elements';
import {Icon} from '@rneui/base';

const Message = () => {
  const route: any = useRoute();
  const [state, dispatch] = useGlobalContext();
  const [recipient, setRecipient] = useState<any>({});
  const [messages, setMessages] = useState<any>([]);
  const [pagination, setPagination] = useState<any>({
    page: 1,
    perPage: 25,
  });

  const onSend = async (messages: any[]) => {
    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, messages),
    );
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const recipientId = route.params?.recipientId;
      const res = await messageService.getMessageByFilter(recipientId, {
        params: {
          page: pagination.page,
          perPage: pagination.perPage,
          startTime: Date.now(),
        },
      });
      if (res.success) {
        const _messages = res.data.rows.map((item: any) => {
          return {
            _id: item.id,
            text: item.content,
            createdAt: item.createdAt,
            user: {
              _id: state.currentUser.id,
              name: state.currentUser.name,
              avatar: state.currentUser.avatar,
            },
          };
        });
        setMessages(_messages);
      }
    };
    setRecipient(route.params);
    fetchMessages();
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row items-center px-3 py-1.5 border-b bg-white border-b-gray-300">
        <View className="flex-1 flex-row items-center">
          <BackButton />
          <Avatar
            source={{
              uri:
                recipient.avatar ||
                'https://sandbox.api.lettutor.com/avatar/4d54d3d7-d2a9-42e5-97a2-5ed38af5789aavatar1684484879187.jpg',
            }}
            rounded
            size={38}
            containerStyle={{marginLeft: 4}}
          />
          <Text
            className="text-left text-lg text-black font-bold ml-3 flex-1"
            numberOfLines={1}>
            {recipient?.name}
          </Text>
        </View>
        <View className="flex-row items-center">
          <TouchableHighlight
            onPress={() => {}}
            underlayColor={colors.grey300}
            className="p-1.5 rounded-full">
            <Icon
              type="ionicons"
              name="videocam"
              size={28}
              color={colors.primary}
            />
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {}}
            underlayColor={colors.grey300}
            className="p-1.5 rounded-full">
            <Icon
              type="fontawesome6"
              name="phone"
              size={24}
              color={colors.primary}
            />
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {}}
            underlayColor={colors.grey300}
            className="p-1.5 rounded-full">
            <Icon
              type="entypo"
              name="dots-three-horizontal"
              size={24}
              color={colors.primary}
            />
          </TouchableHighlight>
        </View>
      </View>

      <View className="flex-1 justify-center">
        <GiftedChat
          messagesContainerStyle={{
            paddingVertical: 24,
            backgroundColor: 'white',
          }}
          //Required
          onSend={messages => onSend(messages)}
          messages={messages}
          user={{
            _id: state.currentUser.id,
            name: state.currentUser.name,
            avatar: state.currentUser.avatar,
          }}
          //Optional
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar}
          showUserAvatar
          alwaysShowSend={true}
          showAvatarForEveryMessage={false}
          timeFormat="LTS"
          dateFormat="L"
          scrollToBottom={true}
          scrollToBottomComponent={scrollToBottomComponent}
        />
      </View>
    </SafeAreaView>
  );
};

export default Message;
