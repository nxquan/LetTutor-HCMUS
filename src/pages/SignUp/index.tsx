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

import React from 'react';
import styles from './styles';
import {images} from '@/assets';
import FormGroup from '@/components/FormGroup';
import Header from '@/components/Header';
import StackProps from '@/global/type';
import BackButton from '@/components/BackButton';

const SignUp = () => {
  const navigation = useNavigation<StackProps>();

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[0]}>
      <Header backIcon={<BackButton />} />
      <View style={styles.inner}>
        <Image source={images.banner} style={styles.banner} />
        <View style={styles.body}>
          <Text style={styles.heading}>Đăng ký</Text>
          <Text style={styles.des}>
            Phát triển kỹ năng tiếng Anh nhanh nhất bằng cách học 1 kèm 1 trực
            tuyến theo mục tiêu và lộ trình dành cho riêng bạn.
          </Text>
          <FormGroup title="EMAIL" type="email" />
          <FormGroup title="PASSWORD" type="password" />
          <FormGroup title="PASSWORD CONFIRM" type="password" />
          <TouchableOpacity style={styles.loginBtn}>
            <Text style={styles.loginBtnText}>Đăng ký</Text>
          </TouchableOpacity>
          <Text style={styles.signupText}>
            Đã có tài khoản?{' '}
            <Text
              style={styles.signupLink}
              onPress={() => navigation.navigate('SignIn')}>
              Đăng nhập
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
