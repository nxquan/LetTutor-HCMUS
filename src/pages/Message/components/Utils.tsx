import React, {useState, useCallback, useEffect} from 'react';
import {
  Actions,
  Avatar,
  Bubble,
  Composer,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View} from 'react-native';
import {colors} from '@/constants';

export const renderBubble = (props: any) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: colors.primary,
        },
        left: {
          backgroundColor: '#f0f0f0',
        },
      }}
      textStyle={{
        right: {
          color: 'white',
        },
        left: {
          color: 'black',
        },
      }}
    />
  );
};

export const renderSend = (props: any) => {
  return (
    <Send
      {...props}
      containerStyle={{flexDirection: 'row', alignItems: 'center'}}>
      <FontAwesome
        name="send"
        size={24}
        color={colors.primary}
        style={{marginRight: 20}}
      />
    </Send>
  );
};

export const renderActions = (props: any) => {
  return (
    <View style={{width: 70, flexDirection: 'row', alignItems: 'center'}}>
      <Actions
        {...props}
        containerStyle={{
          flexDirection: 'row',
          alignItems: 'center',
          margin: 0,
          width: 50,
          height: 30,
        }}
        icon={() => (
          <Ionicons name="image-outline" size={28} color={colors.primary} />
        )}
        onPressActionButton={() => {}}
      />
    </View>
  );
};

export const renderComposer = (props: any) => {
  return (
    <Composer
      {...props}
      textInputStyle={{
        fontSize: 15,
        backgroundColor: '#f3f3f5',
        borderRadius: 10,
        paddingHorizontal: 12,
        marginLeft: -16,
        marginRight: 6,
      }}
    />
  );
};

export const renderInputToolbar = (props: any) => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0,
        height: 54,
      }}
      renderActions={renderActions}
      renderSend={renderSend}
      renderComposer={renderComposer}
    />
  );
};

export const scrollToBottomComponent = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.8)',
        borderRadius: 9999,
      }}>
      <Entypo name="chevron-small-down" size={26} color="rgba(0,0,0,0.8)" />
    </View>
  );
};

export const renderAvatar = (props: any) => {
  const message = props.currentMessage;
  if (message?.user.name === 'assistant') {
    return <Avatar {...props} />;
  }
  return null;
};
