import {colors} from '@/constants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  inner: {
    borderTopColor: colors.primary,
    borderTopWidth: 5,
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
  dropdownMenuBtn: {
    borderColor: colors.grey500,
  },
});

export default styles;
