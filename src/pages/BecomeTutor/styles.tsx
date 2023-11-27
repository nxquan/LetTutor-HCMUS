import {colors} from '@/constants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  dropdownMenuBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: colors.grey500,
    borderRadius: 6,
    paddingLeft: 12,
    paddingRight: 6,
    paddingVertical: 4,
  },
  inputContainer: {
    color: colors.text,
    fontSize: 14,
    borderWidth: 1,
    borderColor: colors.grey300,
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
});

export default styles;
