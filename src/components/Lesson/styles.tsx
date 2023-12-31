import {colors} from '@/constants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f1f1',
    marginBottom: 12,
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    elevation: 4,
    shadowColor: 'rgba(0,0,0,0.2)',
  },
  infoLesson: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  meetDate: {
    color: colors.black,
    fontSize: 18,
    fontWeight: '500',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 999,
    borderColor: colors.grey200,
    borderWidth: 1,
    resizeMode: 'contain',
    marginRight: 10,
  },
  name: {
    color: colors.black,
    fontSize: 14,
    fontWeight: '500',
  },
  nationality: {
    fontSize: 13,
    color: colors.text,
  },
  content: {
    marginTop: 16,
    padding: 12,
    backgroundColor: colors.white,
  },
});

export default styles;
