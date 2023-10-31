import {View, Text, TextInput} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '@/constants';

const FormGroup = (props: {title: string; type: string}) => {
  const {title, type} = props;
  const [isShowPassword, setIsShowPassword] = useState(type === 'password');

  const renderActionShow = () => {
    if (type === 'password') {
      if (isShowPassword) {
        return (
          <Ionicons
            onPress={() => {
              setIsShowPassword(!isShowPassword);
            }}
            style={styles.icon}
            name="eye-outline"
            size={24}
            color="black"
          />
        );
      } else {
        return (
          <Ionicons
            onPress={() => {
              setIsShowPassword(!isShowPassword);
            }}
            style={styles.icon}
            name="eye-off-outline"
            size={24}
            color="black"
          />
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.textControl}>
        <TextInput
          style={styles.textInput}
          placeholder={type === 'email' ? 'email@example.com' : ''}
          placeholderTextColor={colors.text}
          secureTextEntry={isShowPassword}
        />
        {renderActionShow()}
      </View>
    </View>
  );
};

export default FormGroup;
