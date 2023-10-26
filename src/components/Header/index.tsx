import { View, Image, TouchableHighlight } from 'react-native';
import { Octicons } from '@expo/vector-icons';

import React from 'react';
import styles from './styles';
import { images, languageImages } from '@/assets';
import { DrawerProps } from '@/global/type';
import { useNavigation } from '@react-navigation/native';

const Header = (props: any) => {
  const navigation = useNavigation<DrawerProps>();

  return (
    <View style={styles.nav}>
      <Image source={images.logo} style={styles.logo} resizeMode='contain' />
      <View style={styles.actions}>
        <View style={styles.languageBtn}>
          <Image source={languageImages.vietNam} style={styles.languageIcon} />
        </View>
        <TouchableHighlight
          activeOpacity={0.8}
          underlayColor='rgba(0,0,0,0.1)'
          onPress={() => {
            navigation.openDrawer();
          }}
          style={styles.openSideMenu}
        >
          <Octicons name='three-bars' size={24} color='black' />
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default Header;
