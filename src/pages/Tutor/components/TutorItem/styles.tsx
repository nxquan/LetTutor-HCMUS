import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '@/constants';
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  wrapper: {
    maxWidth: width - 32,
    flex: 1,
    flexDirection: 'column',
    borderRadius: 20,
    borderColor: colors.grey300,
    borderWidth: 1,
    padding: 20,
    marginTop: 16,
    overflow: 'hidden',
  },
  info: {
    flexDirection: 'row',
  },
  infoDes: {
    flexDirection: 'column',
    marginLeft: 12,
    paddingRight: 30,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 1.4 * 22,
    color: colors.black,
  },
  nationality: {marginLeft: 6, color: colors.text},
  bookBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: colors.primary,
  },
});

export default styles;
