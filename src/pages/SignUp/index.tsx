import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './styles';
import { images, languageImages } from '../../../assets';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import FormGroup from '../components/FormGroup';
import globalStyles from '../../Global/globalStyles';
import Header from '../../components/Header';

const SignUp = () => {
  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Header />
      <View style={styles.inner}>
        <Image source={images.banner} style={styles.banner} />
        <View style={styles.body}>
          <Text style={styles.heading}>Đăng ký</Text>
          <Text style={styles.des}>
            Phát triển kỹ năng tiếng Anh nhanh nhất bằng cách học 1 kèm 1 trực tuyến theo mục tiêu
            và lộ trình dành cho riêng bạn.
          </Text>
          <FormGroup title='EMAIL' type='email' />
          <FormGroup title='PASSWORD' type='password' />
          <FormGroup title='PASSWORD CONFIRM' type='password' />
          <TouchableOpacity style={styles.loginBtn}>
            <Text style={styles.loginBtnText}>Đăng ký</Text>
          </TouchableOpacity>
          <Text style={styles.signupText}>
            Đã có tài khoản? <Text style={styles.signupLink}>Đăng nhập</Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
