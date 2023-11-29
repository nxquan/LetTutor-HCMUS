import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';

import React, {useCallback, useEffect, useState} from 'react';
import styles from './styles';
import {images} from '@/assets';
import FormGroup from '@/components/FormGroup';
import Header from '@/components/Header';
import StackProps from '@/types/type';
import BackButton from '@/components/BackButton';
import {useGlobalContext, useTranslations} from '@/hooks';
import {addUser} from '@/store';

const SignUp = () => {
  const navigation = useNavigation<StackProps>();
  const [state, dispatch] = useGlobalContext();
  const {t} = useTranslations();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [notification, setNotification] = useState({
    message: '',
    type: '',
  });

  const onChangeDataOfUser = useCallback((key: string, value: string) => {
    setUser(prev => {
      return {
        ...prev,
        [key]: value,
      };
    });
  }, []);

  const validate = () => {
    const isEmail = String(user.email)
      .trim()
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
    const isMatch = String(user.password).match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,32}$/,
    );
    return !!isEmail && !!isMatch;
  };

  const handleSubmit = () => {
    const isExisting = state.users.find((item: any) => {
      return String(item.email) === user.email.trim().toLowerCase();
    });
    if (!isExisting) {
      const payload = {
        email: user.email.toLowerCase().trim(),
        password: user.password,
      };

      dispatch(addUser(payload));
      setNotification({
        type: 'success',
        message: 'Đăng ký thành công',
      });
      setUser({
        email: '',
        password: '',
      });
    } else {
      setNotification({
        type: 'error',
        message: 'Email đã tồn tại',
      });
    }
  };

  useEffect(() => {
    let timerId: any;
    if (notification.message.length > 0) {
      timerId = setTimeout(() => {
        setNotification({
          message: '',
          type: '',
        });
      }, 10000);
    }
    return () => clearTimeout(timerId);
  }, [notification]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[0]}>
      <Header backIcon={<BackButton />} />
      <View style={styles.inner}>
        <Image source={images.banner} style={styles.banner} />
        <View style={styles.body}>
          <Text style={styles.heading}>{t('signup.longTitle')}</Text>
          <Text style={styles.des}>{t('signup.description')}</Text>
          <FormGroup
            title={t('email')}
            type="email"
            field="email"
            placeholder="example@email.com"
            value={user.email}
            onChange={onChangeDataOfUser}
          />
          <FormGroup
            title={t('password')}
            type="password"
            field="password"
            value={user.password}
            onChange={onChangeDataOfUser}
          />
          {notification.message.length > 0 && (
            <Text
              style={[
                styles.notification,
                notification.type === 'error' ? styles.error : styles.success,
              ]}>
              {notification.message}
            </Text>
          )}
          <TouchableOpacity
            style={[styles.loginBtn, !validate() && styles.disable]}
            disabled={!validate()}
            onPress={() => handleSubmit()}>
            <Text style={styles.loginBtnText}>{t('signup.title')}</Text>
          </TouchableOpacity>
          <Text style={styles.signupText}>
            {t('signup.other')}{' '}
            <Text
              style={styles.signupLink}
              onPress={() => navigation.navigate('SignIn')}>
              {t('signin.title')}
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
