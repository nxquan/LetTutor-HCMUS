import { colors } from '@/constants';
import { StyleSheet } from 'react-native';

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
  content: {
    marginTop: 16,
    padding: 12,
    backgroundColor: colors.white,
  },
});

export default styles;
