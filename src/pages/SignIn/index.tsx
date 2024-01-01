import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import styles from './styles';
import {images} from '@/assets';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {REACT_APP_WEB_CLIENT_ID} from '@env';

import FormGroup from '@/components/FormGroup';
import Header from '@/components/Header';
import {useNavigation} from '@react-navigation/native';
import Props from '@/types/type';
import {colors} from '@/constants';
import {useGlobalContext, useTranslations} from '@/hooks';
import {login} from '@/store';
import * as authService from '@/services/authService';
import {isEmail, isPassword} from '@/utils';

const SignIn = () => {
  const navigation = useNavigation<Props>();
  const [state, dispatch] = useGlobalContext();
  const {t} = useTranslations();
  const [loading, setLoading] = useState<boolean>(false);

  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [resetInfo, setResetInfo] = useState({
    email: '',
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

  const onChangeDataOfResetPassword = useCallback(
    (key: string, value: string) => {
      setResetInfo(prev => {
        return {
          ...prev,
          [key]: value,
        };
      });
    },
    [],
  );

  const validate = (
    email: string,
    password: string,
    confirmPassword?: string,
  ) => {
    const isValidEmail = isEmail(email);
    const isValidPassword = isPassword(password);
    let isSamePassword = true;
    if (confirmPassword) {
      isSamePassword = password === confirmPassword;
    }

    return !!isValidEmail && !!isValidPassword && isSamePassword;
  };

  const handleSubmit = async () => {
    setLoading(true);
    const res = await authService.login({
      email: String(user.email).trim().toLowerCase(),
      password: user.password,
    });

    if (res.success) {
      const payload = res.data;
      dispatch(login(payload));
      navigation.navigate('HomeDrawerRouter', {screen: 'Tutor'});
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

  const handleForgotPassword = async () => {
    setLoading(true);
    const res = await authService.forgotPassword({
      email: resetInfo.email,
    });
    if (res.success) {
      setResetInfo({
        email: '',
      });

      setNotification({
        type: 'success',
        message:
          'Kiểm tra hộp thư đến trong email để đặt lại mật khẩu của bạn.!',
      });
    } else {
      setNotification({
        type: 'error',
        message: 'Email không tồn tại. Vui lòng đăng ký trước!',
      });
    }
    setLoading(false);
  };

  const handleLoginByGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      await GoogleSignin.signIn();
      const {accessToken} = await GoogleSignin.getTokens();
      await GoogleSignin.signOut();
      if (accessToken) {
        setLoading(true);
        const res = await authService.loginByGoogle({
          access_token: accessToken,
        });
        if (res.success) {
          const payload = res.data;
          dispatch(login(payload));
          navigation.navigate('HomeDrawerRouter', {screen: 'Tutor'});

          setUser({
            email: '',
            password: '',
          });
        } else {
          setNotification({
            type: 'error',
            message: res.message || 'Đăng nhập thất bại. Vui lòng thử lại!',
          });
        }
        setLoading(false);
      }
    } catch (error) {
      // console.error('error', error);
    }
  };

  const handleLoginByFacebook = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (!result.isCancelled) {
      const data = await AccessToken.getCurrentAccessToken();
      if (data) {
        setLoading(true);
        const res = await authService.loginByFacebook({
          access_token: data.accessToken,
        });
        if (res.success) {
          const payload = res.data;
          dispatch(login(payload));
          navigation.navigate('HomeDrawerRouter', {screen: 'Tutor'});

          setUser({
            email: '',
            password: '',
          });
        } else {
          setNotification({
            type: 'error',
            message: res.message || 'Đăng nhập thất bại. Vui lòng thử lại!',
          });
        }
        setLoading(false);
      }
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
      }, 15000);
    }
    return () => clearTimeout(timerId);
  }, [notification]);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: REACT_APP_WEB_CLIENT_ID,
    });
  }, []);
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[0]}>
      <Header />
      {isForgotPassword ? (
        <View style={{height: Dimensions.get('window').height - 56}}>
          <View style={[styles.body]}>
            <Text style={[styles.heading, {marginTop: 24}]}>
              {t('signin.resetPassword')}
            </Text>
            <Text
              style={[
                styles.des,
                {fontWeight: '400', paddingHorizontal: 0, marginBottom: 8},
              ]}>
              <Text style={{color: colors.error}}>*</Text>{' '}
              {t('signin.enterEmail')}
            </Text>
            <FormGroup
              title="Email"
              type="email"
              placeholder="Example@email.com"
              field="email"
              value={resetInfo.email}
              onChange={onChangeDataOfResetPassword}
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
              style={[
                styles.loginBtn,
                !isEmail(resetInfo.email) && styles.disable,
              ]}
              disabled={!isEmail(resetInfo.email)}
              onPress={() => handleForgotPassword()}>
              {loading && (
                <ActivityIndicator
                  className="mr-4"
                  size="small"
                  color={colors.white}
                />
              )}
              <Text style={styles.loginBtnText}>{t('sendResetLink')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsForgotPassword(false);
                setNotification({
                  message: '',
                  type: '',
                });
              }}>
              <Text
                style={{
                  color: colors.primary,
                  fontSize: 15,
                  fontWeight: '500',
                  marginTop: 12,
                }}>
                {t('back')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <Image source={images.banner} style={styles.banner} />
          <View style={styles.body}>
            <Text style={styles.heading}>{t('signin.longTitle')}</Text>
            <Text style={styles.des}>{t('signin.description')}</Text>
            <FormGroup
              title={t('email')}
              type="email"
              field="email"
              placeholder="Example@email.com"
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

            <TouchableOpacity onPress={() => setIsForgotPassword(true)}>
              <Text style={styles.forgetPassword}>
                {t('signin.forgotPassword')}
              </Text>
            </TouchableOpacity>
            {notification.message.length > 0 && (
              <Text
                style={[
                  notification.type === 'error' ? styles.error : styles.success,
                  styles.notification,
                ]}>
                {notification.message}
              </Text>
            )}
            <TouchableOpacity
              style={[
                styles.loginBtn,
                !validate(user.email, user.password) && styles.disable,
              ]}
              disabled={!validate(user.email, user.password)}
              onPress={() => handleSubmit()}>
              {loading && (
                <ActivityIndicator
                  className="mr-4"
                  size="small"
                  color={colors.white}
                />
              )}
              <Text style={styles.loginBtnText}>{t('signin.title')}</Text>
            </TouchableOpacity>

            <Text style={styles.moreText}>{t('signin.continueWith')}</Text>
            <View style={styles.loginList}>
              <TouchableOpacity onPress={handleLoginByFacebook}>
                <View style={styles.loginItem}>
                  <FontAwesome name="facebook" size={24} color="#0071F0" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLoginByGoogle}>
                <View className="ml-4">
                  <Image
                    source={images.googleLogo}
                    style={{width: 40, height: 40}}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <Text style={styles.signupText}>
              {t('signin.other')}{' '}
              <Text
                style={styles.signupLink}
                onPress={() => navigation.navigate('SignUp')}>
                {t('signup.title')}
              </Text>
            </Text>
          </View>
        </View>
      )}

      <StatusBar barStyle={'dark-content'} backgroundColor={colors.white} />
    </ScrollView>
  );
};

export default SignIn;
