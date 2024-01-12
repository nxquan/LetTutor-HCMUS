import {colors} from '@/constants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    elevation: 4,
    shadowColor: 'rgba(0,0,0,0.2)',
  },
  infoLesson: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
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
  content: {
    marginTop: 8,
    padding: 16,
    borderRadius: 12,
  },
});

export default styles;
