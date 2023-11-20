import {View, Image, Pressable} from 'react-native';

import React, {useState} from 'react';

import styles from './styles';
import {images, languageImages} from '@/assets';
import DropdownMenu from '../DropdownMenu';

type Props = {
  style?: any;
  backIcon?: React.JSX.Element;
  drawerBtn?: React.JSX.Element;
};
const languages = [
  {
    id: 1,
    title: 'Vietnamese',
    key: 'vietnamese',
    icon: (
      <Image
        source={languageImages.vietNam}
        style={[
          styles.languageIcon,
          {
            width: 24,
            height: 24,
          },
        ]}
      />
    ),
  },
  {
    id: 2,
    title: 'English',
    key: 'english',
    icon: (
      <Image
        source={languageImages.unitedState}
        style={[
          styles.languageIcon,
          {
            width: 24,
            height: 24,
          },
        ]}
      />
    ),
  },
];

function Header(props: Props) {
  const {style, backIcon, drawerBtn} = props;
  const [isOpenLanguageMenu, setIsOpenLanguageMenu] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState({
    id: 1,
    title: 'Vietnamese',
    key: 'vietnamese',
    icon: <Image source={languageImages.vietNam} style={styles.languageIcon} />,
  });

  const onChangeSearchValue = (item: any) => {
    setCurrentLanguage(item);
  };

  return (
    <View style={[styles.nav, style]}>
      <View style={styles.logoContainer}>
        {backIcon}
        <Image
          source={images.logo}
          style={[styles.logo, !!backIcon && {marginLeft: 16}]}
          resizeMode="contain"
        />
      </View>
      <View style={[styles.actions, !drawerBtn && {marginRight: 16}]}>
        <DropdownMenu
          isOpen={isOpenLanguageMenu}
          data={languages}
          onChangeOpen={setIsOpenLanguageMenu}
          onChangeSelected={onChangeSearchValue}
          selectedItem={currentLanguage}
          styleMenu={{width: 160, left: -120}}>
          <Pressable onPress={() => setIsOpenLanguageMenu(!isOpenLanguageMenu)}>
            <View style={styles.languageBtn}>
              <Image
                source={languageImages.vietNam}
                style={styles.languageIcon}
              />
            </View>
          </Pressable>
        </DropdownMenu>
        {drawerBtn}
      </View>
    </View>
  );
}

export default React.memo(Header);
