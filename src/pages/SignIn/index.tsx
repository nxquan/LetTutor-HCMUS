import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React from 'react';
import styles from './styles';
import { images } from '@/assets';
import { FontAwesome } from '@expo/vector-icons';
import FormGroup from '@/components/FormGroup';
import globalStyles from '@/global/globalStyles';
import Header from '@/components/Header';
import { useNavigation } from '@react-navigation/native';
import Props from '@/global/type';
import { colors } from '@/constants';

const SignIn = () => {
  const navigation = useNavigation<Props>();

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[0]}
    >
      <Header />
      <View style={styles.inner}>
        <Image source={images.banner} style={styles.banner} />
        <View style={styles.body}>
          <Text style={styles.heading}>Đăng nhập</Text>
          <Text style={styles.des}>
            Phát triển kỹ năng tiếng Anh nhanh nhất bằng cách học 1 kèm 1 trực
            tuyến theo mục tiêu và lộ trình dành cho riêng bạn.
          </Text>
          <FormGroup title='EMAIL' type='email' />
          <FormGroup title='PASSWORD' type='password' />

          <Text style={styles.forgetPassword}>Quên mật khẩu?</Text>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() =>
              navigation.navigate('HomeDrawerRouter', { screen: 'Tutor' })
            }
          >
            <Text style={styles.loginBtnText}>Đăng nhập</Text>
          </TouchableOpacity>
          <Text style={styles.moreText}>Hoặc tiếp tục với</Text>
          <View style={styles.loginList}>
            <View style={styles.loginItem}>
              <FontAwesome name='facebook' size={24} color='#0071F0' />
            </View>
            <View style={[globalStyles.ml16]}>
              <Image
                source={images.googleLogo}
                style={{ width: 36, height: 36 }}
              />
            </View>
            <View style={[styles.loginItem, globalStyles.ml16]}>
              <FontAwesome name='mobile-phone' size={26} color='#888888' />
            </View>
          </View>
          <Text style={styles.signupText}>
            Chưa có tài khoản?{' '}
            <Text
              style={styles.signupLink}
              onPress={() => navigation.navigate('SignUp')}
            >
              Đăng ký
            </Text>
          </Text>
        </View>
      </View>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.white} />
    </ScrollView>
  );
};

export default SignIn;
