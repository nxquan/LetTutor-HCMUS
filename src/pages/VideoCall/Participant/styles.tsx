import {colors} from '@/constants';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    width: 128,
    borderRadius: 8,
  },
  states: {
    flexDirection: 'row',
    position: 'absolute',
    right: 4,
    bottom: 4,
  },
  action: {
    width: 24,
    height: 24,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8ae1a',
    borderWidth: 2,
    borderColor: colors.white,
  },
});

export default styles;
