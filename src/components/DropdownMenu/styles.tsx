import {colors} from '@/constants';
import {Dimensions, StyleSheet} from 'react-native';

const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  dropdownMenu: {
    maxHeight: 360,
    shadowColor: 'rgba(0,0,0,0.5)',
    elevation: 10,
    marginTop: 4,
    zIndex: 10,
    borderRadius: 6,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    zIndex: 1,
  },
  menuItem: {flexDirection: 'row', alignItems: 'center'},
  active: {
    fontWeight: '500',
    backgroundColor: colors.backgroundActive,
  },
  borderLeftToRightTop: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  borderLeftToRightBottom: {
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
});

export default styles;
