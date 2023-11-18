import {Text, TouchableHighlight, ScrollView} from 'react-native';
import React from 'react';

import styles from './styles';
import OutsidePressHandler from 'react-native-outside-press';
import {colors} from '@/constants';

function DropdownMenu(props: {
  data: Array<any>;
  selectedItem: any;
  isOpen: boolean;
  onChangeOpen: any;
  onChangeSelected: any;
  children: any;
  typeOfMenu?: string;
  style?: any;
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
  } = props;

  console.log('re-render DropdownMenu');
  return (
    <OutsidePressHandler
      onOutsidePress={function (): void {
        // onChangeOpen(false);
      }}
      style={style}>
      {children}
      {isOpen && (
        <ScrollView style={styles.dropdownMenu}>
          {data.map((item: any) => {
            return (
              <TouchableHighlight
                key={item?.id}
                activeOpacity={0.8}
                underlayColor="rgba(0,0,0,0.1)"
                onPress={() => {
                  onChangeOpen(false);
                  if (!!typeOfMenu) {
                    onChangeSelected(item, typeOfMenu);
                  } else {
                    onChangeSelected(item);
                  }
                }}>
                <Text
                  style={[
                    styles.dropdownItem,
                    selectedItem.key === item.key && {
                      fontWeight: '500',
                      backgroundColor: colors.backgroundActive,
                    },
                  ]}>
                  {item.title}
                </Text>
              </TouchableHighlight>
            );
          })}
        </ScrollView>
      )}
    </OutsidePressHandler>
  );
}

export default React.memo(DropdownMenu);
