import React, {useState, useCallback, useEffect} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import uuid from 'react-native-uuid';
import {GiftedChat} from 'react-native-gifted-chat';

import {
  renderAvatar,
  renderBubble,
  renderInputToolbar,
  scrollToBottomComponent,
} from './components/Utils';
import {colors} from '@/constants';
import OutsidePressHandler from 'react-native-outside-press';
import ModalPopper from '@/components/ModalPopper';

const Message = () => {
  const [messages, setMessages] = useState<any>([]);
  const [showConversations, setShowConversations] = useState(false);

  const onSend = async (messages: any[]) => {
    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, messages),
    );
  };
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row items-center px-5 py-3 border-b border-b-orange-200">
        <TouchableOpacity onPress={() => setShowConversations(true)}>
          <Entypo name="chat" size={28} color={colors.primary} />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg text-black font-bold">
          User
        </Text>
        <TouchableOpacity onPress={() => {}}>
          <AntDesign name="setting" size={28} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <View className="flex-1 justify-center">
        <GiftedChat
          messagesContainerStyle={{paddingVertical: 24}}
          //Required
          onSend={messages => onSend(messages)}
          messages={messages}
          user={{
            _id: 1,
            name: 'user',
            avatar: '',
          }}
          //Optional
          renderAvatar={renderAvatar}
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
      <ModalPopper visible={showConversations} transparent={true}>
        <OutsidePressHandler
          className="flex-1"
          onOutsidePress={() => {
            setShowConversations(false);
          }}>
          <View className="flex-1  pt-4">
            <ScrollView
              className="flex-1 px-2"
              showsVerticalScrollIndicator={false}></ScrollView>
            <View className="bg-gray-50 border-t border-t-orange-100 p-3">
              <TouchableOpacity onPress={() => {}} activeOpacity={0.4}>
                <View
                  className="flex-row justify-center items-center rounded-lg py-1.5"
                  style={{backgroundColor: colors.primary}}>
                  <Text className="text-base text-white mr-2">New Chat</Text>
                  <MaterialCommunityIcons
                    name="message-outline"
                    size={24}
                    color={colors.white}
                  />
                </View>
              </TouchableOpacity>
              <Text className="text-center text-sm mt-2">Version 1.0.0</Text>
            </View>
          </View>
        </OutsidePressHandler>
      </ModalPopper>
    </SafeAreaView>
  );
};

export default Message;
