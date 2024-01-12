import {TouchableHighlight} from 'react-native';
import React from 'react';
import {Avatar, ListItem} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {colors} from '@/constants';
import StackProps from '@/types/type';
import {useColorScheme} from 'nativewind';

type Props = {
  data: any;
};
const RecipientItem = (props: Props) => {
  const {data} = props;
  const navigation = useNavigation<StackProps>();
  const {colorScheme} = useColorScheme();

  return (
    <TouchableHighlight
      key={data.id}
      underlayColor={
        colorScheme == 'light' ? colors.grey600 : 'rgba(255,255,255,0.4)'
      }
      activeOpacity={0.4}
      onPress={() => {
        navigation.navigate('Message', {
          recipientId: data.partner.id,
          name: data.partner.name,
          avatar: data.partner.avatar,
        });
      }}>
      <ListItem
        bottomDivider
        containerStyle={{
          backgroundColor: colorScheme == 'light' ? colors.white : colors.black,
        }}>
        <Avatar rounded size={46} source={{uri: data.toInfo.avatar}} />
        <ListItem.Content>
          <ListItem.Title className="text-base font-bold text-black dark:text-white">
            {data.toInfo.name}
          </ListItem.Title>
          <ListItem.Subtitle
            className="text-sm"
            style={{
              color: !data.isRead
                ? colors.grey500
                : colorScheme === 'light'
                ? colors.black
                : colors.white,
              fontWeight: data.isRead ? 'normal' : 'bold',
            }}
            numberOfLines={1}>
            {data.content}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </TouchableHighlight>
  );
};

export default RecipientItem;
