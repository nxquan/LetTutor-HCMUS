import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '@/constants';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  nav: {
    width: '100%',
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    paddingHorizontal: 12,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  logo: {
    width: width * 0.35,
    height: 56 * 0.8,
  },
  languageBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageIcon: {
    width: 30,
    height: 30,
    borderRadius: 999,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
