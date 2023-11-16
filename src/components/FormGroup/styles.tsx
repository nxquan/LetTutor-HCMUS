import {StyleSheet} from 'react-native';
import {colors} from '@/constants';

export default StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  title: {
    textTransform: 'capitalize',
    fontSize: 16,
    fontWeight: '400',
    color: colors.grey700,
  },
  textControl: {
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: colors.grey500,
    borderWidth: 1,
  },
  textControlError: {
    borderColor: colors.error,
  },
  textInput: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flex: 1,
    color: colors.black,
  },
  icon: {
    marginRight: 12,
  },
  error: {
    fontSize: 13,
    color: colors.error,
    marginTop: 4,
  },
});
