import {TouchableHighlight} from 'react-native';
import React from 'react';
import {Avatar, ListItem} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {colors} from '@/constants';
import StackProps from '@/types/type';

type Props = {
  data: any;
};
const RecipientItem = (props: Props) => {
  const {data} = props;
  const navigation = useNavigation<StackProps>();
  return (
    <TouchableHighlight
      key={data.id}
      underlayColor={colors.grey600}
      onPress={() => {
        navigation.navigate('Message', {
          recipientId: data.partner.id,
          name: data.partner.name,
          avatar: data.partner.avatar,
        });
      }}>
      <ListItem bottomDivider>
        <Avatar rounded size={46} source={{uri: data.toInfo.avatar}} />
        <ListItem.Content>
          <ListItem.Title className="text-base font-bold">
            {data.toInfo.name}
          </ListItem.Title>
          <ListItem.Subtitle
            className="text-sm"
            style={{
              color: !data.isRead ? colors.grey500 : colors.black,
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
