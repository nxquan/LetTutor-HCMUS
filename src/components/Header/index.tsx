import { View, Text, Image } from 'react-native';
import React from 'react';
import styles from './styles';
import { images, languageImages } from '../../../assets';

const Header = () => {
  return (
    <View style={styles.nav}>
      <Image source={images.logo} style={styles.logo} resizeMode='contain' />
      <View style={styles.languageBtn}>
        <Image source={languageImages.vietNam} style={styles.languageIcon} />
      </View>
    </View>
  );
};

export default Header;
