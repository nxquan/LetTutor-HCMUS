import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '@/constants';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  nav: {
    width: width,
    height: 60,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: colors.grey300,
    borderBottomWidth: 1,
    paddingHorizontal: 6,
    zIndex: 999,
  },
  logo: {
    width: '40%',
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
    marginRight: 12,
  },
  openSideMenu: {
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  backBtn: {
    padding: 8,
    borderRadius: 999,
  },
});

export default styles;
