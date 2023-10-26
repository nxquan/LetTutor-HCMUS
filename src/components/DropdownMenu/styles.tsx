import { colors } from '@/constants';
import { Dimensions, StyleSheet } from 'react-native';

const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  dropdownMenu: {
    maxHeight: height * 0.4,
    backgroundColor: colors.white,
    shadowColor: 'rgba(0,0,0,0.5)',
    elevation: 10,
    marginTop: 4,
    top: 40,
    left: 0,
    right: 0,
    position: 'absolute',
    zIndex: 10,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    zIndex: 1,
  },
});

export default styles;
