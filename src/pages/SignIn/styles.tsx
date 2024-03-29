import {StyleSheet} from 'react-native';
import {colors} from '@/constants';

export default StyleSheet.create({
  banner: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    marginVertical: 30,
  },
  body: {
    paddingHorizontal: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 8,
  },
  des: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 10,
    lineHeight: 24,
  },
  forgetPassword: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.primary,
    marginBottom: 12,
  },
  loginBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginBtnText: {
    color: colors.white,
    fontWeight: '500',
    fontSize: 16,
  },
  disable: {
    opacity: 0.7,
  },
  moreText: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 16,
    marginVertical: 24,
  },
  loginList: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginItem: {
    width: 40,
    height: 40,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 24,
    marginBottom: 30,
    textAlign: 'center',
  },
  signupLink: {
    fontSize: 14,
    fontWeight: '500',
  },
  notification: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 8,
    marginTop: -4,
    textAlign: 'center',
  },
  error: {
    color: colors.error,
  },
  success: {
    color: colors.success,
  },
});
