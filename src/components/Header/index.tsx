import {View, Image, TouchableHighlight} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';

import {useNavigation} from '@react-navigation/native';
import React, {Fragment} from 'react';

import styles from './styles';
import {images, languageImages} from '@/assets';
import StackProps, {DrawerProps} from '@/global/type';

type Props = {
  children?: React.JSX.Element;
  backIcon?: React.JSX.Element;
  drawerBtn?: React.JSX.Element;
};
const Header = (props: Props) => {
  const {children, backIcon, drawerBtn} = props;
  const navigation = useNavigation<DrawerProps | StackProps>();

  return (
    <View style={styles.nav}>
      <View style={styles.logoContainer}>
        {backIcon}
        <Image
          source={images.logo}
          style={[styles.logo, !!backIcon && {marginLeft: 16}]}
          resizeMode="contain"
        />
      </View>
      <View style={[styles.actions, !drawerBtn && {marginRight: 16}]}>
        <View style={styles.languageBtn}>
          <Image source={languageImages.vietNam} style={styles.languageIcon} />
        </View>
        {drawerBtn}
      </View>
    </View>
  );
};

export default Header;
