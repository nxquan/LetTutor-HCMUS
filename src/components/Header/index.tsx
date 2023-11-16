import {View, Image} from 'react-native';

import React from 'react';

import styles from './styles';
import {images, languageImages} from '@/assets';
import StackProps, {DrawerProps} from '@/types/type';

type Props = {
  backIcon?: React.JSX.Element;
  drawerBtn?: React.JSX.Element;
};
const Header = (props: Props) => {
  const {backIcon, drawerBtn} = props;

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

export default React.memo(Header);
