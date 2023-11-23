import {colors} from '@/constants';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  disabled: {
    opacity: 0.7,
  },
  title: {
    color: colors.black,
    textAlign: 'center',
  },
});

export default styles;
