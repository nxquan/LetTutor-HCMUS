import {View, Text, TextInput} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '@/constants';

type Props = {
  title: string;
  type?: string;
  placeholder?: string;
  field: string;
  value: string;
  duplicateValue?: string;
  onChange: any;
};

const FormGroup = (props: Props) => {
  const {title, type, placeholder, field, value, onChange, duplicateValue} =
    props;
  const [isShowPassword, setIsShowPassword] = useState(type === 'password');
  const [error, setError] = useState('');
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

  const validate = () => {
    switch (field) {
      case 'email':
        const isEmail = String(value)
          .trim()
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          );
        if (!isEmail) {
          setError('Email không hợp lệ');
        }
        break;
      case 'password': {
        const isMatch = String(value).match(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,32}$/,
        );
        if (!isMatch) {
          setError(
            'Mật khẩu ít nhất 8 kí tự gồm kí tự hoa, thường, chữ số và đặc biệt',
          );
        }
        break;
      }
      case 'confirmPassword':
        if (value.length === 0) {
          setError(
            'Mật khẩu ít nhất 8 kí tự gồm kí tự hoa, thường, chữ số và đặc biệt',
          );
        }

        const isMatchConfirm = value === duplicateValue;
        if (!isMatchConfirm) {
          setError('Mật khẩu phải giống nhau!');
        }
        break;
      case 'code': {
        const isMatch = String(value).match(/^[0-9]+$/);
        if (!isMatch || value.length !== 6) {
          setError('Mã code bao gồm 6 chữ số');
        }
        break;
      }
      default:
    }
  };

  const getKeyboardType = () => {
    if (type?.includes('number') || type?.includes('phone')) {
      return 'number-pad';
    }
    return 'default';
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View
        style={[
          styles.textControl,
          error.length > 0 && styles.textControlError,
        ]}>
        <TextInput
          style={styles.textInput}
          keyboardType={getKeyboardType()}
          placeholder={placeholder}
          placeholderTextColor={colors.text}
          secureTextEntry={isShowPassword}
          onBlur={() => {
            validate();
          }}
          onFocus={() => {
            setError('');
          }}
          value={value}
          onChangeText={value => {
            onChange(field, value);
          }}
        />
        {renderActionShow()}
      </View>
      {error.length > 0 && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default React.memo(FormGroup);
