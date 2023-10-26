import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '@/constants';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  nav: {
    width: width,
    height: 70,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: colors.grey300,
    borderBottomWidth: 1,
    paddingLeft: 18,
    paddingRight: 10,
  },
  logo: {
    width: '50%',
  },
  languageBtn: {
    backgroundColor: colors.grey350,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  openSideMenu: {
    padding: 8,
    borderRadius: 8,
    marginLeft: 12,
  },
});

export default styles;
