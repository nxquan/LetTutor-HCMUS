import { colors } from '@/constants';
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  dropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderColor: colors.grey300,
    borderWidth: 1,
    borderRadius: 4,
  },
  dropdownMenu: {
    backgroundColor: colors.white,
    shadowColor: 'black',
    elevation: 10,
    marginTop: 4,
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 14,
  },
});

export default styles;
