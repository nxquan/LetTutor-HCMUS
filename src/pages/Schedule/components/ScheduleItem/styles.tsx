import { colors } from '@/constants';
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f1f1',
    marginBottom: 12,
    padding: 10,
    borderRadius: 6,
  },
  infoLesson: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: 12,
  },
  meetDate: {
    fontSize: 18,
    fontWeight: '500',
  },
  info: {
    flexDirection: 'row',
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 999,
    borderColor: colors.grey200,
    borderWidth: 1,
    resizeMode: 'contain',
    marginRight: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
  },
  nationality: {
    fontSize: 14,
  },
  requestContainer: {
    paddingTop: 12,
    paddingHorizontal: 12,
    paddingBottom: 6,
    backgroundColor: colors.white,
    marginTop: 16,
  },
  requestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cancelBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.error,
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  requestTime: {
    marginTop: 16,
    backgroundColor: colors.grey100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingRight: 12,
    paddingLeft: 4,
  },
  requestBtn: {
    color: colors.primary,
  },
  requestText: {
    fontSize: 14,
    color: colors.text,
  },
});

export default styles;
