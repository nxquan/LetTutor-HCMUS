import {colors} from '@/constants';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 999,
    borderColor: colors.grey200,
    borderWidth: 1,
    resizeMode: 'contain',
    marginRight: 10,
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
  modalInfo: {
    alignItems: 'center',
  },
  modalBody: {
    position: 'relative',
  },
  dropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderColor: colors.grey300,
    borderWidth: 1,
    borderRadius: 4,
  },
});

export default styles;
