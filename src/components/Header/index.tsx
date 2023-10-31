import {View, Image, TouchableHighlight} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';

import {useNavigation} from '@react-navigation/native';
import React from 'react';

import styles from './styles';
import {images, languageImages} from '@/assets';
import {DrawerProps} from '@/global/type';

const Header = (props: any) => {
  const {} = props;
  const navigation = useNavigation<DrawerProps>();

  return (
    <View style={styles.nav}>
      <TouchableHighlight
        activeOpacity={0.8}
        underlayColor="rgba(0,0,0,0.1)"
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.backBtn}>
        <Entypo name="chevron-left" size={24} color="black" />
      </TouchableHighlight>
      <Image source={images.logo} style={styles.logo} resizeMode="contain" />
      <View style={styles.actions}>
        <View style={styles.languageBtn}>
          <Image source={languageImages.vietNam} style={styles.languageIcon} />
        </View>
        <TouchableHighlight
          activeOpacity={0.8}
          underlayColor="rgba(0,0,0,0.1)"
          onPress={() => {
            navigation.openDrawer();
          }}
          style={styles.openSideMenu}>
          <Octicons name="three-bars" size={24} color="black" />
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default Header;
