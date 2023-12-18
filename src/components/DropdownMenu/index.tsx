import {Text, TouchableHighlight, View} from 'react-native';
import React from 'react';

import styles from './styles';
import OutsidePressHandler from 'react-native-outside-press';
import {useTranslations} from '@/hooks';
import {ScrollView} from 'react-native-gesture-handler';
function DropdownMenu(props: {
  data: Array<any>;
  selectedItem: any;
  isOpen: boolean;
  onChangeOpen: any;
  onChangeSelected: any;
  children: any;
  typeOfMenu?: string;
  style?: any;
  styleMenu?: any;
  translation?: boolean;
  useKey?: boolean;
}) {
  const {
    data,
    isOpen,
    onChangeOpen,
    selectedItem,
    onChangeSelected,
    children,
    typeOfMenu,
    style,
    styleMenu,
    translation,
    useKey,
  } = props;

  const {t} = useTranslations();
  return (
    <OutsidePressHandler
      onOutsidePress={function (): void {
        onChangeOpen(false);
      }}
      style={style}>
      {children}
      {isOpen && (
        <View
          style={{
            position: 'absolute',
            top: '100%',
            right: -1,
            minWidth: '100%',
            overflow: 'hidden',
            maxHeight: 400,
          }}>
          <ScrollView
            style={[styles.dropdownMenu, styleMenu]}
            showsVerticalScrollIndicator={true}
            nestedScrollEnabled={true}>
            {data.map((item: any, index: number) => {
              return (
                <TouchableHighlight
                  key={useKey === true ? item?.key : item?.id}
                  activeOpacity={0.8}
                  underlayColor="rgba(0,0,0,0.1)"
                  onPress={() => {
                    if (item?.parentType) {
                      onChangeSelected(item?.parentType, item);
                    } else {
                      if (!!typeOfMenu) {
                        onChangeSelected(typeOfMenu, item);
                      } else {
                        onChangeSelected(item);
                      }
                    }
                    onChangeOpen(false);
                  }}>
                  <View
                    style={[
                      styles.menuItem,
                      item?.icon && {
                        paddingHorizontal: 6,
                      },
                      selectedItem?.key === item?.key && styles.active,
                      index === 0 && styles.borderLeftToRightTop,
                      index === data.length - 1 &&
                        styles.borderLeftToRightBottom,
                    ]}>
                    {item?.icon}
                    <Text style={[styles.dropdownItem]}>
                      {translation === true
                        ? t(item?.key)
                        : item?.title || item?.name}
                    </Text>
                  </View>
                </TouchableHighlight>
              );
            })}
          </ScrollView>
        </View>
      )}
    </OutsidePressHandler>
  );
}

export default React.memo(DropdownMenu);
