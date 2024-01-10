import React, {useState, useCallback, useEffect} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

// import uuid from 'react-native-uuid';
import {Composer, GiftedChat, InputToolbar} from 'react-native-gifted-chat';

import {
  renderActions,
  renderBubble,
  renderComposer,
  renderInputToolbar,
  renderSend,
  scrollToBottomComponent,
} from './components/Utils';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useColorScheme} from 'nativewind';

import {colors} from '@/constants';
import * as messageService from '@/services/messageService';
import {useGlobalContext} from '@/hooks';
import BackButton from '@/components/BackButton';
import {Avatar} from 'react-native-elements';
import {Icon} from '@rneui/base';
import StackProps from '@/types/type';
import CStatusBar from '@/components/CStatusBar';

const Message = () => {
  const {colorScheme} = useColorScheme();
  const route: any = useRoute();
  const [state, dispatch] = useGlobalContext();
  const navigation = useNavigation<StackProps>();
  const [recipient, setRecipient] = useState<any>({});
  const [messages, setMessages] = useState<any>([]);
  const [pagination, setPagination] = useState<any>({
    page: 1,
    perPage: 25,
  });
  const [isLoadingEarlier, setIsLoadingEarlier] = useState<boolean>(false);
  const [isEndOfList, setIsEndOfList] = useState<boolean>(false);
  const onSend = async (messages: any[]) => {
    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, messages),
    );
  };

  const handleLoadEarlier = async () => {
    const recipientId = route.params?.recipientId;
    setIsLoadingEarlier(true);
    const res = await messageService.getMessageByFilter(recipientId, {
      params: {
        page: pagination.page + 1,
        perPage: pagination.perPage,
        startTime: Date.now(),
      },
    });
    if (res.success) {
      if (res.data.rows.length > 0) {
        const _messages = res.data.rows.map((item: any) => {
          const {fromInfo} = item;
          return {
            _id: item.id,
            text: item.content,
            createdAt: item.createdAt,
            user: {
              _id: fromInfo.id,
              name: fromInfo.name,
              avatar:
                fromInfo.id === state.currentUser.id
                  ? state.currentUser.avatar
                  : recipient.avatar,
            },
          };
        });
        setMessages((prev: any) => {
          return GiftedChat.prepend(prev, _messages);
        });

        setPagination((prev: any) => {
          return {
            ...prev,
            page: prev.page + 1,
          };
        });
        setIsLoadingEarlier(false);
      } else {
        setIsEndOfList(true);
      }
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const recipientId = route.params?.recipientId;
      const res = await messageService.getMessageByFilter(recipientId, {
        params: {
          page: 1,
          perPage: 25,
          startTime: Date.now(),
        },
      });
      if (res.success) {
        const _messages = res.data.rows.map((item: any) => {
          const {fromInfo} = item;
          return {
            _id: item.id,
            text: item.content,
            createdAt: item.createdAt,
            user: {
              _id: fromInfo.id,
              name: fromInfo.name,
              avatar:
                fromInfo.id === state.currentUser.id
                  ? state.currentUser.avatar
                  : route.params?.avatar,
            },
          };
        });
        setMessages(_messages);
      }
    };
    setMessages([]);
    setPagination({
      page: 1,
      perPage: 25,
    });
    setIsLoadingEarlier(false);
    setIsEndOfList(false);
    setRecipient(route.params);
    fetchMessages();
  }, [route.params]);

  return (
    <SafeAreaView className="flex-1">
      <View
        className="flex-row items-center px-3 py-1.5 bg-white dark:bg-black border-b-gray-300"
        style={{borderBottomWidth: 0.5}}>
        <View className="flex-1 flex-row items-center">
          <BackButton />
          <TouchableOpacity
            className="flex-1"
            onPress={() => {
              navigation.navigate('TutorDetail', {
                tutorId: route.params?.recipientId,
              });
            }}>
            <View className="flex-row items-center">
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
                className="text-left text-base text-black dark:text-white font-medium ml-3 flex-1"
                numberOfLines={1}>
                {recipient?.name}
              </Text>
            </View>
          </TouchableOpacity>
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
            backgroundColor:
              colorScheme == 'light' ? colors.white : colors.black,
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
          renderInputToolbar={(props: any) => {
            return (
              <InputToolbar
                {...props}
                containerStyle={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 0,
                  height: 54,
                  backgroundColor:
                    colorScheme == 'light' ? colors.white : colors.black,
                }}
                renderActions={renderActions}
                renderSend={renderSend}
                renderComposer={(props: any) => {
                  return (
                    <Composer
                      {...props}
                      textInputStyle={{
                        fontSize: 15,
                        backgroundColor:
                          colorScheme == 'light' ? '#f3f3f5' : 'white',
                        borderRadius: 10,
                        paddingHorizontal: 12,
                        marginLeft: -16,
                        marginRight: 6,
                      }}
                    />
                  );
                }}
              />
            );
          }}
          showUserAvatar
          alwaysShowSend={true}
          showAvatarForEveryMessage={false}
          timeFormat="LT"
          dateFormat="L"
          scrollToBottom={true}
          scrollToBottomComponent={scrollToBottomComponent}
          loadEarlier={!isEndOfList}
          isLoadingEarlier={isLoadingEarlier}
          infiniteScroll={true}
          onLoadEarlier={() => {
            handleLoadEarlier();
          }}
          renderLoadEarlier={props => {
            if (isLoadingEarlier) {
              return (
                <ActivityIndicator
                  {...props}
                  size="large"
                  color={colors.primary}
                />
              );
            }
            return null;
          }}
        />
      </View>
      <CStatusBar type={colorScheme} />
    </SafeAreaView>
  );
};

export default Message;
