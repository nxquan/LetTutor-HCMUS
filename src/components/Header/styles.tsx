import { StyleSheet } from 'react-native';
import { colors } from '@/constants';

const styles = StyleSheet.create({
  nav: {
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
});

export default styles;
