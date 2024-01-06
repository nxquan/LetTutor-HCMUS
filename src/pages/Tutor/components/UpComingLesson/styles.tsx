import {colors} from '@/constants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  notiContainer: {
    backgroundColor: '#0c3ddf',
    paddingVertical: 40,
    paddingHorizontal: 10,
  },
  notiHeading: {
    fontSize: 24,
    marginTop: -12,
    fontWeight: '500',
    textAlign: 'center',
  },
  notiDateText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 24,
  },
  notiRemainTimeText: {
    color: colors.yellow,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default styles;
