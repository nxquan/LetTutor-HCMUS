import {View, Text} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import styles from './styles';
import {colors} from '@/constants';

type Props = {
  isOpenMicrophone?: boolean;
  isOpenCamera?: boolean;
  isStar?: boolean;
  isRaiseHand?: boolean;
};

const Participant = (props: Props) => {
  const {isOpenMicrophone, isOpenCamera, isStar, isRaiseHand} = props;
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'black',
          height: 82,
          borderRadius: 6,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: '#b23683',
            borderRadius: 999,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 24, fontWeight: '500', color: colors.white}}>
            A
          </Text>
        </View>
      </View>

      <View style={[styles.states, {left: 4, top: 4}]}>
        {isRaiseHand && (
          <View style={styles.action}>
            <MaterialIcons name="back-hand" size={15} color={colors.white} />
          </View>
        )}
      </View>
      <View style={styles.states}>
        {isOpenMicrophone ? (
          <FontAwesome name="microphone" size={13} color={colors.white} />
        ) : (
          <FontAwesome name="microphone-slash" size={13} color={colors.white} />
        )}
        {isOpenCamera ? (
          <FontAwesome6
            name="video"
            size={12}
            color={colors.white}
            style={{marginLeft: 8, width: 16}}
          />
        ) : (
          <FontAwesome6
            name="video-slash"
            size={12}
            color={colors.white}
            style={{marginLeft: 8, width: 16}}
          />
        )}
        {isStar ? (
          <AntDesign
            name="star"
            size={13}
            color={colors.yellow}
            style={{marginLeft: 8, width: 16}}
          />
        ) : (
          <AntDesign
            name="staro"
            size={13}
            color={colors.white}
            style={{marginLeft: 8, width: 16}}
          />
        )}
      </View>
    </View>
  );
};

export default Participant;
