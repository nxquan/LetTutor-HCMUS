import { StyleSheet } from 'react-native';
import { colors } from '@/constants';

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  inner: {},
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
    color: colors.primary,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnText: {
    color: colors.white,
    fontWeight: '500',
    fontSize: 16,
  },
  moreText: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 16,
    color: colors.grey500,
    marginVertical: 24,
  },
  loginList: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginItem: {
    width: 36,
    height: 36,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.grey500,
    marginTop: 24,
    marginBottom: 30,
    textAlign: 'center',
  },
  signupLink: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
});
