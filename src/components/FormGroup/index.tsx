import {View, Text, TextInput, Animated} from 'react-native';
import React, {useRef, useState} from 'react';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '@/constants';
import {isEmail, isPassword} from '@/utils';
import {useColorScheme} from 'nativewind';

type Props = {
  title: string;
  type?: string;
  placeholder?: string;
  field: string;
  value: string;
  duplicateValue?: string;
  onChange: any;
  required?: boolean;
  editable?: boolean;
};

const FormGroup = (props: Props) => {
  const {
    title,
    type,
    placeholder,
    field,
    value,
    onChange,
    duplicateValue,
    required,
    editable,
  } = props;
  const [isShowPassword, setIsShowPassword] = useState(type === 'password');
  const [error, setError] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const {colorScheme, toggleColorScheme} = useColorScheme();

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
            color={colorScheme == 'light' ? colors.black : colors.white}
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
            color={colorScheme == 'light' ? colors.black : colors.white}
          />
        );
      }
    }
  };

  const validate = () => {
    switch (field) {
      case 'email':
        if (!isEmail(value)) {
          setError('Email không hợp lệ');
          fadeIn();
        }
        break;
      case 'password':
      case 'currentPassword':
      case 'newPassword': {
        if (!isPassword(value)) {
          setError(
            'Mật khẩu ít nhất 6 kí tự', // gồm kí tự hoa, thường, chữ số và đặc biệt',
          );
          fadeIn();
        }
        break;
      }
      case 'confirmPassword':
        if (value.length === 0) {
          setError(
            'Mật khẩu ít nhất 6 kí tự', // gồm kí tự hoa, thường, chữ số và đặc biệt',
          );
          fadeIn();
        }

        const isMatchConfirm = value === duplicateValue;
        if (!isMatchConfirm) {
          setError('Mật khẩu phải giống nhau!');
          fadeIn();
        }
        break;
      case 'code': {
        const isMatch = String(value).match(/^[0-9]+$/);
        if (!isMatch || value.length !== 6) {
          setError('Mã code bao gồm 6 chữ số');
          fadeIn();
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

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  let borderBottomColor = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.grey500, colors.error],
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title} className="text-gray-800 dark:text-white">
        {required && <Text className="text-red-500">* </Text>}
        {title}
      </Text>
      <Animated.View
        style={[
          styles.textControl,
          {borderColor: borderBottomColor},
          {
            backgroundColor:
              colorScheme == 'light' ? colors.white : colors.black,
          },
          editable === false && {
            backgroundColor:
              colorScheme == 'light' ? colors.grey200 : colors.black,
          },
        ]}>
        <TextInput
          style={[
            styles.textInput,
            {
              color: colorScheme == 'light' ? colors.black : colors.white,
            },
            editable === false && {
              color: colors.grey700,
            },
          ]}
          cursorColor={colors.primary}
          keyboardType={getKeyboardType()}
          placeholder={placeholder}
          placeholderTextColor={
            colorScheme == 'light' ? colors.text : colors.white
          }
          secureTextEntry={isShowPassword}
          editable={editable}
          onBlur={() => {
            validate();
          }}
          onFocus={() => {
            setError('');
            fadeOut();
          }}
          value={value}
          onChangeText={value => {
            onChange(field, value);
          }}
        />
        {renderActionShow()}
      </Animated.View>
      <Animated.Text style={[styles.error, {opacity: fadeAnim}]}>
        {error}
      </Animated.Text>
    </View>
  );
};

export default React.memo(FormGroup);
