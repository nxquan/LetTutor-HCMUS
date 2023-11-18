import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import styles from './styles';
import {images} from '@/assets';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import FormGroup from '@/components/FormGroup';
import globalStyles from '@/global/globalStyles';
import Header from '@/components/Header';
import {useNavigation} from '@react-navigation/native';
import Props from '@/types/type';
import {colors} from '@/constants';
import {useGlobalContext} from '@/hooks';
import {login, resetPassword} from '@/store';

const SignIn = () => {
  const navigation = useNavigation<Props>();
  const [state, dispatch] = useGlobalContext();

  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [resetInfo, setResetInfo] = useState({
    email: '',
    code: '',
    password: '',
    confirmPassword: '',
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
    const isEmail = String(email)
      .trim()
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
    const isMatch = String(password).match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,32}$/,
    );
    let isSamePassword = true;
    if (confirmPassword) {
      isSamePassword = password === confirmPassword;
    }

    return true;
    // return !!isEmail && !!isMatch && isSamePassword;
  };

  const handleSubmit = () => {
    navigation.navigate('HomeDrawerRouter', {screen: 'Tutor'});

    // const isExisting = state.users.find((item: any) => {
    //   return String(item.email) === user.email.trim().toLowerCase();
    // });
    // if (isExisting) {
    //   if (isExisting.password === user.password) {
    //     setUser({
    //       email: '',
    //       password: '',
    //     });
    //     const payload = {
    //       email: user.email,
    //       password: user.password,
    //     };

    //     dispatch(login(payload));
    //     navigation.navigate('HomeDrawerRouter', {screen: 'Tutor'});
    //   } else {
    //     setNotification({
    //       type: 'error',
    //       message: 'Mật khẩu không đúng. Hãy thử lại!',
    //     });
    //   }
    // } else {
    //   setNotification({
    //     type: 'error',
    //     message: 'Email không tồn tại. Vui lòng đăng ký!',
    //   });
    // }
  };
  const handleResetPassword = () => {
    const isExisting = state.users.find((item: any) => {
      return String(item.email) === resetInfo.email.trim().toLowerCase();
    });
    if (isExisting) {
      //Check code here!
      setResetInfo({
        email: '',
        code: '',
        password: '',
        confirmPassword: '',
      });
      const payload = {
        email: resetInfo.email,
        password: resetInfo.password,
      };
      dispatch(resetPassword(payload));
      setNotification({
        type: 'success',
        message: 'Đổi mật khẩu thành công!',
      });
    } else {
      setNotification({
        type: 'error',
        message: 'Email không tồn tại. Vui lòng đăng ký trước!',
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
      <Header />
      {!isForgotPassword ? (
        <View style={styles.inner}>
          <Image source={images.banner} style={styles.banner} />
          <View style={styles.body}>
            <Text style={styles.heading}>Đăng nhập</Text>
            <Text style={styles.des}>
              Phát triển kỹ năng tiếng Anh nhanh nhất bằng cách học 1 kèm 1 trực
              tuyến theo mục tiêu và lộ trình dành cho riêng bạn.
            </Text>
            <FormGroup
              title="EMAIL"
              type="email"
              field="email"
              placeholder="Example@email.com"
              value={user.email}
              onChange={onChangeDataOfUser}
            />
            <FormGroup
              title="PASSWORD"
              type="password"
              field="password"
              value={user.password}
              onChange={onChangeDataOfUser}
            />

            <TouchableOpacity onPress={() => setIsForgotPassword(true)}>
              <Text style={styles.forgetPassword}>Quên mật khẩu?</Text>
            </TouchableOpacity>
            {notification.message.length > 0 && (
              <Text style={[styles.error, styles.notification]}>
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
              <Text style={styles.loginBtnText}>Đăng nhập</Text>
            </TouchableOpacity>

            <Text style={styles.moreText}>Hoặc tiếp tục với</Text>
            <View style={styles.loginList}>
              <View style={styles.loginItem}>
                <FontAwesome name="facebook" size={24} color="#0071F0" />
              </View>
              <View style={[globalStyles.ml16]}>
                <Image
                  source={images.googleLogo}
                  style={{width: 36, height: 36}}
                />
              </View>
              <View style={[styles.loginItem, globalStyles.ml16]}>
                <FontAwesome name="mobile-phone" size={26} color="#888888" />
              </View>
            </View>
            <Text style={styles.signupText}>
              Chưa có tài khoản?{' '}
              <Text
                style={styles.signupLink}
                onPress={() => navigation.navigate('SignUp')}>
                Đăng ký
              </Text>
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.inner}>
          <View
            style={[styles.body, {height: Dimensions.get('window').height}]}>
            <Text style={[styles.heading, {marginTop: 24}]}>
              Quên mật khẩu?
            </Text>
            <Text
              style={[
                styles.des,
                {textAlign: 'left', paddingHorizontal: 0, marginBottom: 8},
              ]}>
              <Text style={{color: colors.error}}>*</Text> Nhập email để lấy mã
              code!
            </Text>
            <FormGroup
              title="Email"
              type="email"
              placeholder="Example@email.com"
              field="email"
              value={resetInfo.email}
              onChange={onChangeDataOfResetPassword}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 6,
              }}>
              <Text style={{color: colors.black, fontWeight: '500'}}>
                Thời gian: <Text style={{color: colors.error}}>60s</Text>
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    color: colors.primary,
                    fontSize: 15,
                    fontWeight: '500',
                  }}>
                  Lấy mã
                </Text>
              </TouchableOpacity>
            </View>

            <Text
              style={[
                styles.des,
                {textAlign: 'left', paddingHorizontal: 0, marginBottom: 8},
              ]}>
              <Text style={{color: colors.error}}>*</Text> Lấy lại mật khẩu
            </Text>

            <FormGroup
              title="Mã code"
              placeholder="Nhập mã code"
              type="number"
              field="code"
              value={resetInfo.code}
              onChange={onChangeDataOfResetPassword}
            />

            <FormGroup
              title="Mật khẩu mới"
              type="password"
              field="password"
              value={resetInfo.password}
              onChange={onChangeDataOfResetPassword}
            />

            <FormGroup
              title="Nhập lại mật khẩu mới"
              type="password"
              field="confirmPassword"
              duplicateValue={resetInfo.password}
              value={resetInfo.confirmPassword}
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
                !validate(
                  resetInfo.email,
                  resetInfo.password,
                  resetInfo.confirmPassword,
                ) && styles.disable,
              ]}
              disabled={
                !validate(
                  resetInfo.email,
                  resetInfo.password,
                  resetInfo.confirmPassword,
                )
              }
              onPress={() => handleResetPassword()}>
              <Text style={styles.loginBtnText}>Xác nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsForgotPassword(false)}>
              <Text
                style={{
                  color: colors.primary,
                  fontSize: 15,
                  fontWeight: '500',
                  marginTop: 12,
                }}>
                Quay lại
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <StatusBar barStyle={'dark-content'} backgroundColor={colors.white} />
    </ScrollView>
  );
};

export default SignIn;
