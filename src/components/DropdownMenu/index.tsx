import { Text, TouchableHighlight, ScrollView } from 'react-native';
import React from 'react';

import styles from './styles';
import OutsidePressHandler from 'react-native-outside-press';
import { colors } from '@/constants';

const DropdownMenu = (props: {
  data: Array<any>;
  selectedItem: any;
  isOpen: boolean;
  onChangeOpen: any;
  onChangeSelected: any;
  children: any;
  typeOfMenu?: string;
  style?: any;
}) => {
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

  return (
    <OutsidePressHandler
      onOutsidePress={function (): void {
        onChangeOpen(false);
      }}
      style={[{ marginTop: 16 }, style]}
    >
      {children}
      {isOpen && (
        <ScrollView style={styles.dropdownMenu}>
          {data.map((item: string) => {
            return (
              <TouchableHighlight
                key={item}
                activeOpacity={0.8}
                underlayColor='rgba(0,0,0,0.1)'
                onPress={() => {
                  onChangeOpen(false);
                  if (!!typeOfMenu) {
                    onChangeSelected(item, typeOfMenu);
                  } else {
                    onChangeSelected(item);
                  }
                }}
              >
                <Text
                  style={[
                    styles.dropdownItem,
                    selectedItem === item && {
                      fontWeight: '500',
                      backgroundColor: colors.backgroundActive,
                    },
                  ]}
                >
                  {item}
                </Text>
              </TouchableHighlight>
            );
          })}
        </ScrollView>
      )}
    </OutsidePressHandler>
  );
};

export default DropdownMenu;
