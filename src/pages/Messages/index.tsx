import {View, Text} from 'react-native';
import React from 'react';
import {Avatar, ListItem} from '@rneui/themed';
const Messages = () => {
  return (
    <>
      <ListItem
        bottomDivider
        onPress={() => {
          console.log('Pressed!');
        }}>
        <Avatar
          rounded
          source={{uri: 'https://randomuser.me/api/portraits/men/36.jpg'}}
        />
        <ListItem.Content>
          <ListItem.Title>John Doe</ListItem.Title>
          <ListItem.Subtitle>President</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <ListItem bottomDivider>
        <Avatar
          rounded
          icon={{
            name: 'person-outline',
            type: 'material',
            size: 26,
          }}
          source={{uri: 'https://randomuser.me/api/portraits/men/36.jpg'}}
          containerStyle={{backgroundColor: '#c2c2c2'}}
        />
        <ListItem.Content>
          <ListItem.Title>Alba King</ListItem.Title>
          <ListItem.Subtitle>Vice President</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <ListItem>
        <Avatar
          source={{uri: 'https://randomuser.me/api/portraits/men/36.jpg'}}
          rounded
          title="A"
          containerStyle={{backgroundColor: 'grey'}}
        />
        <ListItem.Content>
          <ListItem.Title>Adam Eva</ListItem.Title>
          <ListItem.Subtitle>Vice Chairman</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </>
  );
};

export default Messages;
