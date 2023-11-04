import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '@/constants';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  nav: {
    width: '100%',
    height: 56,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: colors.grey300,
    borderBottomWidth: 1,
    paddingHorizontal: 12,
    zIndex: 999,
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
