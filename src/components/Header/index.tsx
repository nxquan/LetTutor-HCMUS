import {View, Image, Pressable, TouchableOpacity} from 'react-native';

import React, {useEffect, useState} from 'react';
import {Icon} from '@rneui/themed';

import styles from './styles';
import {images, languageImages} from '@/assets';
import DropdownMenu from '../DropdownMenu';
import {useGlobalContext, useTranslations} from '@/hooks';
import {changeLanguage} from '@/store';
import {useColorScheme} from 'nativewind';
import {colors} from '@/constants';

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
    image: languageImages.vietNam,
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
    image: languageImages.unitedState,
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
  const {colorScheme, toggleColorScheme} = useColorScheme();

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
  }, [state.language]);

  return (
    <View
      style={[styles.nav, style]}
      className="bg-white dark:bg-black border-b-gray-400 dark:border-b-white">
      <View style={styles.logoContainer}>
        {backIcon}
        <Image
          source={images.logo}
          style={[styles.logo, !!backIcon && {marginLeft: 16}]}
          resizeMode="contain"
        />
      </View>
      <View style={[styles.actions, !drawerBtn && {marginRight: 16}]}>
        <TouchableOpacity onPress={toggleColorScheme} className="mr-2 p-1">
          {colorScheme == 'light' ? (
            <Icon
              type="materialIcons"
              name="dark-mode"
              size={32}
              color={colors.black}
            />
          ) : (
            <Icon
              type="materialIcons"
              name="light-mode"
              size={30}
              color={colors.white}
            />
          )}
        </TouchableOpacity>
        <DropdownMenu
          isOpen={isOpenLanguageMenu}
          data={languages}
          onChangeOpen={setIsOpenLanguageMenu}
          onChangeSelected={onChangeLanguage}
          selectedItem={currentLanguage}
          styleMenu={{width: 160}}>
          <Pressable onPress={() => setIsOpenLanguageMenu(!isOpenLanguageMenu)}>
            <View style={styles.languageBtn}>
              <Image
                source={currentLanguage.image || languageImages.unitedState}
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
