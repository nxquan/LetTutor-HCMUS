import { View, Text, Pressable, TouchableHighlight } from 'react-native';
import React, { useState } from 'react';
import { Entypo } from '@expo/vector-icons';

import styles from './styles';
import OutsidePressHandler from 'react-native-outside-press';
import { colors } from '@/constants';

const DropDownMenu = (props: {
  data: Array<any>;
  selectedItem: any;
  isOpen: boolean;
  onChangeOpen: any;
  onChangeSelected: any;
  children: any;
}) => {
  const {
    data,
    isOpen,
    onChangeOpen,
    selectedItem,
    onChangeSelected,
    children,
  } = props;

  return (
    <OutsidePressHandler
      onOutsidePress={function (): void {
        onChangeOpen(false);
      }}
    >
      {children}
      {isOpen && (
        <View style={[styles.dropdownMenu]}>
          {data.map((item: string) => {
            return (
              <TouchableHighlight
                key={item}
                activeOpacity={0.8}
                underlayColor='#DDDDDD'
                onPress={() => {
                  onChangeSelected(item);
                  onChangeOpen(false);
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
        </View>
      )}
    </OutsidePressHandler>
  );
};

export default DropDownMenu;
