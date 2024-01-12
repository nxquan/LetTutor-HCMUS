import {colors} from '@/constants';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  requestContainer: {
    paddingBottom: 16,
  },
  requestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cancelBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.error,
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  requestTime: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingRight: 12,
    paddingLeft: 4,
    borderRadius: 4,
  },
  requestBtn: {
    color: colors.primary,
  },
});

export default styles;
