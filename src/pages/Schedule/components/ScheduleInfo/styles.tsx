import {colors} from '@/constants';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  requestContainer: {
    paddingBottom: 16,
    backgroundColor: colors.white,
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
    backgroundColor: colors.grey100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingRight: 12,
    paddingLeft: 4,
  },
  requestBtn: {
    color: colors.primary,
  },
  requestText: {
    fontSize: 14,
    color: colors.text,
  },
  goMeetingBtn: {
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 8,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 6,
  },
});

export default styles;
