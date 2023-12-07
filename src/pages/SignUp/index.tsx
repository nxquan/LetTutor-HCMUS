import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import React, {useCallback, useEffect, useState} from 'react';
import styles from './styles';
import {images} from '@/assets';
import FormGroup from '@/components/FormGroup';
import Header from '@/components/Header';
import StackProps from '@/types/type';
import BackButton from '@/components/BackButton';
import {useGlobalContext, useTranslations} from '@/hooks';
import {isEmail, isPassword} from '@/utils';
import * as AuthService from '@/services/authService';
import axios from 'axios';

const SignUp = () => {
  const navigation = useNavigation<StackProps>();
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
    // return isEmail(user.email) && isPassword(user.password);
    return true;
  };

  const handleSubmit = async () => {
    // const res = await AuthService.register({
    //   email: String(user.email).trim().toLowerCase(),
    //   password: user.password,
    // });

    const verifyAccountRes = await AuthService.verifyAccount({
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YWUzMDJhMi0zY2Y5LTQ0ZWItOGQxNS04M2VjYzE2NWIzMGMiLCJpYXQiOjE3MDE3NzQzNTAsImV4cCI6MTcwMTg2MDc1MCwidHlwZSI6ImFjY2VzcyJ9.6oGsCFCMVb82ydXQrpq9eD406gt0GM-CNMxeZvpb3bo',
    });
    console.log('verifyAccountRes', verifyAccountRes);

    // console.log('res', res.data);
    // if (res.success) {
    //   setNotification({
    //     type: 'success',
    //     message: 'Đăng ký thành công',
    //   });
    //   setUser({
    //     email: '',
    //     password: '',
    //   });
    // } else {
    //   setNotification({
    //     type: 'error',
    //     message: res.message,
    //   });
    // }
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
      className="bg-white"
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[0]}>
      <Header backIcon={<BackButton />} />
      <View style={styles.inner}>
        <Image source={images.banner} style={styles.banner} />
        <View className="px-6">
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
            <Text className="text-white text-base font-medium">
              {t('signup.title')}
            </Text>
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
