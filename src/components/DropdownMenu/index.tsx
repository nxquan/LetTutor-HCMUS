import {Text, TouchableHighlight, ScrollView, View} from 'react-native';
import React from 'react';

import styles from './styles';
import OutsidePressHandler from 'react-native-outside-press';

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
  } = props;

  return (
    <OutsidePressHandler
      onOutsidePress={function (): void {
        onChangeOpen(false);
      }}
      style={style}>
      {children}
      {isOpen && (
        <ScrollView
          style={[styles.dropdownMenu, styleMenu]}
          scrollEnabled={true}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={true}>
          {data.map((item: any, index: number) => {
            return (
              <TouchableHighlight
                key={item?.id}
                activeOpacity={0.8}
                underlayColor="rgba(0,0,0,0.1)"
                onPress={() => {
                  onChangeOpen(false);
                  if (!!typeOfMenu) {
                    onChangeSelected(typeOfMenu, item);
                  } else {
                    onChangeSelected(item);
                  }
                }}>
                <View
                  style={[
                    styles.menuItem,
                    item?.icon && {
                      paddingHorizontal: 6,
                    },
                    selectedItem?.key === item?.key && styles.active,
                    index === 0 && styles.borderLeftToRightTop,
                    index === data.length - 1 && styles.borderLeftToRightBottom,
                  ]}>
                  {item?.icon}
                  <Text style={[styles.dropdownItem]}>
                    {item?.title || item?.name}
                  </Text>
                </View>
              </TouchableHighlight>
            );
          })}
        </ScrollView>
      )}
    </OutsidePressHandler>
  );
}

export default React.memo(DropdownMenu);
