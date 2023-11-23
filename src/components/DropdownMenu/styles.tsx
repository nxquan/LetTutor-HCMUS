import {colors} from '@/constants';
import {Dimensions, StyleSheet} from 'react-native';

const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  dropdownMenu: {
    maxHeight: height * 0.35,
    backgroundColor: colors.white,
    shadowColor: 'rgba(0,0,0,0.5)',
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
    marginTop: 4,
    top: 40,
    left: 0,
    right: 0,
    position: 'absolute',
    zIndex: 10,
    borderRadius: 6,
    overflow: 'hidden',
  },
  dropdownItem: {
    color: colors.black,
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
