import { StyleSheet } from 'react-native';
import { colors } from '@/constants';
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    borderRadius: 20,
    borderColor: colors.grey300,
    borderWidth: 1,
    padding: 20,
    marginTop: 16,
  },
  infoContainer: {
    flexDirection: 'row',
  },
  info: {
    flex: 1,
  },
  infoDes: {},
  bookBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: colors.primary,
  },
});

export default styles;
