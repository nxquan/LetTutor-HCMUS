import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
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
import {colors} from '@/constants';

const SignUp = () => {
  const navigation = useNavigation<StackProps>();
  const {t} = useTranslations();
  const [loading, setLoading] = useState(false);
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
    return isEmail(user.email) && isPassword(user.password);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const res = await AuthService.register({
      email: String(user.email).trim().toLowerCase(),
      password: user.password,
    });

    if (res.success) {
      setNotification({
        type: 'success',
        message: 'Đăng ký thành công. Đã gửi email kích hoạt tài khoản!',
      });
      setUser({
        email: '',
        password: '',
      });
    } else {
      setNotification({
        type: 'error',
        message: res.message,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    let timerId: any;
    if (notification.message.length > 0) {
      timerId = setTimeout(() => {
        setNotification({
          message: '',
          type: '',
        });
      }, 15000);
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
            {loading && (
              <ActivityIndicator
                className="mr-4"
                size="small"
                color={colors.white}
              />
            )}
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
