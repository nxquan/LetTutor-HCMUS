import {View, Image, Pressable} from 'react-native';

import React, {useEffect, useState} from 'react';

import styles from './styles';
import {images, languageImages} from '@/assets';
import DropdownMenu from '../DropdownMenu';
import {useGlobalContext, useTranslations} from '@/hooks';
import {changeLanguage} from '@/store';

type Props = {
  style?: any;
  backIcon?: React.JSX.Element;
  drawerBtn?: React.JSX.Element;
};
const languages = [
  {
    id: 1,
    title: 'Vietnamese',
    key: 'Vietnamese',
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
    key: 'English',
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
  const [state, dispatch] = useGlobalContext();

  const [currentLanguage, setCurrentLanguage] = useState<any>({});
  const {t, i18next} = useTranslations();

  const onChangeLanguage = (item: any) => {
    let lng = '';
    if (item.key === 'English') {
      lng = 'en';
    } else if (item.key === 'Vietnamese') {
      lng = 'vn';
    }
    const payload = {
      language: item.key,
    };

    dispatch(changeLanguage(payload));
    i18next.changeLanguage(lng);
  };

  useEffect(() => {
    const language = languages.find(l => l.key === state.language);
    setCurrentLanguage(language);
  }, [state]);

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
          onChangeSelected={onChangeLanguage}
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
